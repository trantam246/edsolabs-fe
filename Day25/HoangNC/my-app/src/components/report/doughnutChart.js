import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ TimeEachTag }) => {
  const data = {
    labels: TimeEachTag.map((tag) => tag.name),
    datasets: [
      {
        label: "Time do this tag (hours)",
        data: TimeEachTag.map((tag) => tag.time_spent),
        backgroundColor: [
          "rgb(44, 196, 219)",
          "rgb(232, 88, 170)",
          "rgb(224, 132, 34)",
          "rgb(20, 189, 8)",
        ],
        hoverOffset: 18,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
