import React, { useState } from "react"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Checkbox from "@mui/material/Checkbox"

export default function Tag(props) {
  const [check, setCheck] = useState([])
  const handleToggle = (value) => () => {
    const currentIndex = check.indexOf(value)
    const newChecked = [...check]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setCheck(newChecked)
    currentIndex === -1 ? props.arr.push(value.id) : props.arr.splice(props.arr.indexOf(value.id), 1)
    props.onCheck(props.arr)
  }

  const labelId = `checkbox-list-label-${props.tag}`
  return (
    <ListItem
      onClick={handleToggle(props.tag)}
    >
      <ListItemButton
        role={undefined}
        dense
      >
        <ListItemIcon>
          <Checkbox
            name={props.tag.name}
            edge="start"
            checked={check.indexOf(props.tag) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        {<ListItemText id={labelId} primary={props.tag.name} />}
      </ListItemButton>
    </ListItem>
  )

}
