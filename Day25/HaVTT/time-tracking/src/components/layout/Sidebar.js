import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getUser } from "./common";
import React from 'react';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: "rgba(51, 51, 51, 0.2)",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "24px",
  },
  avt: {
    marginRight: "8px",
  },
  info: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    marginbottom: "20px",
    flexWrap: "wrap",
  },
  sidebarItem: {
    margin: "16px 0",
    display: "flex",
    color: "#000",
  },
  sidebarIcon: {
    marginRight: "6px",
  },
  logoutBtn: {
    cursor: "pointer",
  },
}));

export default function Sidebar(props){
  const classes = useStyles();

  // dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
      <div className={classes.root}>
        <div className={classes.sidebar}>
          {getUser() ? (
            <div className={classes.info}>
              <Avatar className={classes.avt} src={JSON.parse(localStorage.avatar)} />
              {JSON.parse(localStorage.name)}
            </div>
          ) : (
            ""
          )}

          <List>
            <Link to="/" className={classes.sidebarItem}>
              <ListItem button>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="Timer" />
              </ListItem>
            </Link>

            <Link to="/report" className={classes.sidebarItem}>
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Report" />
              </ListItem>
            </Link>

            <Link to="/" className={classes.sidebarItem}>
              <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" onClick={handleClickOpen} />
              </ListItem>
            </Link>
          </List>
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Bạn chắc chắn muốn thoát?
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
  );
};
