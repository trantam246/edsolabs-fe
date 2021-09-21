import React from "react";
import { Box } from "@mui/system";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./nav.css";

function Nav(props) {
  return (
    <Box width="15%" p={5} borderRight={2} bgcolor="lightgray">
      <Box display="flex" mb={5}>
        <Box
          className="avatar"
          borderRadius="100%"
          overflow="hidden"
          width="70px"
          height="50px"
        >
          <img
            src={props.dataUser.avatar}
            alt="this is your avatar"
            width="60px"
          />
        </Box>
        <Box
          className="full-name"
          width="100%"
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Box component="h3" m={0} lineHeight="50px">
            {props.dataUser.fullname}
          </Box>
        </Box>
      </Box>
      <Box width="200px" className="pointer">
        <Box display="flex" height="50px" alignItems="center" fontSize="20px">
          <AccessTimeIcon />
          <NavLink
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              paddingLeft: "20px",
              color: "black",
            }}
            exact
            activeStyle={{
              color: "black",
              fontWeight: "bold",
              paddingLeft: "20px",
              textDecoration: "underline"
            }}
            to="/timer"
            className="my-link"
          >
            Timer
          </NavLink>
        </Box>
        <Box display="flex" height="50px" alignItems="center" fontSize="20px">
          <AssessmentIcon />
          <NavLink
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              paddingLeft: "20px",
              color: "black",
            }}
            exact
            activeStyle={{
              color: "black",
              fontWeight: "bold",
              paddingLeft: "20px",
              textDecoration: "underline"

            }}
            to="/report"
            className="my-link"
          >
            Report
          </NavLink>
        </Box>
        <Box display="flex" height="50px" alignItems="center" fontSize="20px">
          <LogoutIcon />
          <NavLink
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              paddingLeft: "20px",
              color: "black",
            }}
            exact
            activeStyle={{
              color: "black",
              fontWeight: "bold",
              paddingLeft: "20px",
              textDecoration: "underline"
            }}
            to="/out"
            className="my-link"
          >
            LogOut
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}

export default Nav;
