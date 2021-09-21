import React, { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { setUserLocal } from "../common/common";
import { useStyles } from "./style";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();

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
    } else {
      axios
        .get("http://localhost:4000/users")
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="UserName"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              label="Password"
              type="password"
              id="passWord"
              autoComplete="current-password"
            />

            {error && <div className={classes.error}>{error}</div>}
            <input
              type="button"
              variant="contained"
              value={loading ? "Loading" : "Login"}
              disabled={loading}
              className={classes.login}
              onClick={OnLogin}
            ></input>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
