import { Button, Grid, Paper, FormGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


export default function Login() {
  // account from form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // list users
  const [users, setUsers] = useState([]);

  let history = useHistory();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        setUsers([...data])
      });

  }, [])

  // const { from } = this.props.location.state || { from: { pathname: '/' } }
  // const { redirectToReferrer } = this.state

  // if (redirectToReferrer === true) {
  //   <Redirect to={from} />
  // }

  function handleSubmit(e) {
    let ok = false;
    e.preventDefault();
    if (username == '') {
      alert('Enter username')
      return;
    }
    else if (password == '') {
      alert('Enter password')
      return
    }
    else {
      for (const u of users) {
        if (username === u.username && password === u.password) {
          localStorage.setItem('account', JSON.stringify(u));
          localStorage.setItem('isLogged', 'true');
          ok = true;
        }
      }
    }

    if (ok === true) history.replace('/timer');
    else alert("Error information !!!")
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Paper style={{ width: '25%', paddingLeft: '5%', paddingRight: '5%', border: '2px solid black' }}>
        <h2 align='center'>Login</h2>
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

          <FormGroup style={{ marginTop: '5%', marginBottom: '5%' }}>
            <p align="left">Password</p>
            <TextField
              type="password"
              variant="outlined"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>

          <Grid container justifyContent="flex-end" style={{ marginBottom: '7%', marginTop: '7%' }}>
            <Button
              type="submit"
              // onClick={handleSubmit}
              style={{
                width: '25%',
                border: '1px solid rgb(199 199 199)',
              }}
            >Login</Button>
          </Grid>

        </form>
      </Paper>
    </Grid>
  )
}
