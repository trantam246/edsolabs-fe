import React, { useState, useContext } from "react"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useHistory } from "react-router-dom"
import Context from "../../context/Context"

const useStyles = makeStyles((theme) => ({
  main: {
    boxShadow: "rgb(100 100 111 / 40%) 0 7px 29px 0",
    padding: "0px 60px 40px 60px",
    borderRadius: "50px",
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    margin: "40px 0",
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
    boxShadow: "rgb(100 100 111 / 40%) 0 7px 29px 0",
    borderRadius: "50px",
    background: "#fff",
    marginBottom: "40px",
    [`& fieldset`]: {
      border: "none",
    },
    [`& input`]: {
      fontSize: "16px",
      paddingLeft: "30px",
      borderRadius: "50px",
      [`&::placeholder`]: {
        fontSize: "14px",
        color: "black",
      },
      [`&:focus`]: {
        boxShadow: "rgb(200, 220, 220) 1px 1px 8px 1px",
      },
    },
  },
  label: {
    fontSize: "18px",
    float: "left",
    fontWeight: "bold",
  },
  btn: {
    float: "right",
    fontSize: "16px",
    padding: "10px 40px",
    borderRadius: "50px",
  },
}))

export default function Login(props) {
  const ctx = useContext(Context)
  const history = useHistory()
  const classes = useStyles()
  const [enteredEmail, setEnteredEmail] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("")

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value)
  }

  const passwordHandler = (e) => {
    setEnteredPassword(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const email = ctx.user[0].email
    const password = ctx.user[0].password
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!")
      return
    }

    if (enteredEmail.trim() !== email || enteredPassword.trim() !== password) {
      alert("Email hoặc mật khẩu không chính xác!")
      return
    }

    history.push("/")
    enteredEmail === ctx.user[0].email &&
      enteredPassword === ctx.user[0].password &&
      ctx.onLogin()
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
            value={enteredEmail}
            onChange={emailHandler}
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
