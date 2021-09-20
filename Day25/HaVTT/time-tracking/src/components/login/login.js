import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { setUserLocal } from "../layout/common";
import { 
  Paper,
  Typography,
  Button,
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px 40px',
    borderRadius: '25px',
    width: '40%',
    margin: 'auto',
  },
  form: {
    marginTop: '50px',
    padding: '2px 4px',
    alignItems: 'center',
    border: '2px soild',
    alignSelf : 'center',
  },
  input: {
    width: '90%',
    borderRadius: '5px',
    border: '2px soild',
    padding: '6px 8px',
    marginBottom: '5px',
  },
  btn: {
    marginTop: '30px',
    marginLeft: '80%',
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [user, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const OnLogin = () => {
    setError(null);
    setLoading(true);
    if (user === "" && pass === "") {
      alert("Vui lòng nhập tên đăng nhập mật khẩu");
      setLoading(false);
    } 
    else {
      axios
        .get("http://localhost:3000/users")
        .then((response) => {
          setLoading(false);
          if (
            user ===
              response.data.find(({ username }) => username === user)
                .username &&
            pass ===
              response.data.find(({ username }) => username === user).password
          ) {
            setUserLocal(
              response.data.find(({ username }) => username === user).fullname,
              response.data.find(({ username }) => username === user).avatar
            );
            props.history.push("/");
            window.location.reload();
            alert("Đăng nhập thành công!");
          } else {
            console.log("err");
          }
        })
        .catch((error) => {
          setLoading(false);
          setError("Wrong username or password");
        });
    }
  };
  return (
    <Paper className={classes.root}>
    <Typography variant="h3" align="center">
      Login
    </Typography>
    {error && <div className={classes.error}>{error}</div>}
    <form className={classes.form}>
      <p>Username:</p>
        <input
          className={classes.input}
          placeholder={'Username'}
          onChange={(event) => setUsername(event.target.value)}
        />
      <p>Password:</p>
        <input
          className={classes.input}
          placeholder={'Password'}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button 
            className={classes.btn} 
            variant="contained" 
            onClick={OnLogin}
            value={loading ? "Loading" : "Login"}
        >
            Login
          </Button>
    </form>
  </Paper>
  );
}