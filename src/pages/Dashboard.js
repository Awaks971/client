import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import CashJournalChart from "../containers/CashJournalChart";
import PageHeader from "../components/PageHeader";
import RangeButton from "../components/RangeButton";
import PaymentsWidget from "../containers/PaymentsWidget";
import TopFamiliesWidget from "../containers/TopFamiliesWidget";
import TopSellersWidget from "../containers/TopSellersWidget";

function Dashboard() {
  const today = new Date();
  const pastMonth = new Date().setDate(today.getDate() - 30);
  const [currentRange, setCurrentRange] = useState({
    startDate: new Date(pastMonth),
    endDate: today,
    key: "selection",
    color: "#ff6f00"
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title="Tableau de bord">
          <RangeButton getRange={range => setCurrentRange(range)} />
        </PageHeader>
      </Grid>
      {currentRange && (
        <>
          <Grid item xs={12}>
            <CashJournalChart range={currentRange} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TopFamiliesWidget range={currentRange} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TopSellersWidget range={currentRange} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <PaymentsWidget range={currentRange} />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Dashboard;
