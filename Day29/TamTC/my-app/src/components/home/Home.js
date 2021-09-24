import React, { useState } from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Header from "../header/Header"
import Search from "../search/Search"
import { makeStyles } from "@material-ui/core/styles"
import StudentsList from "../students/StudentTable"
import TeamsList from "../team/TeamsList"
const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    marginTop: "80px",
    [`@media(max-width: 1023px)`]: {
      padding:'0 !important'
    },
  },

  box: {
    margin: "40px auto",
    display: "flex",
    justifyContent: "center",
    [` & button`]: {
      border: "1px black solid",
      borderBottom: "none",
      borderTopRightRadius: "10px",
      borderTopLeftRadius: "10px",
      minWidth: "200px",
      [`@media(max-width: 599px)`]: {
        maxWidth: "100px",
        minWidth: "100px",
      },
    },
  },
  tabs: {
    boxShadow: "rgb(100 100 111 / 40%) 0 7px 29px 0",
  },
  active: {
    background: "#1976d2",
    color: "white",
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ div: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function Home() {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <Header />
      <Box sx={{ width: "100%" }} className={classes.container}>
        <Box className={classes.box}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className={classes.tabs}
          >
            <Tab
              label="Students List"
              {...a11yProps(0)}
            />
            <Tab
              label="Teams"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Search />
          <StudentsList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TeamsList />
        </TabPanel>
      </Box>
    </>
  )
}
