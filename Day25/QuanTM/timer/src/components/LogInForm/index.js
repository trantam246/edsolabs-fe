import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Avatar,
  Button,
  makeStyles,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { useGlobalContext } from "../ContextProvider";
import history from "../../history";
import loginAPI from "../../api/loginAPI";

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.palette.primary.main,
    marginBottom: "0.5rem",
  },
  button: {
    marginTop: "1rem",
  },
}));

export default function LogInForm() {
  const classes = useStyles();
  const { setUser } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const aut = async () => {
    const res = await loginAPI(username, password);
    const { data } = res;
    if (data.length === 0 || data.length > 1) {
      alert("Tài khoản hoặc mật khẩu không chính xác");
      return;
    }
    setUser(data[0]);
    history.push("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    aut();
  };

  return (
    <Container component="main" maxWidth="xs">
      <form method="post" onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Sign In
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            variant="outlined"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign In
          </Button>
        </Box>
      </form>
    </Container>
  );
}
