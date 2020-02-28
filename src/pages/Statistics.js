import { Grid, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import ButtonCriteria from "../components/ButtonCritria";
import PageHeader from "../components/PageHeader";
import RangeButton from "../components/RangeButton";
import ArticlesChart from "../containers/ArticlesChart";
import StatsArticlesTable from "../containers/StatsArticlesTable";
import StatsPrinterButton from "../containers/StatsPrinterButton";
import TopFamiliesWidget from "../containers/TopFamiliesWidget";
import TopSellersWidget from "../containers/TopSellersWidget";
import PaymentsWidget from "../containers/PaymentsWidget";
import TableRecap from "../components/TableRecap";

function Statistics() {
  const today = new Date();
  const pastMonth = new Date().setDate(today.getDate() - 30);
  const [currentRange, setCurrentRange] = useState({
    startDate: new Date(pastMonth),
    endDate: today,
    key: "selection",
    color: "#ff6f00"
  });
  const [current_criterion, set_current_criterion] = useState({
    name: "amount_ttc",
    label: "Montant TTC"
  });

  const [printable_stats, set_printable_stats] = useState({
    articles_stats: null,
    top_families: null,
    top_sellers: null,
    payment_journal: null
  });

  const [current_recap, set_current_recap] = useState([]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title="Satistiques">
          <StatsPrinterButton
            currentRange={currentRange}
            current_criterion={current_criterion}
            printable={printable_stats}
          />
          <ButtonCriteria
            criterion={criterion => set_current_criterion(criterion)}
          />
          <RangeButton getRange={range => setCurrentRange(range)} />
        </PageHeader>
      </Grid>

      <Grid item xs={12}>
        <ArticlesChart
          range={currentRange}
          current_criterion={current_criterion}
          get_printable={printable =>
            set_printable_stats({
              ...printable_stats,
              articles_stats: printable
            })
          }
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <TopFamiliesWidget
          current_criterion={current_criterion}
          get_printable={printable =>
            set_printable_stats({
              ...printable_stats,
              top_families: printable
            })
          }
          range={currentRange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TopSellersWidget
          current_criterion={current_criterion}
          get_printable={printable =>
            set_printable_stats({
              ...printable_stats,
              top_sellers: printable
            })
          }
          range={currentRange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <PaymentsWidget
          current_criterion={current_criterion}
          get_printable={printable =>
            set_printable_stats({
              ...printable_stats,
              payment_journal: printable
            })
          }
          range={currentRange}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TableRecap recap={current_recap} />
          </Grid>
          <Grid item xs={12}>
            <StatsArticlesTable
              get_recap={recap => set_current_recap(recap)}
              current_criterion={current_criterion}
              range={currentRange}
              current_criterion={current_criterion}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Statistics;
