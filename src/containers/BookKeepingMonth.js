import React, { useState, useRef, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MUITableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "../components/Paper";
import { TableCell } from "../components/Table";
import { Grid, TableFooter, Button, Typography } from "@material-ui/core";
import PageHeader from "../components/PageHeader";
import RangeButton from "../components/RangeButton";
import { useQuery } from "@apollo/react-hooks";
import {
  TOP_MONTHS,
  GET_YEARS_ON_RECEIPT,
  TOTAL_PAYMENT_BY_YEAR
} from "../apollo/receipts/queries";
import useCurrency from "../custom_hooks/useCurrency";
import _ from "lodash";
import Print from "rc-print";
import PrintIcon from "@material-ui/icons/Print";
import { CURRENT_USER } from "../apollo/localManagement";

function BookKeepingMonth() {
  const [currentRange, setCurrentRange] = useState(2020);
  const [table, set_table] = useState(null);

  const { data, loading } = useQuery(TOP_MONTHS, {
    variables: {
      range: currentRange
    },
    fetchPolicy: "network-only"
  });
  const { data: total_data, loading: total_loading } = useQuery(
    TOTAL_PAYMENT_BY_YEAR,
    {
      variables: {
        range: currentRange
      },
      fetchPolicy: "network-only"
    }
  );
  const {
    data: years_data,
    loading: years_loading
  } = useQuery(GET_YEARS_ON_RECEIPT, { fetchPolicy: "network-only" });
  const { data: cache_data, loading: cache_loading } = useQuery(CURRENT_USER);

  const euro = useCurrency();
  const ref = useRef();

  const find_total = (table, type) => {
    const potential_total = table.find(tab => tab.payment_label === type);

    if (potential_total) {
      return euro.format(potential_total.paid_amount);
    } else {
      return euro.format(0);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title="Comptabilité par mois">
          {years_data
            ? years_data.get_years_on_receipt.map(({ year }) => (
                <Button
                  onClick={() => setCurrentRange(year)}
                  variant={currentRange === year ? "contained" : "outlined"}
                  key={year}
                >
                  {year}
                </Button>
              ))
            : null}
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={ref.current ? () => ref.current.onPrint() : x => x}
          >
            <PrintIcon style={{ marginRight: 5 }} />
            Imprimer
          </Button>
        </PageHeader>
      </Grid>
      <Grid item xs={12}>
        <Print
          ref={ref}
          title={`Chiffre par mois pour l'année ${currentRange}`}
        >
          <ToPrint
            loading={loading}
            euro={euro}
            find_total={find_total}
            total={total_data ? total_data.total_payment_by_year : []}
            amount_by_month={data ? data.top_month : []}
            company={cache_data ? cache_data.auth.loggedAs : {}}
          />
        </Print>
      </Grid>
    </Grid>
  );
}

class ToPrint extends React.Component {
  render() {
    const {
      amount_by_month,
      loading,
      euro,
      company,
      total,
      find_total
    } = this.props;
    const reduce_amount = (file, field) => {
      return file.reduce((acc, journal) => {
        return acc + journal[field];
      }, 0);
    };
    const find_payment = (file, field) => {
      return file.payments.map(({ paid_amount, payment_label }) => {
        if (payment_label === field) {
          return euro.format(paid_amount);
        }
      });
    };

    const default_payments_label = ["CARTE", "CHEQUE", "ESPECES", "TK RESTO"];

    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6">{company.name}</Typography>
          <Typography>Siret: {company.siret}</Typography>
          <Typography>Téléphone: {company.phone}</Typography>
        </Grid>

        <Grid className="to_print" item xs={12}>
          <Paper bodyLoading={loading}>
            <Table
              size="small"
              className="to_print_table"
              id="table-print"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>Mois</TableCell>
                  <TableCell align="right">Ventes TTC</TableCell>
                  <TableCell align="right">Ventes HT</TableCell>
                  {default_payments_label.map(label => (
                    <TableCell align="right" key={label}>
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {amount_by_month &&
                  amount_by_month.map(amount => {
                    return (
                      <TableRow key={amount.month}>
                        <MUITableCell>{amount.month}</MUITableCell>
                        <MUITableCell align="right">
                          {euro.format(amount.amount_ttc)}
                        </MUITableCell>
                        <MUITableCell align="right">
                          {euro.format(amount.amount_ht)}
                        </MUITableCell>
                        <MUITableCell
                          className="payment-carte"
                          align="right"
                          style={{ maxWidth: 75 }}
                        >
                          {find_payment(amount, "CARTE")}
                        </MUITableCell>
                        <MUITableCell
                          className="payment-cheque"
                          align="right"
                          style={{ maxWidth: 75 }}
                        >
                          {find_payment(amount, "CHEQUE")}
                        </MUITableCell>
                        <MUITableCell
                          className="payment-especes"
                          align="right"
                          style={{ maxWidth: 75 }}
                        >
                          {find_payment(amount, "ESPECES")}
                        </MUITableCell>
                        <MUITableCell
                          className="payment-tk-resto"
                          align="right"
                          style={{ maxWidth: 75 }}
                        >
                          {find_payment(amount, "TK RESTO")}
                        </MUITableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <MUITableCell>Totaux</MUITableCell>
                  <MUITableCell align="right">
                    {euro.format(reduce_amount(amount_by_month, "amount_ttc"))}
                  </MUITableCell>
                  <MUITableCell align="right">
                    {euro.format(reduce_amount(amount_by_month, "amount_ht"))}
                  </MUITableCell>
                  <MUITableCell align="right">
                    {find_total(total, "CARTE")}
                  </MUITableCell>
                  <MUITableCell align="right">
                    {find_total(total, "CHEQUE")}
                  </MUITableCell>
                  <MUITableCell align="right">
                    {find_total(total, "ESPECES")}
                  </MUITableCell>
                  <MUITableCell align="right">
                    {find_total(total, "TK RESTO")}
                  </MUITableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default BookKeepingMonth;
