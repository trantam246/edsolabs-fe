import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { Checkbox, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import dataFunction from '../func/dataFunction';
import IconButton from '@material-ui/core/IconButton';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StopIcon from '@material-ui/icons/Stop';
const useStyles = makeStyles((theme) => ({
  input: {
    color:'white'
  }
}));

export const TimerHeader = (props) => {
  const classes = useStyles();
  const [hide, setHide] = useState(false);
  const [state, setState] = useState({
    Online: false,
    Meeting: false,
    Training: false,
    Relax: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleChangeBox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //Get Start and Stop
  const [startTime, setStart] = useState({})
  const [descrip, setDescrip] = useState("")

  const getKeyByValue = (object, value) => {
    return Object.keys(object).filter(key => object[key] === value);
  }
  const arrTag = [];
  const getTagbyName = arr => {
    const arrTag = [];
    arr.map(item => {
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
  const addTask = e => {
    setStart(moment())
    e.preventDefault();
    setHide(true)
    const data = {
      description: descrip,
      start_time: moment().format('YYYY-MM-DD HH:mm:s'),
      end_time: null,
      time_spent: null,
      tags: getTagbyName(getKeyByValue(state,true)),
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
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  // Update data 
  const updateTask = (e) => {
    handleInputChange(e);
    setHide(false)
    let data = {
      id: props.id,
      description: getTask.description,
      start_time: getTask.start_time,
      end_time:  moment().format('YYYY-MM-DD HH:mm:s'),
      time_spent: moment(moment() - startTime).utc().format('HH:mm:ss'),
      tags: getTask.tags,
      status: 1
    }
    dataFunction.update(getTask.id, data).then((res) => {
      setTask({
        ...getTask,
        status: res.status,
      });
    });
  }
  
  return (
    <Grid container alignItems="center">
      <Grid key={1} item xs={8}>
        <form noValidate autoComplete="off">
          <Input 
          className={classes.input} 
          placeholder="What are you working on?" 
          inputProps={{ 'aria-label': 'description'}} 
          value={descrip}
          onChange={e => setDescrip(e.target.value)}
          />
        </form>
      </Grid>
      <Grid key={2} item xs={4}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid key={1} item xs={3}>
            <IconButton aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
              <LocalOfferIcon/>
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem>
                <FormControlLabel 
                  control={<Checkbox checked={state.checkedA} 
                  onChange={handleChangeBox} name="Online" />}
                  label="Online"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel 
                  control={<Checkbox checked={state.checkedB} 
                  onChange={handleChangeBox} 
                  name="Meeting" />}
                  label="Meeting"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel 
                  control={<Checkbox checked={state.checkedC} 
                  onChange={handleChangeBox} name="Training" />}
                  label="Training"
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel 
                  control={<Checkbox checked={state.checkedD} 
                  onChange={handleChangeBox} name="Relax" />}
                  label="Relax"
                />
              </MenuItem>
            </Menu>
          </Grid>
          <Grid key={2} item xs>
            {hide === true && <Typography variant="h5" id="timer">
              00:00:00
            </Typography>}
            {hide === false && <Typography variant="h5" id="timer">
              {moment(moment() - startTime).utc().format('HH:mm:ss')}
            </Typography>}
          </Grid>
          <Grid key={3} item xs>
            {(hide === false) && <IconButton onClick={addTask}>
              <PlayCircleFilledWhiteIcon/>
            </IconButton>}
            {(hide === true) && <IconButton onClick={updateTask}>
              <StopIcon/>
            </IconButton>}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
