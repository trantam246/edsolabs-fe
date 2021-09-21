import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  const { perO, perM, perT, perC } = props;
  const data = {
    labels: ["Online", "Meeting", "Training", "Coding"],
    datasets: [
      {
        label: "percent",
        data: [perO * 100, perM * 100, perT * 100, perC * 100],
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  // console.log(perO * 20);
  // console.log(perM * 20);
  // console.log(perT * 20);
  // console.log(perC * 20);
  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default BarChart;
