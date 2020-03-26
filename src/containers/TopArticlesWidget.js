import React, { useState, useEffect } from "react";
import Paper from "../components/Paper";
import BarChart from "../components/BarChart";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ARTICLES_STATS } from "../apollo/receipts/queries";
import { useQuery } from "@apollo/react-hooks";

function TopArticlesWidget({ range }) {
  const [criterion, set_criterion] = useState("amount_ttc");

  const { data: query_data = {}, loading } = useQuery(ARTICLES_STATS, {
    variables: {
      limit: 5,
      order_by: criterion,
      range: {
        start: range.startDate,
        end: range.endDate
      }
    }
  });
  const cleanStats =
    query_data.articles_stats && query_data.articles_stats.length > 0
      ? query_data.articles_stats
      : [];
  const data = cleanStats ? cleanStats.map(stat => stat[criterion]) : [];
  const labels = cleanStats ? cleanStats.map(stat => stat.label) : [];

  return (
    <Paper
      bodyLoading={loading}
      title="Top 5 articles"
      actions={
        <SelectCriteria
          current_criterion={criterion => set_criterion(criterion)}
        />
      }
    >
      <BarChart
        id="bar-chart-article-chart"
        height={350}
        data={data}
        labels={labels}
        dataset={criterion}
      />
    </Paper>
  );
}

function SelectCriteria({ current_criterion }) {
  const [criterion, set_criterion] = useState("amount_ttc");
  const handleChange = event => {
    set_criterion(event.target.value);
  };

  useEffect(() => {
    current_criterion(criterion);
  }, [criterion, set_criterion]);

  return (
    <FormControl>
      {/* <InputLabel id="criteria-select-label">Critère</InputLabel> */}
      <Select
        labelId="criteria-select-label"
        id="criteria-select"
        value={criterion}
        onChange={handleChange}
      >
        <MenuItem value="amount_ttc">Montant TTC</MenuItem>
        <MenuItem value="profit">Marge</MenuItem>
        <MenuItem value="quantity">Quantité</MenuItem>
      </Select>
    </FormControl>
  );
}

export default TopArticlesWidget;
