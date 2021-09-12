import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./ZoomAnimation.module.scss";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "4rem auto",
    background: "#3a61ca",
    boxShadow: "rgb(200 200 250 / 90%) 0 0.7rem 2.9rem 0",
    borderRadius: "3rem",
    [`& span`]: {
      textAlign: "center",
      fontSize: "2rem",
    },
    [`& p`]: {
      color: "#fff",
    },
  },

  media: {
    height: "10rem",
    width: "10rem",
    backgroundSize: "contain",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    [`& p`]: {
      fontSize: "1.6rem",
    },
  },
  image: {
    display: "flex",
    alignItems: "center",
    [`&__text`]: {
      display: "flex",
      flexDirection: "column",
    },
  },
}));

export default function TodayWeather(props) {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="sm">
      <CardHeader
        title={`Today's Weather in ${props.city}, ${props.country}`}
      />
      <div className={classes.content}>
        <div className={classes.image}>
          <img
            className={`${classes.media} ${styles.zoomInOut}`}
            src={props.icon}
            alt="icon"
          />
          <div className={classes.image__text}>
            <Typography variant="h6" color="textPrimary" component="p">
              {props.text}
            </Typography>
            <Typography variant="h6" color="textPrimary" component="p">
              {props.temp}&deg;C
            </Typography>
          </div>
        </div>
        <CardContent className={classes.detail}>
          <Typography variant="h6" color="textPrimary" component="p">
            Wind: {props.kph} kph
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
            Precip: {props.precip} mm
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
            Pressure: {props.pressure} mb
          </Typography>
        </CardContent>
      </div>
    </Container>
  );
}
