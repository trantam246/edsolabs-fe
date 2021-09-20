import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";

import { useGlobalContext } from "../ContextProvider";
import { useDeleteContext } from "../../pages/Timer";
import patchTaskAPI from "../../api/patchTaskAPI";
import postTaskAPI from "../../api/postTaskAPI";
import { handleDifferentDate, convertTimeSpent } from "../../utils";

export default function ActionMenu(props) {
  const { setOpen, setId } = useDeleteContext();
  const { tasks, setTasks } = useGlobalContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const { task } = props;

  const onTaskPatch = async (updateTask) => {
    const res = await patchTaskAPI(task.id, updateTask);
    setTasks((tasks) => {
      const newTasks = tasks.filter((task) => task.id !== res.data.id);
      return [...newTasks, res.data];
    });
  };
  const onTaskPost = async () => {
    const { description, tags: tempTags } = task;
    const tags = tempTags.map((tag) => tag.id);
    const newTask = {
      description,
      tags,
      start_time: moment().format("YYYY-MM-DD HH:mm:s"),
      end_time: null,
      time_spent: null,
      status: 0,
    };
    const res = await postTaskAPI(newTask);
    setTasks((tasks) => [...tasks, res.data]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteClick = () => {
    setOpen(true);
    setId(task.id);
    handleClose();
  };
  const handleStop = () => {
    handleClose();
    let end = moment();
    const tempStart = tasks.find((item) => item.id === task.id).start_time;
    const start = moment(tempStart, "YYYY-MM-DD HH:mm:s");
    const { end_time, time_spent } = handleDifferentDate(start, end);
    const updateTask = {
      end_time,
      time_spent: convertTimeSpent(time_spent),
      status: 1,
    };
    onTaskPatch(updateTask);
  };
  const handleStart = () => {
    handleClose();
    const runningTask = tasks.find((task) => task.status === 0);
    if (runningTask) {
      alert("There can only be 1 task running at the same time");
      return;
    }
    onTaskPost();
  };

  const renderItem = () => {
    if (task.status === 1) {
      return <MenuItem onClick={handleStart}>Start</MenuItem>;
    }

    return <MenuItem onClick={handleStop}>Stop</MenuItem>;
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {renderItem()}
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
    </>
  );
}
