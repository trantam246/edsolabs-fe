import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
export const Chart = (props) => {
  const classes = useStyle();
  return (
    <Grid container className={classes.root} alignItems='center' justifyContent='center'>
      <Grid item xs={6} classes>
        <Doughnut 
          data={
             { 
              datasets: [
                {
                  data: [props.online, props.meet, props.train, props.code],
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
            }
          }
          width={100}
	        height={50}   
        />
      </Grid>
      <Grid item xs={6} >
        <Bar 
        data={{
          labels: ['Online', 'Meetting', 'Training', 'Coding'],
          datasets: [{
            label: props.label,
            data: [props.online, props.meet, props.train, props.code, props.online + props.meet + props.train + props.code],
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
          }],
        }} 
        options={
          {   
            indexAxis: 'y',
            elements: {
              bar: {
                borderWidth: 2,
                },
            },
            responsve: true,
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
          }
        }/>
      </Grid>
    </Grid>
  )
};

