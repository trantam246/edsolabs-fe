import React, {  useState, useEffect } from "react";
import { Button, InputAdornment, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/Lock';
import {
  useHistory,
  useLocation
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems:'center',
      color:'#ffffff'
        
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    margin: {
        margin: theme.spacing(1.5),
    },
    button: {
        width: '70%'
    }
}));

export const LoginPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({})
    const hanldeUsername = () => {

    }
    const loginUser = (e) => {
        e.preventDefault();
        
        const urlencode = new URLSearchParams();
        urlencode.append("username", setUsername(user.username));
        urlencode.append("password", setPassword(user.password))
        // fetch('http://localhost:3001/users', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: urlencode,
        //   redirect: 'follow'
        // })
        //   .then(data => data.json())
        //   .then(result => {
        //         console.log(result)
        //         setUser(result)
        localStorage.setItem("acess",true);
        history.push("/home")
        //   })
    }
    useEffect(() => {
        fetch('http://localhost:3001/users')
          .then(data => data.json())
          .then(result => {
                // console.log(result)
                setUser(result)
                console.log(result)
                // localStorage.setItem("acess",true);
                // history.push("/home")
          })
    },[])
    return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <form onSubmit={loginUser}>
                <Grid container alignItems="flex-end">
                        <TextField
                        className={classes.margin}
                        type="text" 
                        label="Username"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid container alignItems="flex-end">
                    <TextField
                        className={classes.margin}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid>
                    <Grid item>
                        <Button
                        type="submit"
                        className={classes.button} 
                        variant="contained" 
                        color="secondary" 
                        size="large">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </div>
  )
}

