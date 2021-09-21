import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function ReportHeader() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5">Productivity Report</Typography>
    </Paper>
  );
}
