import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Slide,
  Typography,
} from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTagContext } from 'contexts/TagContext';
import { useTaskContext } from 'contexts/TaskContext';
import moment from 'moment';
import React, { useState } from 'react';

const formatTime = (time) => {
  return moment(time).format('HH:mm');
};

const formatSpentTime = (time) => {
  const timer = Number.parseInt(time) * 1000;
  const seconds = moment.duration(timer).seconds();
  const minutes = moment.duration(timer).minutes();
  const hours = moment.duration(timer).hours();
  const days = moment.duration(timer).days();

  if (days > 0) {
    return `${days} days ${hours} hs ${minutes} mins`;
  } else if (hours > 0) {
    return `${hours} hs ${minutes} mins`;
  } else {
    return `${minutes} mins ${seconds} ss`;
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SingleTask = ({ task }) => {
  const { tags, callSnackbar } = useTagContext();
  const { handleDeleteTask, setStopInSingleTask, taskPlaying, handleRestart } =
    useTaskContext();

  const strTag = () => {
    const strTag = [];
    tags.map((tag_c) => {
      if (task.tags.includes(tag_c.id)) {
        strTag.push(tag_c.name);
      }
      return true;
    });

    return strTag.join(', ');
  };

  // menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // dialog

  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleStopTask = () => {
    setStopInSingleTask(true);
  };

  const deleteTask = () => {
    setOpen(false);
    handleDeleteTask(task).then((res) => {
      if (res >= 200 && res < 400) {
        callSnackbar('Delete success!', 'success');
      } else {
        callSnackbar('Delete fail!', 'error');
      }
    });
  };

  const restartTask = () => {
    setAnchorEl(null);
    handleRestart(task);
  };
  return (
    <Paper>
      <Box px={1} mb={1}>
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Box>{task.description}</Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <LocalOfferIcon />

              <Typography variant="subtitle2" align="left" gutterBottom>
                {strTag()}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                {task.start_time ? formatTime(task.start_time) : '...'} -{' '}
                {task.end_time ? formatTime(task.end_time) : '...'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                {task.time_spent ? formatSpentTime(task.time_spent) : '...'}
              </Typography>

              <Box>
                <IconButton aria-label="MoreVertIcon" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  variant="selectedMenu"
                >
                  {/* hiển thị nếu không có task nào đang chay */}
                  <Box display={taskPlaying.id ? 'none' : 'block'}>
                    <MenuItem dense onClick={restartTask}>
                      Start
                    </MenuItem>
                  </Box>

                  {/* hiển thị nếu là task đang chạy */}
                  <Box display={task.id === taskPlaying.id ? 'block' : 'none'}>
                    <MenuItem dense onClick={handleStopTask}>
                      Stop
                    </MenuItem>
                  </Box>

                  <MenuItem dense onClick={handleClickOpenDialog}>
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/*  */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this task ?
          </DialogContentText>
          <Typography variant="subtitle2" gutterBottom>
            Description: {task.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={deleteTask} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SingleTask;
