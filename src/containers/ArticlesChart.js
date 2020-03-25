import React, { useEffect } from "react";
import Paper from "../components/Paper";
import { useQuery } from "@apollo/react-hooks";
import BarChart from "../components/BarChart";
import { ARTICLES_STATS } from "../apollo/receipts/queries";

function ArticlesChart({
  range,
  current_criterion,
  get_printable,
  to_print,
  limit
}) {
  const { data: query_data = {}, loading } = useQuery(ARTICLES_STATS, {
    skip: !!to_print,

    variables: {
      limit: limit || 20,
      order_by: current_criterion.name,
      range: {
        start: range.startDate,
        end: range.endDate
      }
    }
  });

  const datasets_label = {
    amount_ttc: "Montant TTC",
    article_count: "Nombre d'articles",
    profit: "Marge"
  };

  const cleanStats =
    query_data.articles_stats && query_data.articles_stats.length > 0
      ? query_data.articles_stats
      : to_print;

  const data = cleanStats
    ? cleanStats.map(stat => stat[current_criterion.name || "amount_ttc"])
    : [];
  const labels = cleanStats ? cleanStats.map(stat => stat.label) : [];

  useEffect(() => {
    !to_print && get_printable && get_printable(cleanStats);
  }, [loading]);

  return (
    <Paper title="Meilleurs articles" bodyLoading={loading} spaced>
      <div style={{ position: "relative" }}>
        <div style={{ width: 3000, overflowX: "scroll" }}>
          <BarChart
            id="bar-chart-article-chart"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              pointerEvents: "none"
            }}
            height={350}
            data={data || to_print.data}
            labels={labels || to_print.label}
            dataset={datasets_label[current_criterion.name]}
          />
        </div>
      </div>
    </Paper>
  );
}

export default ArticlesChart;
