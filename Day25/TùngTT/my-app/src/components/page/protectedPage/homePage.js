import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Route,Switch, useHistory } from 'react-router';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { TimerPage } from './timerPage';
import { ReportPage } from './reportPage';
import { HeaderReport } from './reportPageHeader';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import { TimerHeader } from './timerPageHeader';
const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  linkMod: {
    color: '#000000',
  }
}));

export const HomePage = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("acess");
    history.replace("/")
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem>
          <ListItemIcon><AccountCircleIcon/></ListItemIcon>
          <ListItemText primary='My Admin' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <Link className={classes.linkMod} to="/home">
          <ListItem button>
            <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary='Home' />
          </ListItem>
        </Link>
        <Link className={classes.linkMod} to="/home/timer">
          <ListItem button>
            <ListItemIcon><AlarmOnIcon/></ListItemIcon>
              <ListItemText primary='Timer' />
          </ListItem>
        </Link>
        <Link className={classes.linkMod} to="/home/report">
          <ListItem button>
            <ListItemIcon><AssessmentIcon/></ListItemIcon>
              <ListItemText primary='Report' />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button key={1} onClick={logout}>
          <ListItemIcon><ExitToAppIcon/></ListItemIcon>
          <ListItemText primary='Log out' />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justifyContent="space-between">
            <Switch>
              <Route path="/home/timer">
                  <TimerHeader/>
              </Route>
              <Route path="/home/report">
                  <HeaderReport />
              </Route>
            </Switch>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="menu-item">
        <Hidden smUp implementation="css"> 
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
          {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
          {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route path="/home/timer">
            <TimerPage/>
          </Route>
          <Route path="/home/report">
            <ReportPage/>
          </Route>
        </Switch>
      </main>
    </div>

  );
}

HomePage.propTypes = {
  window: PropTypes.func,
};

function Home() {
  return (
    <h1>Trang web giúp chúng ta học tập và quản lý thời gian tốt hơn</h1>
  )
}