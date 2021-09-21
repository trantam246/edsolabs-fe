import React, { useState } from "react";
import "date-fns";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from 'moment';
import { useStyles } from "./style";
import { useTaskContext } from "../layout/taskContext";
// import IconButton from "@mui/material/IconButton";
// import RefreshIcon from '@material-ui/icons/Refresh';

export default function DateFilter({ getDateFilter, refreshData }) {
  const classes = useStyles();
  const { value, setValue, setRender, render } = useTaskContext();
  // const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  // const refreshDate = () => {
  //   setDate(moment().format('YYYY-MM-DD'));
  //   refreshData();
  // };

  return (
    <div className={classes.container}>
      <span className={classes.text}>Date filter :</span>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          id="date"
          type="date"
          color="secondary"
          // defaultValue={date}
          variant="outlined"
          size="small"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(newValue) => {
            setRender(!render);
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {/* <IconButton aria-label="refresh" color="secondary" onClick={refreshDate}>
        <RefreshIcon />
      </IconButton> */}
    </div>
  );
}