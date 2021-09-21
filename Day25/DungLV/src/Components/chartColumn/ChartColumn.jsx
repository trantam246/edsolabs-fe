import React from 'react';
import { Bar } from 'react-chartjs-2';

const ColumnChart = (props) => {
  const { online, meeting, training, coding } = props.valuePersen;
  return (
    <Bar
      width={100}
      height={60}
      data={{
        labels: ['online', 'meetting', 'training', 'coding'],
        datasets: [
          {
            axis: 'y',
            label: 'My First Dataset',
            data: [online, meeting, training, coding],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              '#198754',
            ],
            hoverOffset: 4,
          },
        ],
      }}
      options={{
        indexAxis: 'y',
      }}
    />
  );
};

export default ColumnChart;
