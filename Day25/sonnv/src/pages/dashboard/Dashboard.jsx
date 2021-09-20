import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../../components/Sidebar";
import { useUserContext } from "../../contexts/UserContext";
import Report from "./report/Report";
import Timer from "./timer/Timer";
import Login from "../login/Login";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddTask from "../../components/AddTask";
import { useTaskContext } from "contexts/TaskContext";

const useStyles = makeStyles((theme) => ({
  pages: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 60,
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: 0,
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  const { loginSuccess } = useUserContext();

  return (
    <>
      <Router>
        <Box display="flex">
          {loginSuccess && <Sidebar user={user} />}

          <div className={classes.pages}>
            <Switch>
              <Route exact path="/">
                <AddTask />
                <Timer />
              </Route>
              <Route path="/report">
                <Report />
              </Route>
              <Route path="/login" component={Login}></Route>
            </Switch>
          </div>
        </Box>
      </Router>
    </>
  );
}

export default Dashboard;
