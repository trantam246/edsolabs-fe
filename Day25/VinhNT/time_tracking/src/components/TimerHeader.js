import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import React, { useState } from 'react';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ListTags from './ListTags';
import action from '../services/action';
import moment from 'moment';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    margin: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const getNumTag = (a) => {
  switch (a) {
    case 'Online':
      return 1;
    case 'Meeting':
      return 2;
    case 'Training':
      return 3;
    default:
      return 4;
  }
};
export default function AddTask(props) {
  const classes = useStyles();
  const [openTag, setOpenTag] = useState(false);
  const [localStart, setLocalStart] = useState(0);
  const [localEnd, setLocalEnd] = useState(0);
  const [tags, setTags] = useState([]);
  const initTask = {
    id: null,
    description: '',
    start_time: null,
    end_time: null,
    time_spent: null,
    tags: [],
    status: 0,
  };
  const [task, setTask] = useState(initTask);
  const [curTask, setCurTask] = useState(initTask);
  const [submitted, setSubmitted] = useState(false);
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setTask({ ...task, description: value });
  };
  const saveTask = () => {
    setLocalStart(moment());
    const numTags = tags.map((e) => {
      return getNumTag(e);
    });
    var data = {
      description: task.description,
      start_time: moment().format('YYYY-MM-DD HH:mm:s'),
      end_time: null,
      time_spent: null,
      tags: numTags,
      status: task.status,
    };
    action
      .createTask(data)
      .then((res) => {
        setTask({
          id: res.data.id,
          description: res.data.description,
          start_time: res.data.start_time,
          end_time: res.data.end,
          time_spent: res.data.time_spent,
          tags: res.data.tags,
          status: res.data.status,
        });
        setCurTask(res.data);

        setSubmitted(true);
        setOpenTag(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newTask = () => {
    updateTask();
    setTask(initTask);
    setSubmitted(false);
  };
  const getLocalEnd = () => {
    if (submitted) {
      setInterval(() => {
        setLocalEnd(moment());
      }, 1000);
      return localEnd;
    } else clearInterval(localEnd);
  };
  const onUpdate = (data) => {
    setTags(data);
  };

  const updateTask = () => {
    let data = {
      id: curTask.id,
      description: curTask.description,
      start_time: curTask.start_time,
      end_time: moment().format('YYYY-MM-DD HH:mm:s'),
      time_spent: `${moment(getLocalEnd() - localStart)
        .utc()
        .format('m')} mins`,
      tags: curTask.tags,
      status: 1,
    };
    action.updateTask(curTask.id, data).then((res) => {
      setCurTask({
        ...curTask,
        status: res.status,
      });
    });
  };
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="What are you working on?"
        inputProps={{ 'aria-label': 'What are you working on?' }}
        value={task.description}
        onChange={handleDescriptionChange}
      />
      <IconButton
        className={classes.iconButton}
        onClick={(e) => {
          e.preventDefault();
          setOpenTag(!openTag);
        }}
      >
        <LocalOfferIcon />
      </IconButton>
      {openTag && <ListTags update={onUpdate} tags={props.tags} />}
      {submitted ? (
        <>
          <Typography variant="h6">
            {moment(getLocalEnd() - localStart)
              .utc()
              .format('HH:mm:ss')}
          </Typography>

          <StopIcon className={classes.iconButton} onClick={newTask} />
        </>
      ) : (
        <>
          <Typography variant="h6">00:00:00</Typography>
          <PlayArrowIcon className={classes.iconButton} onClick={saveTask} />
        </>
      )}
    </Paper>
  );
}
