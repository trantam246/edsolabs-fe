import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import Context from "../../context/Context"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  header: {
    position: "relative",
    justifyContent: "flex-end",
  },
  logout: {
    position: "absolute !important",
    top: "70px",
    right: "30px",
    zIndex: 1,
    width: "140px",
    color: "white !important",
    backgroundColor: "#1976d2 !important",
    // display: "none !important",
  },
  login: {
    position: "relative",
    "&::after": {
      content: "''",
      display: "block",
      height: "26px",
      zIndex: 2,
      position: "absolute",
      top: "30px",
      left: "-10px",
      width: "160px",
      background: "transparent",
    },
    [`&:hover`]: {
      "& ~ $logout": {
        display: "block !important",
        zIndex: 3,
      },
    },
  },
}))

export default function Header() {
  const classes = useStyles()
  const ctx = useContext(Context)
  const handleLogout = () => {
    localStorage.removeItem("user")
    ctx.setIsLoggedIn(false)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Button color="inherit" className={classes.login}>
            Welcome, Admin <KeyboardArrowDownIcon />
          </Button>
          <Link to="/login">
            <Button className={classes.logout} onClick={handleLogout}>
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
