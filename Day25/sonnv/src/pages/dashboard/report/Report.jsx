import { Grid } from "@material-ui/core";
import BarChart from "components/Chart/BarChart";
import Donut2D from "components/Chart/DoughChart";
import { useTaskContext } from "contexts/TaskContext";
import React from "react";

const Report = () => {
  // const { playing } = useTaskContext();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Donut2D />
      </Grid>

      <Grid item xs={6}>
        <BarChart />
      </Grid>
    </Grid>
  );
};

export default Report;
