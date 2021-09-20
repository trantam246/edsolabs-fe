import React, { useState } from 'react';
import MomentUtils from "@date-io/moment";
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid } from '@material-ui/core';
export const DateRange = (props) => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.getDate(date)
  };
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justifyContent="flex-start">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DD-MM-YYYY"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}