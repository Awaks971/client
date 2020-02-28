import React, { useEffect } from "react";
import Paper from "../components/Paper";
import { useQuery } from "@apollo/react-hooks";
import { TOP_5_SELLERS } from "../apollo/receipts/queries";

import BarChart from "../components/BarChart";
function TopSellersWidget({
  range,
  get_printable,
  to_print,
  current_criterion
}) {
  const { data: query_data, loading } = useQuery(TOP_5_SELLERS, {
    skip: !!to_print,
    variables: { range: { start: range.startDate, end: range.endDate } }
  });
  const sellers = query_data ? query_data.top_sellers : to_print;

  const data = sellers
    ? sellers.map(
        stat => stat[current_criterion ? current_criterion.name : "amount_ttc"]
      )
    : [];
  const labels = sellers ? sellers.map(stat => stat.name) : [];

  useEffect(() => {
    !to_print && get_printable && get_printable(sellers);
  }, [loading]);

  return (
    <Paper title="Meilleurs vendeurs" bodyLoading={loading} spaced>
      <BarChart
        id="bar-chart-top-seller"
        height={350}
        data={data}
        labels={labels}
      />
    </Paper>
  );
}

export default TopSellersWidget;
