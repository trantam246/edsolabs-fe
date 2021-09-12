import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TodayWeather from "./TodayWeather";
import NextTwoDays from "./NextTwoDays";
import GridContainer from "../UI/GridContainer.js";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const WeatherList = (props) => {
  const twoDays = props.data?.forecast?.forecastday.slice(1);
  const classes = useStyles();

  if (props.data?.location)
    return (
      <>
        <TodayWeather
          city={props.data?.location?.name}
          country={props.data?.location?.country}
          icon={props.data?.current?.condition?.icon}
          text={props.data?.current?.condition?.text}
          temp={props.data?.current?.temp_c}
          kph={props.data?.current?.wind_kph}
          precip={props.data?.current?.precip_mm}
          pressure={props.data?.current?.pressure_mb}
        />
        <GridContainer>
          {twoDays?.map((e, i) => (
            <NextTwoDays
              key={i}
              date={e?.date}
              icon={e?.day.condition.icon}
              temp={e?.day.avgtemp_c}
            />
          ))}
        </GridContainer>
      </>
    );
  return (
    <Typography component="h1" variant="h5" className={classes.paper}>
      Không tìm thấy địa điểm
    </Typography>
  );
};
export default WeatherList;
