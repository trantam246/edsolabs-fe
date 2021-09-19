import React from "react";
import "date-fns";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useStyles } from "./style";

export default function DateFilter() {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  return (
    <div className={classes.filter}>
      <div className={classes.dateFilter}>
        <span>Date filter :</span>
        <div className={classes.datePicker}>
          {" "}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Pickday"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}
