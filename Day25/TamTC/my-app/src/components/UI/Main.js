import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = "20rem"
const useStyles = makeStyles(() => ({
  main: {
    marginLeft: drawerWidth,
    marginTop: "6rem",
    padding: "2rem",
  },
}))

export default function MainTimer(props) {
  const classes = useStyles()
 
  return (
    <div className={`${classes.main} ${props.className}`}>
      {props.children}
    </div>
  )
}
