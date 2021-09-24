import React, { useContext, useState, useRef } from "react"
import Box from "@mui/material/Box"
import Select from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from "@material-ui/core/styles"
import Context from "../../context/Context"

const useStyles = makeStyles((theme) => ({
  form: {
    width: "88%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
    [`& input`]: {
      height: "40px",
      margin: "8px !important",
      borderRadius: "10px",
      border: "1px gray solid",
      outline: "none",
      boxShadow: "rgb(100 100 111 / 40%) 0 7px 29px 0",
      paddingLeft: "10px",
      [`&::placeholder`]: {
        padding: "4px",
      },
      [`&:focus`]: {
        boxShadow: "rgb(200, 220, 220) 1px 1px 8px 1px",
      },
    },
  },
  select: {
    height: "44px",
    // margin: "8px !important",
    borderRadius: "10px !important",
    border: "1px gray solid",
    outline: "none",
    boxShadow: "rgb(100 100 111 / 40%) 0 7px 29px 0",
    [`&:focus`]: {
      boxShadow: "rgb(200, 220, 220) 1px 1px 8px 1px",
    },
    [`&:hover`]: {
      outline: "none",
      border: "none",
    },
  },

  search__icon: {
    width: "40px !important",
    height: "30px",
    margin: "8px !important",
    padding: "5px",
    borderRadius: "10px",
    border: "1px gray solid",
    boxShadow: "rgb(100 100 111 / 40%) 0 7px 29px 0",
  },
}))

export default function Search() {
  const classes = useStyles()
  const ctx = useContext(Context)
  const nameRef = useRef()
  const ageRef = useRef()

  const [gender, setGender] = useState("")
  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }

  const handleSearch = () => {
    const nameValue = nameRef.current.value
    const ageValue = ageRef.current.value
    ctx.onSearch(nameValue, gender, ageValue)
  }
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className={classes.form}
      >
        <input
          type="text"
          id="name"
          name="name"
          ref={nameRef}
          placeholder="Search by name..."
        />

        <FormControl>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            className={classes.select}
            label="Gender"
            onChange={handleChangeGender}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <input
          type="number"
          id="age"
          name="age"
          ref={ageRef}
          placeholder="Age"
        />

        <SearchIcon className={classes.search__icon} onClick={handleSearch} />
      </Box>
    </div>
  )
}
