import { Box, IconButton, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { useState } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    width: 180,
  },
}));

const DateFilter = ({ getDateFilter, refreshData }) => {
  const classes = useStyles();

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const handleDateChange = (value) => {
    getDateFilter(moment(value.target.value).format('YYYY-MM-DD'));
  };

  const refreshDate = () => {
    setDate(moment().format('YYYY-MM-DD'));
    refreshData();
  };

  return (
    <Box display="flex" alignItems="center" pt={3} pl={2}>
      <Typography variant="body1" gutterBottom>
        Date filter
      </Typography>

      <form className={classes.container} noValidate>
        <TextField
          id="date"
          type="date"
          color="secondary"
          defaultValue={date}
          variant="outlined"
          size="small"
          onChange={handleDateChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>

      <IconButton aria-label="refresh" color="secondary" onClick={refreshDate}>
        <RefreshIcon />
      </IconButton>
    </Box>
  );
};

export default DateFilter;
