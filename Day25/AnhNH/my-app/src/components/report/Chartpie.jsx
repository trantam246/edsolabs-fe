import React from 'react'
import { Pie } from 'react-chartjs-2'

export default function Chartpie(props) {
  return (
    <>
      <Pie
        width={100}
        height={100}
        data={{
          labels: ["Online",
            "Meeting",
            "Training",
            "Coding"],
          datasets: [{
            label: 'My First Dataset',
            data: props.dataRender.map(e => e.sumTimeEnd),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              '#198754'
            ],
            hoverOffset: 4
          }]
        }}
      ></Pie>
    </>
  )
}
