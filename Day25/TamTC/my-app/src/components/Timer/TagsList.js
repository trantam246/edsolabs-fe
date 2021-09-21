import React, { useState } from "react"

import Tag from "./Tag"
import List from "@mui/material/List"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(() => ({
  tags__list: {
    position: "absolute !important",
    top: "4rem",
    right: "18rem",
    padding: "0 !important",
    boxShadow: "rgb(100 100 111 / 40%) 0 0.7rem 2.9rem 0",
    [`& span`]: {
      fontSize: "1.6rem",
    },
    [`& li`]: {
      padding: 0,
    },
  },
}))

const TagsList = (props) => {
  const classes = useStyles()
  const [arr, setArr] = useState([])
  const getCheck = (a) => {
    setArr(a)
    props.onAdd({ tags: arr })
  }
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      className={classes.tags__list}
    >
      {props.tags
        ? props.tags.map((tag) => (
            <Tag key={tag.id} tag={tag} onCheck={getCheck} arr={arr} />
          ))
        : null}
    </List>
  )
}
export default TagsList
