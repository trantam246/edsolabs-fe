import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from 'components/side-bar/Sidebar';
import { useUserContext } from 'contexts/UserContext';
import Report from 'pages/dashboard/report/Report';
import Timer from 'pages/dashboard/timer/Timer';
import Login from 'pages/login/Login';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddTask from 'components/add-task/AddTask';
import { useTaskContext } from 'contexts/TaskContext';

const useStyles = makeStyles((theme) => ({
  pages: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 60,
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));

  const { playing } = useTaskContext();

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
                {playing && <AddTask />}
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
