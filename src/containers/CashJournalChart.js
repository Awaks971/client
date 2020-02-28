import React from "react";
import Paper from "../components/Paper";
import { useQuery } from "@apollo/react-hooks";
import LineChart from "../components/LineChart";
import { CA_TTC_BY_COMPANY_BY_DAY } from "../apollo/cash_journals/queries";
import { Grid, Typography } from "@material-ui/core";
import useCurrency from "../custom_hooks/useCurrency";

function CashJournalChart({ range }) {
  const { data = {}, loading } = useQuery(CA_TTC_BY_COMPANY_BY_DAY, {
    variables: range
      ? {
          range: {
            start: range.startDate,
            end: range.endDate
          }
        }
      : {}
  });

  const cleanJournals =
    data.cash_journals && data.cash_journals.length > 0
      ? data.cash_journals.map(journal => {
          return {
            ...journal,
            date: new Date(parseInt(journal.date)).toLocaleDateString()
          };
        })
      : [];

  const chartData = cleanJournals
    ? cleanJournals.map(journal => journal.amount_ttc)
    : [];
  const chartLabels = cleanJournals
    ? cleanJournals.map(journal => journal.date)
    : [];

  const cameBackItems = cleanJournals
    ? cleanJournals.reduce((acc, item) => {
        return acc + parseInt(item.canceled_lines);
      }, 0)
    : 0;

  const billCount = cleanJournals
    ? cleanJournals.reduce((acc, item) => {
        return acc + parseInt(item.receipt_count);
      }, 0)
    : 0;

  const euro = useCurrency();

  const indicators = [
    {
      label: "Montant maximum",
      value: euro.format(Math.max.apply(null, chartData))
    },
    { label: "Nombre de tickets", value: billCount },
    { label: "Nombre de retours", value: cameBackItems }
  ];

  return (
    <Paper title="Journaux de caisse" bodyLoading={loading}>
      <IndicatorFields fields={indicators} />
      <LineChart
        height={300}
        data={chartData}
        labels={chartLabels}
        dataset="CA"
      />
    </Paper>
  );
}

function IndicatorFields({ fields = [] }) {
  return (
    <div style={{ margin: 10 }}>
      <Grid container alignItems="center" spacing={2} justify="center">
        {fields.map(field => (
          <Grid item md={4} sm={6} xs={6} key={field.label}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Grid item xs={6}>
                <Typography
                  align="center"
                  color="secondary"
                  style={{ fontWeight: 900 }}
                >
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  align="center"
                  color="secondary"
                  variant="h3"
                  style={{ fontWeight: 900 }}
                >
                  {field.value}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CashJournalChart;
