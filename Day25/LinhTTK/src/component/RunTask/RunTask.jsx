import React, { useEffect, useRef, useState } from 'react';

import { RunTasked, GroupItem, useStyles } from './style';

import { FaTags, FaStopCircle } from 'react-icons/fa';
import { AiFillPlayCircle } from 'react-icons/ai';
import {
  TextField,
  Popper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import { getData, postData } from '../../api/axiosClient';
import CountTimer from '../../CountTimer/CountTimer';

const RunTask = ({ handleClickList, handleClickPlay, play }) => {
  const uuid = () => {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf('/') + 1);
  };

  const classes = useStyles();
  const newDate = new Date();
  const fulDateDay = `${newDate.getFullYear()}-${
    Number(newDate.getMonth() + 1) >= 10
      ? newDate.getMonth() + 1
      : '0' + (newDate.getMonth() + 1)
  }-${
    Number(newDate.getDate()) >= 10
      ? newDate.getDate()
      : '0' + newDate.getDate()
  } ${newDate.getHours()}:${newDate.getMinutes()}`;

  const [startTimer, setStartTimer] = useState('');
  const [valueInput, setValueInput] = useState('This is my task');
  const [getTag, setGetTag] = useState([]);

  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);

  const task = {
    id: null,
    description: null,
    start_time: null,
    end_time: null,
    tags: null,
    time_spent: null,
    status: 1,
  };

  const [tagList, setTagList] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleChangeValue = (event) => {
    setValueInput(event.target.value);
  };

  useEffect(() => {
    getData('tags')
      .then((res) => {
        const tags = res.data;
        setGetTag(
          tags.map((item) => {
            return Object.assign(item, { active: false });
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChecked = (value) => {
    const test = getTag.map((item) => {
      if (item.id === value) {
        item.active = !item.active;
      }
      return item;
    });
    setGetTag(test);

    const getTrue = getTag
      .filter((item) => item.active === true)
      .map((item) => item.id);
    setTagList(getTrue);
  };

  const renderListTag = getTag.map((item) => {
    return (
      <ListItem key={item.id} role={undefined} dense button>
        <ListItemIcon>
          <Checkbox
            className={classes.icon}
            edge="start"
            tabIndex={-1}
            disableRipple
            checked={item.active}
            onChange={() => {
              handleChecked(item.id);
            }}
            inputProps={{
              'aria-labelledby': `checkbox-list - label - ${item.name} `,
            }}
          />
        </ListItemIcon>
        <ListItemText
          id={`checkbox - list - label - ${item.name} `}
          primary={` ${item.name} `}
        />
      </ListItem>
    );
  });

  const pushData = async (value) => {
    await postData('tasks', value);
    const dataGet = await getData('tasks');
    handleClickLists(dataGet.data);
  };

  const handleClickLists = (value) => {
    handleClickList(value);
  };

  const setTasker = (
    id = null,
    description = null,
    tags = [],
    time_spent = null,
    status = 0
  ) => {
    task.id = id;
    task.description = description;
    task.tags = tags;
    task.time_spent = time_spent;
    task.status = status;
    return task;
  };

  const handleClickButtonPlay = () => {
    setStartTimer(fulDateDay);

    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const formatTime = (value) => {
    const getSeconds = `0${value % 60}`.slice(-2);
    const minutes = `${Math.floor(value / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(value / 3600)}`.slice(-2);

    return `${Number(getHours) > 0 ? getHours + 'giờ :' : ''}  ${
      Number(getMinutes) > 0 ? getMinutes + 'phút :' : ''
    }  ${getSeconds} giây`;
  };

  const handleClickButtonStop = () => {
    clearInterval(countRef.current);
    setTimer(0);
  };

  const handlePushData = async () => {
    const resetTag = getTag.map((item) => {
      item.active = false;
      return item;
    });

    setGetTag(resetTag);

    const setTask = setTasker(
      uuid(),
      valueInput,
      tagList,
      formatTime(timer),
      1
    );
    task.start_time = startTimer;
    task.end_time = fulDateDay;
    await pushData(setTask);
  };

  const playButton = async () => {
    await handleClickPlay();
    await handleClickButtonStop();
    await handlePushData();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  return (
    <RunTasked>
      <TextField
        className={classes.TextField}
        id="standard-multiline-static"
        onChange={handleChangeValue}
        value={valueInput}
      />
      <GroupItem>
        <FaTags className={classes.tag} onClick={handleClick} />
        <span className={classes.count}>
          <CountTimer timer={timer} />
        </span>
        {play ? (
          <FaStopCircle
            onClick={async () => {
              playButton();
            }}
            className={classes.tag}
          />
        ) : (
          <AiFillPlayCircle
            onClick={() => {
              handleClickPlay();
              handleClickButtonPlay();
            }}
            className={classes.tag}
          />
        )}
      </GroupItem>

      <Popper id={id} open={open} anchorEl={anchorEl}>
        <List className={classes.listDown}>{[renderListTag]}</List>
      </Popper>
    </RunTasked>
  );
};

export default RunTask;
