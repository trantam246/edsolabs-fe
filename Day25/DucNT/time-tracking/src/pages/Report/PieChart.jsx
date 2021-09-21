import React from 'react'
import { Pie } from 'react-chartjs-2'

const PieChart = props => {
  const { perO, perM, perT, perC } = props
  const data = {
    labels: ['Online', 'Meeting', 'Training', 'Coding'],
    datasets: [
      {
        label: 'percent',
        data: [perO * 100, perM * 100, perT * 100, perC * 100],
        fill: false,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }
    ]
  }
  return (
    <>
      <Pie data={data} />
    </>
  )
}

export default PieChart
