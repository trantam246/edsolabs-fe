import React, {  useState, useEffect } from "react";
import { Button, InputAdornment, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/Lock';
import { LoginFunction } from "./loginFunc";
import {
  useHistory,
  useLocation
} from "react-router-dom";
import logo from '../../../logo-dark.png';
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
        backgroundColor: 'rgba(0,0,0,0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
    },
    margin: {
        margin: theme.spacing(1.5),
    },
    button: {
        width: '70%'
    }
}));

export const LoginPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState([])

    const loginUser = (e) => {
        e.preventDefault();
        user.map(item => {
            if(username === item.username && password === item.password) {
                props.getAvt(item.avatar)
                props.getName(item.fullname)
                localStorage.setItem("acess",true);
                history.push("/home/timer")
            } else {
                alert('Sai thong tin dang nhap')
                setUsername('')
                setPassword('')
                history.push("/")
            }
        })
    }

    useEffect(() => {
        fetch('http://localhost:3001/users')
          .then(data => data.json())
          .then(result => {
                setUser(result)
                console.log(result)
          })
    },[])
    return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <img src={logo} alt="logo"/>
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

