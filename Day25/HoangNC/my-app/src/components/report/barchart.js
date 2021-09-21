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
          "rgba(204, 0 , 0, 0.6)",
          "rgba(0, 204, 0, 0.6)",
          "rgba(153, 0, 153, 0.6)",
          "rgba(0, 153, 153, 0.6)",
        ],
        borderColor: [
          "rgb(204, 0 , 0)",
          "rgb(0, 204, 0)",
          "rgb(153, 0, 153)",
          "rgb(0, 153, 153)",
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
