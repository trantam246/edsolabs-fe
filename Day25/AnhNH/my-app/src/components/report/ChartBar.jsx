import React from 'react'
import { Bar } from 'react-chartjs-2'

export default function ChartBar(props) {
  return (
    <>
      <Bar
        width={100}
        height={60}
        data={{
          labels: ["Online",
          "Meeting",
          "Training",
          "Coding"],
          datasets: [{
            axis: 'y',
            label: 'My First Dataset',
            data: props.dataRender.map(e => e.sumTimeEnd),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              '#198754',
              'rgb(88, 71, 30)',
              'rgb(98, 110, 106)',
              'rgb(157, 92, 218)',
              'rgb(168, 148, 101)',
            ],
            hoverOffset: 4
          }]
        }}
        options={{
          indexAxis: 'y',
        }}
      ></Bar>
    </>
  )
}
