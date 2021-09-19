import React from "react";
import { Box, TextField, makeStyles } from "@material-ui/core";

import { useReportContext } from "../../pages/Report";
import { toServerDate, formatDate } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

export default function DateRangePicker() {
  const { dateRange, setDateRange } = useReportContext();
  const classes = useStyles();

  const handleStartChange = (e) => {
    const startDate = toServerDate(e.target.value, "start");
    setDateRange((dateRange) => ({ ...dateRange, startDate }));
  };

  const handleEndChange = (e) => {
    const endDate = toServerDate(e.target.value, "end");

    setDateRange((dateRange) => ({ ...dateRange, endDate }));
  };

  return (
    <Box display="flex" component="fieldset" className={classes.root}>
      <legend>Date Range</legend>
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={
          dateRange && dateRange.startDate
            ? formatDate(dateRange.startDate)
            : ""
        }
        onChange={handleStartChange}
      />
      <TextField
        label="End Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={
          dateRange && dateRange.endDate ? formatDate(dateRange.endDate) : ""
        }
        onChange={handleEndChange}
      />
    </Box>
  );
}
