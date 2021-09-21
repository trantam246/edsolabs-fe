import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart(props){
  const total = props.online + props.meeting + props.training + props.coding;
  return (
    <div>
      <Doughnut data={{
          labels: ['Online', 'Meeting', 'Training', 'Coding'],
          datasets: [
            {
              label: 'something',
              data: [
                (props.online / total) * props.sum,
                (props.meeting / total) * props.sum,
                (props.training / total) * props.sum,
                (props.coding / total) * props.sum,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
        }} />
    </div>
  );
};
