import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import image from '../public/assest/paper.jpg';
async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${image})`,
  },
  form: {
    width: '40%',
    margin: '0 auto',
    padding: '20px',
  },
  button: {
    float: 'right',
    marginTop: '10px',
  },
}));
export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
    history.push('./');
  };
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <Card elevation={10} className={classes.form}>
        <Container maxWidth="xs">
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              type="password"
              label="Password"
              placeholder="Enter password"
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Container>
      </Card>
    </Grid>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
