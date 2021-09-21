import {
    AppBar,
    Avatar,
    Box,
    Button,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Slide,
    Toolbar,
    Typography,
  } from '@material-ui/core';
  import { makeStyles } from '@material-ui/core/styles';
  import AccessTimeIcon from '@mui/icons-material/AccessTime';
  import BarChartIcon from '@mui/icons-material/BarChart';
  import ExitToAppIcon from '@mui/icons-material/ExitToApp';
  import MenuIcon from '@mui/icons-material/Menu';
  import { useUserContext } from '../contexts/UserContext';
  import React, { useState } from 'react';
  import { Link, useHistory } from 'react-router-dom';
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const drawerWidth = 200;
  const useStyles = makeStyles((theme) => ({
    drawerPaper: {
      width: drawerWidth,
      '& .MuiListItemIcon-root': {
        minWidth: 30,
      },
    },
    nav: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
  
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    appBar: {
      height: 60,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    title: {
      paddingLeft: 10,
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  }));
  
  const Sidebar = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { user } = props;
    const { logout } = useUserContext();
  
    // dialog
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleLogout = () => {
      setOpen(false);
      logout();
      history.push('/login');
    };
  
    const drawer = (
      <div className={classes.drawerPaper}>
        <Box p={1} display="flex" justifyContent="center" alignItems="center">
          {/*  */}
          <Avatar alt="Name" src={user.avatar} className={classes.large} />
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {user.fullname}
          </Typography>
        </Box>
  
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="Timer" />
            </ListItem>
          </Link>
  
          <Link to="/report" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Report" />
            </ListItem>
          </Link>
  
          <ListItem button className={classes.link}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" onClick={handleClickOpen} />
          </ListItem>
        </List>
      </div>
    );
  
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    return (
      <div>
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
            <Typography variant="h6" noWrap>
              Timer tracking
            </Typography>
          </Toolbar>
        </AppBar>
  
        <nav className={classes.nav}>
          <Hidden xsDown implementation="css">
            <Drawer
              className={classes.drawerPaper}
              anchor="left"
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
  
          <Hidden smUp implementation="css">
            <Drawer
              className={classes.drawerPaper}
              anchor="left"
              variant="temporary"
              open={mobileOpen}
              onClick={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, 
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
  
  
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              Timer tracking
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogout} color="primary">
                OK
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  };
  
  export default Sidebar;