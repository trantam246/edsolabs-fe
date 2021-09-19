import React, { useState, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import userApi from "../../API/userApi"
import {
  useHistory,
} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
  main: {
    boxShadow: "rgb(100 100 111 / 40%) 0 0.7rem 2.9rem 0",
    padding: "0rem 6rem 4rem 6rem",
    borderRadius: "5rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "4rem 0",
  },
  paper: {
    marginTop: theme.spacing(8),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(1),
    position: "relative",
  },

  input: {
    boxShadow: "rgb(100 100 111 / 40%) 0 0.7rem 2.9rem 0",
    borderRadius: "5rem",
    background: "#fff",
    marginBottom: "4rem",
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
  label: {
    fontSize: "1.8rem",
    float: "left",
    fontWeight: "bold",
  },
  btn: {
    float: "right",
    fontSize: "1.6rem",
    padding: "1rem 4rem",
    borderRadius: "5rem",
  },
}))

export default function Login(props) {
  const history = useHistory()
  const classes = useStyles()
  const [enteredUserName, setEnteredUserName] = useState("admin")
  const [enteredPassword, setEnteredPassword] = useState("demo")
  const [user, setUser] = useState()

  const userNameHandler = (e) => {
    setEnteredUserName(e.target.value)
  }

  const passwordHandler = (e) => {
    setEnteredPassword(e.target.value)
  }

  const fetchUser = () => {
    try {
      userApi.getUser().then((res) => setUser(res))
    } catch (error) {}
  }
  useEffect(() => {
    const runUser = setTimeout(() => {
      fetchUser()
    }, 300)
    return () => {
      clearTimeout(runUser)
    }
  }, [])
  const submitHandler = (e) => {
    e.preventDefault()
    history.push("/")

    user &&
      enteredUserName === user[0].username &&
      enteredPassword === user[0].password &&
      props.onLogin()
  }

  return (
    <Container component="main" maxWidth="sm" className={classes.main}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Login
        </Typography>
        <form
          method="post"
          className={classes.form}
          noValidate
          onSubmit={submitHandler}
        >
          <label htmlFor="username" className={classes.label}>
            Username
          </label>
          <TextField
            id="username"
            className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="off"
            autoFocus
            value={enteredUserName}
            onChange={userNameHandler}
          />
          <label htmlFor="password" className={classes.label}>
            Password
          </label>
          <TextField
            id="password"
            className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="off"
            type="password"
            autoFocus
            value={enteredPassword}
            onChange={passwordHandler}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  )
}
