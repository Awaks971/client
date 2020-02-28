import { useQuery } from "@apollo/react-hooks";
import { CircularProgress, TableFooter } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MUITableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect } from "react";
import { ARTICLES_STATS } from "../apollo/receipts/queries";
import Paper from "../components/Paper";
import { TableCell } from "../components/Table";
import useCurrency from "../custom_hooks/useCurrency";
import useNumberFormat from "../custom_hooks/useNumberFormat";

function StatsArticlesTable({ current_criterion, range, get_recap }) {
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, loading } = useQuery(ARTICLES_STATS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      order_by: current_criterion.name,
      range: {
        start: range.startDate,
        end: range.endDate
      }
    }
  });

  const euro = useCurrency();
  const number = useNumberFormat();

  const article_stats = data ? data.articles_stats : [];

  const reduce_article_stat = field => {
    if (article_stats.length > 0) {
      return (
        article_stats.reduce((acc, journal) => {
          return acc + journal[field];
        }, 0) || 0
      );
    } else return "-";
  };

  useEffect(() => {
    const recap = [
      {
        label: "Montant TTC",
        value: euro.format(reduce_article_stat("amount_ttc"))
      },
      {
        label: "Marge total",
        value: euro.format(reduce_article_stat("profit"))
      },
      {
        label: "Quantité total",
        value: number.format(reduce_article_stat("article_count"))
      }
    ];
    get_recap && get_recap(recap);
  }, [article_stats.length]);

  return (
    <Paper title="Tous les articles">
      <TableContainer
        style={{
          maxHeight: "60vh",
          minHeight: 100,
          position: "relative",
          zIndex: 1
        }}
      >
        {loading ? <TableLoader /> : null}
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Désignation</TableCell>
              <TableCell align="right">Montant TTC</TableCell>
              <TableCell align="right">Marge réalisé</TableCell>
              <TableCell align="right">Quantité</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {article_stats
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow key={row.id}>
                  <MUITableCell>{row.label}</MUITableCell>
                  <MUITableCell align="right">
                    {euro.format(row.amount_ttc)}
                  </MUITableCell>
                  <MUITableCell align="right">
                    {euro.format(row.profit)}
                  </MUITableCell>
                  <MUITableCell align="right">{row.article_count}</MUITableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Totaux</TableCell>
              <TableCell align="right">
                {euro.format(reduce_article_stat("amount_ttc"))}
              </TableCell>
              <TableCell align="right">
                {reduce_article_stat("profit")}
              </TableCell>
              <TableCell align="right">
                {reduce_article_stat("article_count")}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <TablePagination
        labelDisplayedRows={({ from, to, count }) =>
          `${from} à ${to} pour ${count} lignes`
        }
        labelRowsPerPage="Lignes par page"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={article_stats ? article_stats.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
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

export default StatsArticlesTable;
