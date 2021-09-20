import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ timerTag }) => {
  let online = 0;
  let meetting = 0;
  let training = 0;
  let coding = 0;
  timerTag.forEach((item) => {
    if (item.name === 'Online') {
      online = item.time;
    } else if (item.name === 'Meeting') {
      meetting = item.time;
    } else if (item.name === 'Training') {
      training = item.time;
    } else if (item.name === 'Coding') {
      coding = item.time;
    }
  });
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
              data:
                timerTag.length > 0
                  ? [online, meetting, training, coding]
                  : [0, 0, 0, 0],
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
