import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ labels, data, dataset, displayLegend = false, ...rest }) {
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
    <Bar
      legend={{ display: displayLegend }}
      options={{
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                callback: function(label, index, labels) {
                  if (/\s/.test(label)) {
                    return label.split(" ");
                  } else {
                    return label;
                  }
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

export default BarChart;
