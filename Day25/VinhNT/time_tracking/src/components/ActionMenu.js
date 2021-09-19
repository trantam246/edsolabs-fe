import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import action from '../services/action';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { Button, Divider, Modal, Typography, Grid } from '@material-ui/core';
const useStyle = makeStyles((theme) => ({
  button: {
    padding: 0,
  },
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  confirmBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
export default function ActionMenu(props) {
  const curTask = {
    id: props.id,
    description: props.description,
    start_time: props.start_time,
    end_time: props.end_time,
    time_spent: props.time_spent,
    tags: props.tags,
    status: props.status,
  };
  //   const [curTask, setCurTask] = useState(initCurTask);
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenConfirm = () => {
    setOpen(true);
  };

  const handleCloseConfirm = () => {
    setOpen(false);
  };
  const handleStopAction = () => {
    let a = moment(moment().format('YYYY-MM-DD HH:mm:s'));
    let b = moment(curTask.start_time);
    let data = {
      id: curTask.id,
      description: curTask.description,
      start_time: curTask.start_time,
      end_time: moment().format('YYYY-MM-DD HH:mm:s'),
      time_spent: `${moment.duration(a.diff(b, 'minutes'))._milliseconds} mins`,
      tags: curTask.tags,
      status: 1,
    };
    action.updateTask(curTask.id, data);
  };
  const handleDeleteAction = () => {
    setAnchorEl(null);
    action
      .removeTask(props.id)
      .then((res) => {
        alert('da xoa thanh cong');
      })
      .catch((err) => {
        alert('da co loi');
      });
  };
  const handleStartAction = () => {
    let data = {
      description: curTask.description,
      start_time: moment().format('YYYY-MM-DD HH:mm:s'),
      end_time: null,
      time_spent: null,
      tags: curTask.tags,
      status: 0,
    };
    action
      .createTask(data)
      .then((res) => {})
      .catch((err) => {
        alert('da co loi');
      });
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography
        gutterBottom
        variant="h4"
        align="center"
        id="simple-modal-title"
      >
        Confirmation
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        id="simple-modal-description"
      >
        Are you sure to delete this item?
      </Typography>
      <Divider />
      <Grid container spacing="0" justifyContent="space-around">
        <Grid className={classes.confirmBtn} item xs={5}>
          <Button onClick={handleCloseConfirm}>No</Button>
        </Grid>
        <Divider orientation="vertical" flexitem />
        <Grid className={classes.confirmBtn} item xs={5}>
          <Button onClick={handleDeleteAction}>Yes</Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.status === 1 ? (
          <MenuItem onClick={handleStartAction}>Start</MenuItem>
        ) : (
          <MenuItem onClick={handleStopAction}>Stop</MenuItem>
        )}
        <MenuItem onClick={handleOpenConfirm}>Delete</MenuItem>
      </Menu>

      <Modal
        open={open}
        onClose={handleCloseConfirm}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
