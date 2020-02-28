import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ labels, data, dataset, ...rest }) {
  const dataToDisplay = {
    labels: labels,

    datasets: [
      {
        lineTension: 0.2,

        label: dataset,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
      }
    ]
  };

  return (
    <div style={{ postion: "relative", height: rest.height, width: "100%" }}>
      <Line
        legend={{ display: false }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  padding: 2
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  padding: 5,
                  maxRotation: 0,
                  maxTicksLimit: 5
                }
              }
            ]
          }
        }}
        {...rest}
        data={dataToDisplay}
      />
    </div>
  );
}

export default LineChart;
