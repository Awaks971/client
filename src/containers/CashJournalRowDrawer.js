import React from "react";
import Grid from "@material-ui/core/Grid";
import PageHeader from "../components/PageHeader";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import CancelIcon from "@material-ui/icons/Cancel";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import MUITableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import moment from "moment";
import ButtonDrawer from "../components/ButtonDrawer";
import { Typography, Divider, Button } from "@material-ui/core";
import useCurrency from "../custom_hooks/useCurrency";
import { useHistory } from "react-router-dom";

function CashJournalRowDrawer({ cash_journal, onClose }) {
  const history = useHistory();
  const euro = useCurrency();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader
          small
          title="Journal de caisse"
          subtitle={new Date(parseInt(cash_journal.date)).toLocaleDateString()}
        >
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </PageHeader>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" justify="space-around" spacing={2}>
          <Grid item xs={6}>
            <Info
              label="Panier moyen"
              value={euro.format(cash_journal.basket_median)}
              icon={<ShoppingCartIcon fontSize="default" color="secondary" />}
            />
          </Grid>
          <Grid item xs={6}>
            <Info
              label="Montant TTC"
              value={euro.format(cash_journal.amount_ttc)}
              icon={<EuroSymbolIcon fontSize="default" color="secondary" />}
            />
          </Grid>
          <Grid item xs={6}>
            <Info
              label="Retour"
              value={cash_journal.canceled_lines}
              icon={<CancelIcon fontSize="default" color="secondary" />}
            />
          </Grid>
          <Grid item xs={6}>
            <Info
              label="Bénéfices"
              value={euro.format(cash_journal.profit_amount)}
              icon={<ShowChartIcon fontSize="default" color="secondary" />}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disableElevation
          onClick={() =>
            history.push(`/cash-journals/${cash_journal.id}/receipts`)
          }
        >
          Voir mes tickets
        </Button>
      </Grid>
    </Grid>
  );
}

function CashJournalRow({ row, row_key }) {
  const euro = useCurrency();
  return (
    <ButtonDrawer
      key={row.id}
      component={({ onClick }) => (
        <TableRow onClick={e => onClick(e)} hover key={row.id}>
          <MUITableCell component="th" scope="row">
            {moment.unix(row.date).isValid()
              ? new Date(parseInt(row.date)).toLocaleDateString()
              : row.date}
          </MUITableCell>
          <MUITableCell align="right">
            {euro.format(row.amount_ttc)}
          </MUITableCell>
          <MUITableCell align="right">{row.receipt_count}</MUITableCell>
          <MUITableCell align="right">
            {euro.format(row.basket_median)}
          </MUITableCell>
          <MUITableCell align="right">{row.canceled_lines}</MUITableCell>
        </TableRow>
      )}
    >
      {({ onClose }) => (
        <CashJournalRowDrawer cash_journal={row} onClose={onClose} />
      )}
    </ButtonDrawer>
  );
}

function Info({ label, icon, value }) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="space-around"
    >
      <Grid item xs={12}>
        <Typography
          color="secondary"
          style={{ fontWeight: 500 }}
          gutterBottom
          variant="h4"
        >
          {value || 0}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {icon}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" color="secondary">
          {label}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CashJournalRow;
