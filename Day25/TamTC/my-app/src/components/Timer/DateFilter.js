// import "date-fns"
import React, { useState } from "react"
import DateFnsUtils from "@date-io/date-fns"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"

const useStyles = makeStyles((theme) => ({
  calendar: {
    display: "flex",
    alignItems: "center",
    [`& label`]: {
      marginRight: "2rem",
      marginBottom: "1rem",
      fontSize: "1.6rem",
    },
    [`& input`]: {
      fontSize: "1.6rem",
    },
  },
  calendar__input: {
    margin: "4rem 0 6rem 0",
    width: "14rem",
  },
}))

export default function FilterDate(props) {
  const classes = useStyles()

  const [selectedDate, setSelectedDate] = useState(
    new Date("2021-09-19T21:11:54")
  )

  const handleDateChange = (date) => {
    setSelectedDate(date)
    const filterDays = props.tasks.filter(
      (day) =>
        moment(new Date(day.start_time)).format("DD MM YYYY") ===
        moment(new Date(date)).format("DD MM YYYY")
    )
    props.onFilterDays(filterDays)
  }

  return (
    <div className={classes.calendar}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <label htmlFor="date-picker">Date filter</label>
        <KeyboardDatePicker
          disableToolbar
          className={classes.calendar__input}
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}
