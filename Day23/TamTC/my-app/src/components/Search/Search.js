import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import RemoveVietNamese from "./RemoveVietnamese";
const useStyles = makeStyles((theme) => ({
  main: {
    padding: 0,
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  paper: {
    marginTop: theme.spacing(8),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    top: "47%",
    left: "1rem",
    color: "black",
    zIndex: 2,
  },
  input: {
    boxShadow: "rgb(100 100 111 / 40%) 0 0.7rem 2.9rem 0",
    borderRadius: "5rem",
    background: "#fff",

    [`& fieldset`]: {
      border: "none",
    },
    [`& input`]: {
      fontSize: "1.6rem",
      paddingLeft: "3rem",
      borderRadius: "5rem",
      [`&::placeholder`]: {
        fontSize: "1.4rem",
        color: "black",
      },
      [`&:focus`]: {
        boxShadow: "rgb(200, 220, 220) 0.1rem 0.1rem 0.8rem 0.1rem",
      },
    },
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const [enteredValue, setEnteredValue] = useState("");

  const enteredHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    enteredValue.trim() === ""
      ? alert("Vui lòng nhập khu vực bạn muốn xem dự báo thời tiết")
      : props.onAddWeather(RemoveVietNamese(enteredValue));
    enteredValue && setEnteredValue("");
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.main}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Edsolabs 3 - Day Forecast
        </Typography>
        <form
          method="post"
          className={classes.form}
          noValidate
          onSubmit={submitHandler}
        >
          <SearchIcon className={classes.searchIcon} />
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder="Nhập thành phố muốn xem"
            autoComplete="off"
            autoFocus
            value={enteredValue}
            onChange={enteredHandler}
          />
        </form>
      </div>
    </Container>
  );
}
