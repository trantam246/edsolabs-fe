import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [`& span`]: {
      textAlign: "center",
      fontSize: "2rem",
    },
    [`& p`]: {
      textAlign: "center",
      fontSize: "1.6rem",
    },
  },
}));
const GridContainer = (props) => {
  const classes = useStyles();
  const [spacing] = useState(2);

  return (
    <Grid container className={classes.root} spacing={spacing}>
      <Grid item xs={12}>
        <CardHeader title="Next 2 day forecast" />
        <Grid container justifyContent="center" spacing={spacing}>
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default GridContainer;
