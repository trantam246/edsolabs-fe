import React, { useState } from "react"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  option_form: {
    minWidth: "14rem",
    fontSize: "1.4rem",

    [`& li`]: {
      fontSize: "1.4rem",
    },
  },
}))

export default function FilterOptions(props) {
  const classes = useStyles()
  const [option, setOption] = useState("Today")

  const handleChange = (event) => {
    setOption(event.target.value)
    props.selectOption(option)
  }

  return (
    <div className={classes.option_form}>
      <FormControl sx={{ m: 1, minWidth: 100 }} >
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={option}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={"Today"}>Today</MenuItem>
          <MenuItem value={"Yesterday"}>Yesterday</MenuItem>
          <MenuItem value={"This week"}>This week</MenuItem>
          <MenuItem value={"Last week"}>Last week</MenuItem>
          <MenuItem value={"This month"}>This month</MenuItem>
          <MenuItem value={"Last month"}>Last month</MenuItem>
          <MenuItem value={"Date range"}>Date range</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
