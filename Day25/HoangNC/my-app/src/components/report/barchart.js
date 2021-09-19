import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ TimeEachTag }) => {
  const data = {
    labels: TimeEachTag.map((tag) => tag.name),
    datasets: [
      {
        barThickness: 20,
        maxBarThickness: 30,
        minBarLength: 2,
        axis: "y",
        label: "Time do this tag (hours)",
        data: TimeEachTag.map((tag) => tag.time_spent),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(134, 203, 207, 0.6)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(134, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar data={data} options={{ indexAxis: "y" }} />
    </div>
  );
};

export default BarChart;
