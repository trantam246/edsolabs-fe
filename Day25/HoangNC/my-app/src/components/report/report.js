import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Sidebar from "../common/Sidebar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useStyles } from "./style";
import Bar from "./barchart";
import Doughnut from "./doughnutChart";
import TimeTags from "./dataForChart";

export default function Report() {
  const classes = useStyles();
  const [time, setTime] = useState("");
  const totalTimeSpent = () => {
    const total = TimeTags().reduce((prev, curr) => prev + curr.time_spent, 0);
    return total.toFixed(2);
  };
  console.log(totalTimeSpent());
  return (
    <Grid container spacing={6}>
      <Grid item xs={2} className={classes.border}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <header className={classes.header}>
          <h1>Productivity report</h1>
        </header>
        <main>
          <div className={classes.filter}>
            <div className={classes.totalTime}>
              <h3>This week: </h3>
              <span>{totalTimeSpent()} hours</span>
            </div>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={20}>Yesterday</MenuItem>
                <MenuItem value={30}>This week</MenuItem>
                <MenuItem value={40}>Last week</MenuItem>
                <MenuItem value={50}>This month</MenuItem>
                <MenuItem value={60}>Last month</MenuItem>
                <MenuItem value={70}>Date range</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Doughnut TimeEachTag={TimeTags()} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Bar TimeEachTag={TimeTags()} />
            </Grid>
          </Grid>
        </main>
      </Grid>
    </Grid>
  );
}
