import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { TableCell } from "../components/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

import { useQuery } from "@apollo/react-hooks";
import { CircularProgress, Grid, TableSortLabel } from "@material-ui/core";
import { CASH_JOURNALS } from "../apollo/cash_journals/queries";
import CashJournalRow from "./CashJournalRowDrawer";
import PageHeader from "../components/PageHeader";
import useCurrency from "../custom_hooks/useCurrency";
import useNumberFormat from "../custom_hooks/useNumberFormat";
import TableRecap from "../components/TableRecap";

function CashJournalTable() {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, loading } = useQuery(CASH_JOURNALS, {
    fetchPolicy: "network-only"
  });

  const cash_journals = data ? data.cash_journals : [];

  const reduce_cash_journal = field => {
    return cash_journals.reduce((acc, journal) => {
      return acc + journal[field];
    }, 0);
  };

  const euro = useCurrency();
  const number = useNumberFormat();

  const recap = [
    {
      label: "Montant TTC",
      value: euro.format(reduce_cash_journal("amount_ttc"))
    },
    {
      label: "Nombre de tickets",
      value: number.format(reduce_cash_journal("receipt_count"))
    },
    {
      label: "Panier moyen",
      value: euro.format(
        reduce_cash_journal("basket_median") / cash_journals.length
      )
    },
    {
      label: "Lignes annulées",
      value: number.format(reduce_cash_journal("canceled_lines"))
    }
  ];

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("date");

  function sortHandler(orderBy) {
    const oldOrderBy = orderBy;

    setOrderBy(orderBy);
    setOrder(oldOrderBy !== orderBy ? order : order === "asc" ? "desc" : "asc");
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title="Journaux de caisse" />
      </Grid>
      <Grid item xs={12}>
        <TableRecap recap={recap} />
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TableContainer
            style={{
              maxHeight: "65vh",
              position: "relative",
              zIndex: 1
            }}
          >
            {loading ? <TableLoader /> : null}
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      direction={order}
                      onClick={() => sortHandler("date")}
                      active={orderBy === "date"}
                    >
                      Date du journal
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      direction={order}
                      onClick={() => sortHandler("amount_ttc")}
                      active={orderBy === "amount_ttc"}
                    >
                      Montant TTC
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      direction={order}
                      onClick={() => sortHandler("receipt_count")}
                      active={orderBy === "receipt_count"}
                    >
                      Nombre de ticket
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      direction={order}
                      onClick={() => sortHandler("basket_median")}
                      active={orderBy === "basket_median"}
                    >
                      Panier moyen
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      direction={order}
                      onClick={() => sortHandler("canceled_lines")}
                      active={orderBy === "canceled_lines"}
                    >
                      Lignes annulées
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(cash_journals, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (
                    <CashJournalRow key={row.id} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data ? data.cash_journals.length : 10}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
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

export default CashJournalTable;
