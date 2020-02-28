import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ labels, data, dataset, ...rest }) {
  const colors = generateHexadecimalCode(data);
  const border_colors = colors.map(color => color.slice(0, -2));

  const dataToDisplay = {
    labels: labels,

    datasets: [
      {
        label: dataset,
        fill: true,
        backgroundColor: colors,
        borderColor: border_colors,
        borderWidth: 1,
        data: data
      }
    ]
  };

  return (
    <Pie
      legend={{ display: true }}
      options={{
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                callback: function(label, index, labels) {
                  return null;
                }
              },
              gridLines: {
                display: false,
                offsetGridLines: false
              }
            }
          ]
        }
      }}
      {...rest}
      data={dataToDisplay}
    />
  );
}

function generateHexadecimalCode(data) {
  return data.map(
    () => "#" + (Math.floor(Math.random() * 16777215).toString(16) + "60")
  );
}

export default PieChart;
