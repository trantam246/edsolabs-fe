import * as React from "react"

import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  actions__list: {
    position: "absolute !important",
    top: "100%",
    right: "3rem",
    background: "white",
    zIndex: 2,
    boxShadow: "rgb(100 100 111 / 40%) 0 0.7rem 2.9rem 0",
    [`& ul`]: {
      padding: 0,
    },
    [`& li`]: {
      fontSize: "1.6rem",
    },
  },
}))
const Actions = (props) => {
  const classes = useStyles()
  return (
    <MenuList className={classes.actions__list}>
      <MenuItem>{props.status === 1 ? "Start" : "Stop"}</MenuItem>
      <MenuItem>Delete</MenuItem>
    </MenuList>
  )
}
export default Actions
