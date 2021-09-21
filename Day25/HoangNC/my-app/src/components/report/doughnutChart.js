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
          "rgb(204, 0 , 0)",
          "rgb(0, 204, 0)",
          "rgb(153, 0, 153)",
          "rgb(0, 153, 153)",
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
