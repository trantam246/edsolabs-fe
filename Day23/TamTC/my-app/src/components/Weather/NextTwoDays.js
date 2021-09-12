import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import styles from "./ZoomAnimation.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [`& span`]: {
      textAlign: "center",
      fontSize: "2rem",
    },
    [`& p`]: {
      textAlign: "center",
    },
  },
  media: {
    height: 100,
    width: 100,
    backgroundSize: "contain",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    boxShadow: "rgb(200 200 250 / 90%) 0px 7px 29px 0px",
    background: "#fff",
    borderRadius: 30,
    padding: 20,
  },
  image: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default function NextTwoDays(props) {
  const classes = useStyles();
  const formatDate = dayjs(props.date).format("D/M");
  const formatDay = dayjs(props.date).format("ddd");
  return (
    <Grid item>
      <div className={classes.content}>
        <div className={classes.image__text}>
          <Typography variant="h6" color="textPrimary" component="p">
            {formatDay}
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
            {formatDate}
          </Typography>
        </div>
        <div className={classes.image}>
          <img
            className={`${classes.media} ${styles.zoomInOut}`}
            src={props.icon}
            alt="icon"
          />
          <Typography variant="h6" color="textPrimary" component="p">
            {props.temp}&deg;C
          </Typography>
        </div>
      </div>
    </Grid>
  );
}
