import 'moment';
import moment from 'moment';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker(props) {
  const [selectedDate, setSelectedDate] = useState(new moment());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.getDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="DD/MM/YYYY"
        margin="normal"
        id="date-picker-inline"
        label="Find list task by day"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
