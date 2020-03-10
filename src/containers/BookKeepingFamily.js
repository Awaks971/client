import React, { useState, useRef } from "react";
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
import { BOOK_KEEPING_FAMILIES } from "../apollo/receipts/queries";
import useCurrency from "../custom_hooks/useCurrency";
import _ from "lodash";
import Print from "rc-print";
import moment from "moment";
import PrintIcon from "@material-ui/icons/Print";
import { CURRENT_USER } from "../apollo/localManagement";

function BookKeepingFamily() {
  const today = new Date();
  const pastMonth = new Date().setDate(today.getDate() - 30);

  const [currentRange, setCurrentRange] = useState({
    startDate: new Date(pastMonth),
    endDate: today,
    key: "selection",
    color: "#ff6f00"
  });
  const { data, loading } = useQuery(BOOK_KEEPING_FAMILIES, {
    variables: {
      range: {
        start: currentRange.startDate,
        end: currentRange.endDate
      }
    }
  });
  const { data: cache_data, loading: cache_loading } = useQuery(CURRENT_USER);

  const euro = useCurrency();
  const ref = useRef();
  const range_start = moment(currentRange.startDate).format("L");
  const range_end = moment(currentRange.endDate).format("L");
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title="Tableau de bord">
          <RangeButton getRange={range => setCurrentRange(range)} />
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
        <Print ref={ref} title={`Période du ${range_start} au ${range_end}`}>
          <ToPrint
            loading={loading}
            euro={euro}
            range={currentRange}
            families={data ? data.top_families : []}
            company={cache_data ? cache_data.auth.loggedAs : {}}
            payment_mode={data ? data.top_payment_mode : []}
          />
        </Print>
      </Grid>
    </Grid>
  );
}

class ToPrint extends React.Component {
  render() {
    const {
      families,
      loading,
      euro,
      payment_mode,
      ref_to_print,
      ref,
      range,
      company
    } = this.props;
    const reduce = (file, field) => {
      return file.reduce((acc, journal) => {
        return acc + journal[field];
      }, 0);
    };

    const grouped_vat = _.groupBy(families, "vat_rate");

    const test = Object.keys(grouped_vat).map(i => grouped_vat[i]);

    return (
      <Grid container spacing={3} ref={ref_to_print}>
        <Grid item xs={6}>
          <Typography variant="h6">{company.name}</Typography>
          <Typography>Siret: {company.siret}</Typography>
          <Typography>Téléphone: {company.phone}</Typography>
        </Grid>

        <Grid className="to_print" item xs={12}>
          <Paper bodyLoading={loading}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Libellé</TableCell>
                  <TableCell align="right">Ventes TTC</TableCell>
                  <TableCell align="right">Ventes HT</TableCell>
                  <TableCell align="right">Marge</TableCell>
                  <TableCell align="right">Nombre de produits</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {families.map(family => {
                  return (
                    <TableRow>
                      <MUITableCell>{family.label}</MUITableCell>
                      <MUITableCell align="right">
                        {euro.format(family.amount_ttc)}
                      </MUITableCell>
                      <MUITableCell align="right">
                        {euro.format(family.amount_ht)}
                      </MUITableCell>
                      <MUITableCell align="right">
                        {euro.format(family.profit)}
                      </MUITableCell>
                      <MUITableCell align="right">
                        {family.article_count}
                      </MUITableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <MUITableCell>Totaux</MUITableCell>
                  <MUITableCell align="right">
                    {euro.format(reduce(families, "amount_ttc"))}
                  </MUITableCell>
                  <MUITableCell align="right">
                    {euro.format(reduce(families, "amount_ht"))}
                  </MUITableCell>
                  <MUITableCell align="right">
                    {euro.format(reduce(families, "profit"))}
                  </MUITableCell>
                  <MUITableCell align="right">
                    {reduce(families, "article_count")}
                  </MUITableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container className="to_print" spacing={3}>
            <Grid item className="to_print" xs={6}>
              <Paper bodyLoading={loading}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Règlement</TableCell>
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Montant</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payment_mode.map(payment => {
                      return (
                        <TableRow>
                          <MUITableCell>{payment.label}</MUITableCell>
                          <MUITableCell align="right">
                            {payment.count}
                          </MUITableCell>
                          <MUITableCell align="right">
                            {euro.format(payment.amount)}
                          </MUITableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <MUITableCell>Totaux</MUITableCell>
                      <MUITableCell align="right">
                        {reduce(payment_mode, "count")}
                      </MUITableCell>
                      <MUITableCell align="right">
                        {euro.format(reduce(payment_mode, "amount"))}
                      </MUITableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Paper>
            </Grid>
            <Grid className="to_print" item xs={6}>
              <Paper bodyLoading={loading}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Taux de TVA</TableCell>
                      <TableCell align="right">Base HT</TableCell>
                      <TableCell align="right">Total TVA</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {test.map((vat, i) => {
                      return (
                        <TableRow>
                          <MUITableCell>
                            {Object.keys(grouped_vat)[i]}
                          </MUITableCell>
                          <MUITableCell align="right">
                            {euro.format(
                              vat.reduce((acc, base) => acc + base.amount_ht, 0)
                            )}
                          </MUITableCell>
                          <MUITableCell align="right">
                            {euro.format(
                              vat.reduce(
                                (acc, base) => acc + base.amount_vat,
                                0
                              )
                            )}
                          </MUITableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <MUITableCell>Totaux</MUITableCell>
                      <MUITableCell align="right">
                        {reduce(families, "amount_ht")}
                      </MUITableCell>
                      <MUITableCell align="right">
                        {euro.format(reduce(families, "amount_vat"))}
                      </MUITableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default BookKeepingFamily;
