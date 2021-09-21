import {
    Box,
    Button,
    InputLabel,
    Paper,
    TextField,
    Typography,
  } from '@material-ui/core';
  import { makeStyles } from '@material-ui/core/styles';
  import { useUserContext } from '../../contexts/UserContext';
  import React, { useState } from 'react';
  import { useHistory } from 'react-router-dom';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 600,
      maxWidth: '100%',
      margin: '40px auto',
      padding: theme.spacing(3),
  
      [theme.breakpoints.up('sm')]: {
        marginTop: '10%',
      },
      '& .MuiTextField-root': {
        margin: '8px 0px',
      },
    },
  }));
  
  const Login = () => {
    const classes = useStyles();
  
    const history = useHistory();
  
    const {  getAllUsers, saveOnLocalStorage } = useUserContext();
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = (username, password) => {
      if (username.trim() === '' || password.trim() === '') {
        console.log('enter username password');
      } else {
        // check user
        getAllUsers()
          .then((res) => {
            // password incorrect
            if (
              res.data.some(
                (user) =>
                  user.username === username.trim() &&
                  user.password !== password.trim()
              )
            ) {
              console.log('password incorrect');
            }
  
            // save user ,login successfully
            res.data.map((user) => {
              if (
                user.username === username.trim() &&
                user.password === password.trim()
              ) {
                saveOnLocalStorage(user);
                history.replace('/');
              }
              return user;
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
  
      // console.log(rs);
    };
  
    return (
      <Paper elevation={3} className={classes.root}>
        <Typography variant="h4" gutterBottom align="center">
          Login 
        </Typography>
  
        <form>
          <Box mb={3}>
            <InputLabel>Username:</InputLabel>
            <TextField
              id="outlined-basic"
              fullWidth
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
  
          <Box mb={3}>
            <InputLabel>Password:</InputLabel>
            <TextField
              id="outlined-basic"
              fullWidth
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button onClick={() => handleLogin(username, password)} variant="contained" color ="primary" align="center">Login</Button>
        </form>
      </Paper>
    );
  };
  
  export default Login;