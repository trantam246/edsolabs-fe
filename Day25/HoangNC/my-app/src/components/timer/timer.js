import React, { useState, useEffect } from "react";
import Header from "../timer/header";
import Filter from "../timer/dateFilter";
import Showtask from "../timer/renderTask";
import Sidebar from "../common/Sidebar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useStyles } from "./style";
import { groupDay } from "../common/common";
import { getTasksLimit } from "../apis/apis";

export default function Timer() {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const handleLoadmore = () => {
    setLimit(limit + 5);
  };
  const [tasks, setTask] = useState([]);
  useEffect(() => {
    getTasksLimit(limit)
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Không thể kết nối tới server");
      });
  }, [limit]);

  return (
    <div>
      {" "}
      <Grid container spacing={6}>
        <Grid item xs={2} className={classes.border}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} className={classes.main}>
          <Header />
          <Filter />
          <Showtask task={groupDay(tasks).reverse()} />
          <div className={classes.loadmore}>
            {" "}
            <Button variant="contained" onClick={handleLoadmore}>
              Load more
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
