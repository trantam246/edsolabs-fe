import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const data = {
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: [
        'red',
        'blue',
        'yellow',
        'green',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: '30px',    
    textAlign:'center',
    width: 'auto'
  },
  donutChart: {
    textAlign:'center'
  }
}))
export const Chart = () => {
  const classes = useStyle();
  return (
    <Grid container className={classes.root} alignItems='center' justifyContent='center'>
      <Grid item xs={6} classes>
        <Doughnut 
          data={data}
          width={100}
	        height={50}   
        />
      </Grid>
      <Grid item xs={6} >
        <BarChart/>
      </Grid>
    </Grid>
  )
};


const Bardata = {
  labels: ['Online', 'Meetting', 'Training', 'Relax'],
  datasets: [
    {
      label: '# of Tag',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'red',
        'blue',
        'yellow',
        'green',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    }
  ],
};

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          color:'#ffffff'
        }
      }
    },
  },
};

export const BarChart = () => {
  return (
    <Bar data={Bardata} options={options}/>
  )
};
