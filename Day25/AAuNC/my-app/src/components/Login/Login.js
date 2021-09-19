import { Button, Grid, Paper, FormGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

export default function Login() {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Paper>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <p align="left">Username</p>
            <TextField
              autoFocus
              variant="outlined" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <p align="left">Password</p>
            <TextField
              type = "password"
              variant="outlined" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <Button type="submit">Login</Button>
        </form>
      </Paper>
    </Grid>
  )
}
