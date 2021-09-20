import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {
  const { online, meeting, training, coding } = props.valuePersen;

  return (
    <div>
      <Pie
        width={100}
        height={100}
        data={{
          labels: ['online', 'meetting', 'training', 'coding'],
          datasets: [
            {
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
      ></Pie>
    </div>
  );
};

export default PieChart;
