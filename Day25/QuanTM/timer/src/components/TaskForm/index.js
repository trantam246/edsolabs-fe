import React, { useState, useEffect, useCallback } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import StopIcon from "@material-ui/icons/Stop";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import moment from "moment";

import TagsMenu from "./TagsMenu";
import postTaskAPI from "../../api/postTaskAPI";
import patchTaskAPI from "../../api/patchTaskAPI";
import { useGlobalContext } from "../ContextProvider";
import { convertTimeSpent, momentDate, handleDifferentDate } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  iconButton: {
    marginLeft: "1rem",
    backgroundColor: theme.palette.grey[800],
    color: "#fff",

    "&:hover": {
      backgroundColor: theme.palette.grey[700],
    },
  },
}));

export default function TaskForm() {
  const classes = useStyles();
  const { tasks, setTasks } = useGlobalContext();
  const [isEdit, setIsEdit] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [stopwatch, setStopwatch] = useState(0);
  const [curTask, setCurTask] = useState({
    description: "What do you wanna do ?",
    tags: [1],
    status: 1,
  });
  const [id, setId] = useState(null);

  const onTaskPost = async () => {
    if (!curTask.tags.length) {
      alert("Task must have a tag");
      return;
    }
    const { id, ...info } = curTask;
    const newTask = {
      ...info,
      start_time: moment().format("YYYY-MM-DD HH:mm:s"),
      end_time: null,
      time_spent: null,
      status: 0,
    };
    const res = await postTaskAPI(newTask);
    setTasks((tasks) => [...tasks, res.data]);
    setCurTask(res.data);
    setIsCounting(true);
  };
  const onTaskPatch = useCallback(
    async (updateTask) => {
      setIsCounting(false);
      if (!id) {
        return;
      }
      const res = await patchTaskAPI(id, updateTask);
      setCurTask({
        description: "What do you wanna do ?",
        tags: [1],
        status: 1,
      });
      setStopwatch(0);
      setTasks((tasks) => {
        const newTasks = tasks.filter((task) => task.id !== res.data.id);
        return [...newTasks, res.data];
      });
    },
    [setCurTask, id, setTasks]
  );
  const handleBlur = () => {
    setIsEdit(false);
    if (!curTask.description) {
      setCurTask((task) => ({
        ...task,
        description: "What do you wanna do ?",
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEdit(false);
    if (isCounting) {
      let end = moment();
      const start = moment(curTask.start_time, "YYYY-MM-DD HH:mm:s");
      const { end_time, time_spent } = handleDifferentDate(start, end);
      const updateTask = {
        end_time,
        time_spent: convertTimeSpent(time_spent),
        status: 1,
      };
      onTaskPatch(updateTask);
    } else {
      onTaskPost();
    }
  };
  const handleTagChange = (tagId) => {
    if (isCounting) {
      return;
    }
    let newTags = [];
    const searchTag = curTask.tags.find((item) => item === tagId);
    if (searchTag) {
      newTags = curTask.tags.filter((tag) => tag !== tagId);
    } else {
      newTags = [...curTask.tags, tagId];
    }
    setCurTask((task) => ({
      ...task,
      tags: newTags,
    }));
  };

  const renderTextField = () => {
    if (isEdit) {
      return (
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Enter your task"
          value={curTask.description}
          autoFocus
          required
          onBlur={handleBlur}
          onChange={(e) =>
            setCurTask((task) => ({
              ...task,
              description: e.target.value,
            }))
          }
        />
      );
    }
    return (
      <Typography
        variant="h5"
        component="h1"
        onDoubleClick={() => {
          if (isCounting) {
            return;
          }
          setIsEdit(true);
        }}
      >
        {curTask.description}
      </Typography>
    );
  };
  const renderBtn = () => {
    if (!isCounting) {
      return (
        <IconButton className={classes.iconButton} type="submit">
          <PlayArrowIcon color="inherit" />
        </IconButton>
      );
    }
    return (
      <IconButton className={classes.iconButton} type="submit">
        <StopIcon color="inherit" />
      </IconButton>
    );
  };

  useEffect(() => {
    const { id } = curTask;
    if (id) {
      setId(id);
      return;
    }
    setId(null);
  }, [curTask]);

  useEffect(() => {
    if (!isCounting) {
      return;
    }
    const id = setInterval(() => setStopwatch((count) => count + 1), 1000);
    return () => {
      clearInterval(id);
    };
  }, [isCounting]);

  useEffect(() => {
    const runningTask = tasks.find((task) => task.status === 0);
    if (!runningTask) {
      if (!isCounting) {
        return;
      } else {
        setCurTask({
          description: "What do you wanna do ?",
          tags: [1],
          status: 1,
        });
        setStopwatch(0);
        setIsCounting(false);
        return;
      }
    }
    setCurTask(runningTask);
    const now = moment();
    const startDate = momentDate(runningTask.start_time);
    const { end_time, time_spent } = handleDifferentDate(startDate, now);
    const timeSpent = now.diff(startDate, "days");
    if (timeSpent !== 0) {
      const updateTask = {
        end_time,
        time_spent: convertTimeSpent(time_spent),
        status: 1,
      };
      onTaskPatch(updateTask);
      return;
    }
    setIsCounting(true);
    setStopwatch(now.diff(startDate) / 1000);
  }, [tasks, isCounting, onTaskPatch]);

  return (
    <Paper className={classes.root} elevation={3}>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            {renderTextField()}
          </Grid>
          <Grid item xs={4}>
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              justifyContent="center"
            >
              <TagsMenu curTags={curTask.tags} onTagChange={handleTagChange} />
              <Typography variant="h6" component="span">
                {moment.utc(stopwatch * 1000).format("HH:mm:ss")}
              </Typography>
              {renderBtn()}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
