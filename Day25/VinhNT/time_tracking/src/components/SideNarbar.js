import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom';
import TimerIcon from '@material-ui/icons/Timer';
import { useHistory } from 'react-router-dom';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import action from '../services/action';
import { Avatar, Divider, Typography } from '@material-ui/core';
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#A0DAA9',
  },
  button: {
    display: 'flex',
  },
  navBtn: {
    color: 'black',
  },
}));

export default function SideNarbar() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    async function getUser() {
      const res = await action.getAdmin();
      setUser(res.data);
    }
    getUser();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      {user && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.userInfo}>
            <Avatar alt="user" src={user.avatar} />
            <Typography>{user.fullname}</Typography>
          </div>
          <Divider />
          <List>
            <Link className={classes.button} to="/">
              <ListItem button>
                <ListItemIcon>
                  <TimerIcon />
                </ListItemIcon>
                <ListItemText className={classes.navBtn} primary="Timer" />
              </ListItem>
            </Link>
            <Link className={classes.button} to="/report">
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText className={classes.navBtn} primary="Report" />
              </ListItem>
            </Link>
            <Link className={classes.button} to="/">
              <ListItem
                button
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem('token');
                  // window.location.reload(false);
                  history.push('/login');
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText className={classes.navBtn} primary="Logout" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
      )}
    </div>
  );
}
export { drawerWidth };
