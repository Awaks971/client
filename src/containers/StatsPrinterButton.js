import React, { useRef } from "react";
import FullScreenDialogButton from "../components/FullScreenDialogButton";
import { Button, Grid, Typography, Divider } from "@material-ui/core";
import Paper from "../components/Paper";

import PrintIcon from "@material-ui/icons/Print";
import StatsArticlesTable from "./StatsArticlesTable";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_LOGGED_USER } from "../apollo/user/queries";

import styled from "styled-components";
import ArticlesChart from "./ArticlesChart";
import TopFamiliesWidget from "./TopFamiliesWidget";
import TopSellersWidget from "./TopSellersWidget";
import PaymentsWidget from "./PaymentsWidget";
import RootRef from "@material-ui/core/RootRef";

import { useState } from "react";

function StatsPrinterButton({ printable, currentRange, current_criterion }) {
  const ref = useRef();
  const {
    data: { auth },
    loading
  } = useQuery(CURRENT_LOGGED_USER);

  const [dialodIsOpen, setDialog] = useState(false);

  return (
    <FullScreenDialogButton
      isOpen={open => setDialog(open)}
      buttonComponent={({ onClick }) => (
        <Button
          size="small"
          onClick={onClick}
          color="primary"
          variant="outlined"
        >
          Imprimer
          <PrintIcon style={{ marginLeft: 5 }} />
        </Button>
      )}
    >
      {({ onClose }) => {
        return (
          dialodIsOpen && (
            <RootRef rootRef={ref}>
              <PrintableStats
                auth={auth}
                id="component-to-print"
                printable={printable}
                currentRange={currentRange}
                current_criterion={current_criterion}
              />
            </RootRef>
          )
        );
      }}
    </FullScreenDialogButton>
  );
}

class PrintableStats extends React.Component {
  render() {
    const { printable, currentRange, current_criterion, auth } = this.props;
    return (
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12}>
          <Paper id="stats_to_print" spaced style={{ marginTop: 55 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <CompanyPart auth={auth} />
              </Grid>
              <Grid item xs={6}>
                <CashJournalPart />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <ArticlesChart
                  range={currentRange}
                  current_criterion={current_criterion}
                  to_print={printable.articles_stats}
                />
              </Grid>

              <Grid item xs={12}>
                <TopFamiliesWidget
                  current_criterion={current_criterion}
                  to_print={printable.top_families}
                  range={currentRange}
                />
              </Grid>
              <Grid item xs={12}>
                <TopSellersWidget
                  current_criterion={current_criterion}
                  to_print={printable.top_sellers}
                  range={currentRange}
                />
              </Grid>
              <Grid item xs={12}>
                <PaymentsWidget
                  current_criterion={current_criterion}
                  to_print={printable.payment_journal}
                  range={currentRange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

// function PrintableStats() {}

function CompanyPart({ auth }) {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h4" style={{ fontWeight: 900 }}>
          {auth.loggedAs.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{auth.loggedAs.address.line1}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          {auth.loggedAs.address.postal_code}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{auth.loggedAs.address.city}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          <Label>Siret : </Label>
          {auth.loggedAs.siret}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          <Label>Téléphone : </Label>
          {auth.loggedAs.phone}
        </Typography>
      </Grid>
    </Grid>
  );
}

function CashJournalPart({ cash_journal }) {
  const cash_journal_infos = [
    { label: "Numéro de journal : ", value: 182193213 },
    { label: "Numéro de caisse : ", value: "FR2R423FCEZQ" },
    { label: "Ouverture : ", value: "16/12/1994 à 16h20" },
    { label: "Fermeture : ", value: "16/12/1994 à 16h20" },
    { label: "Vendeur : ", value: "Nicolas" }
  ];

  return (
    <>
      {cash_journal_infos.map(info => (
        <Grid
          container
          key={info.label}
          alignItems="center"
          justify="space-between"
        >
          <Grid item xs={6}>
            <Label big>{info.label}</Label>
          </Grid>
          <Grid item xs={6}>
            {info.value}
          </Grid>
        </Grid>
      ))}
    </>
  );
}

const Label = styled.span`
  font-weight: 900;
  font-size: ${({ big }) => (big ? "17px" : "15px")};
`;

export default StatsPrinterButton;
