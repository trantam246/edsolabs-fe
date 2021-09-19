import React, {useState, useEffect} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import dataFunction from '../func/dataFunction';
import moment from 'moment';

export const TimePageTask = (props) => {
  const [btnHide, setHideBtn] = useState(true); 
  const [startTime, setStart] = useState({})
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleCloseDot = () => {
    setAnchorEl(null);
  };
  // Open dialog
  const [openDialog, setOpen] = useState(false);

  const handleClickOpenDialog = (event) => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpen(false);    
  };
  const handleDelete = (e) => {
    setAnchorEl(null);
    dataFunction.remove(props.id)
      .then((res) => {
        alert('Xóa thành công');
      })
      .catch((err) => {
        console.log(err);
      });
      setOpen(false);
  };
  const getTagbyName = arr => {
    const arrTag = []
    arr.split(',').map(item => {
      if(item === 'Online') {
        arrTag.push(1)
      } else if(item === 'Meeting') {
        arrTag.push(2)
      } else if(item === 'Training') {
        arrTag.push(3)
      } else {
        arrTag.push(4)
      }
    })
    return arrTag
  }
  //add a Task
  const tasks = {
    id: null,
    description: "",
    start_time: "",
    end_time: "",
    time_spent: "",
    tags: [],
    status: null
  };
  const [getTask, setTask] = useState(tasks);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...getTask, [name]: value });
  };
  //addTask function
  const handleStart = e => {
    e.preventDefault();
    setStart(moment())
    const data = {
      description: props.descrip,
      start_time: props.startT,
      end_time: null,
      time_spent: null,
      tags: getTagbyName(props.tag),
      status: 0
    };
    dataFunction.create(data)
      .then(response => {
        setTask({
          id: response.data.id,
          description: response.data.description,
          start_time: response.data.start_time,
          end_time: response.data.end_time,
          time_spent: response.data.time_spent,
          tags: response.data.tags,
          status: response.data.status
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  }
    // Update data 
  const handleStop = (e) => {
    let data = {
      id: props.id,
      description: props.descrip,
      start_time: props.startT,
      end_time:  moment().format('YYYY-MM-DD HH:mm:s'),
      time_spent: moment(moment() - startTime).utc().format('HH:mm:ss'),
      tags: getTagbyName(props.tag),
      status: 1
    }
    dataFunction.update(props.id, data)
  }
  return (
    <>
      <IconButton aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon/>
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open} 
        onClose={handleCloseDot} 
        TransitionComponent={Fade}>
        {props.status === 1 ? (
          <MenuItem onClick={handleStart}>Start</MenuItem>
        )  : (
          <MenuItem onClick={handleStop}>Stop</MenuItem>)}
        <MenuItem onClick={handleClickOpenDialog}>Delete</MenuItem>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
        </Dialog>
      </Menu> 
    </>
  )
}
