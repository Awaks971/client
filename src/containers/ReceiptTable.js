import { CircularProgress, Grid, TableFooter } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { TableCell } from "../components/Table";
import ReceiptRow from "./ReceiptRowDrawer";
import useCurrency from "../custom_hooks/useCurrency";
import TableRecap from "../components/TableRecap";
import useNumberFormat from "../custom_hooks/useNumberFormat";

function ReceiptsTable({ loading, receipts, cash_journal }) {
  const reduce_receipt = field => {
    return receipts.reduce((acc, journal) => {
      return acc + journal[field];
    }, 0);
  };

  const euro = useCurrency();
  const number = useNumberFormat();

  const recap = [
    {
      label: "Montant TTC",
      value: euro.format(cash_journal.amount_ttc)
    },
    {
      label: "Panier moyen",
      value: euro.format(cash_journal.basket_median)
    },
    {
      label: "Marge total",
      value: euro.format(cash_journal.profit_amount)
    },
    {
      label: "Quantité total",
      value: number.format(cash_journal.article_count)
    }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableRecap recap={recap} />
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TableContainer
            style={{
              maxHeight: "70vh",
              position: "relative",
              zIndex: 1
            }}
          >
            {loading ? <TableLoader /> : null}
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Code ticket</TableCell>
                  <TableCell align="right">Montant TTC</TableCell>
                  <TableCell align="right">Profit</TableCell>
                  <TableCell align="right">Nombre d'articles</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receipts.map((row, index) => (
                  <ReceiptRow
                    key={row.id}
                    receipts={receipts}
                    current_index={index}
                  />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Totaux</TableCell>
                  <TableCell align="right">
                    {euro.format(reduce_receipt("amount_ttc"))}
                  </TableCell>
                  <TableCell align="right">
                    {euro.format(reduce_receipt("profit"))}
                  </TableCell>
                  <TableCell align="right">
                    {reduce_receipt("article_count")}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

function TableLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#ffffff80",
        zIndex: 10
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default ReceiptsTable;
