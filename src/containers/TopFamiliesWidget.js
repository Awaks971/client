import React, { useEffect } from "react";
import Paper from "../components/Paper";

import { useQuery } from "@apollo/react-hooks";
import { TOP_5_FAMILIES } from "../apollo/receipts/queries";
import PieChart from "../components/PieChart";

function TopFamiliesWidget({
  range,
  get_printable,
  to_print,
  current_criterion
}) {
  const { data: query_data, loading } = useQuery(TOP_5_FAMILIES, {
    skip: !!to_print,

    variables: { range: { start: range.startDate, end: range.endDate } }
  });
  const families = query_data ? query_data.top_families : to_print;
  const data = families
    ? families.map(
        stat => stat[current_criterion ? current_criterion.name : "amount_ttc"]
      )
    : [];
  const labels = families ? families.map(stat => stat.label) : [];

  useEffect(() => {
    !to_print && get_printable && get_printable(families);
  }, [loading, current_criterion]);

  return (
    <Paper title="Meilleurs familles" bodyLoading={loading} spaced>
      <PieChart
        id="pie-chart-top-families"
        height={350}
        data={data}
        labels={labels}
      />
    </Paper>
  );
}

export default TopFamiliesWidget;
