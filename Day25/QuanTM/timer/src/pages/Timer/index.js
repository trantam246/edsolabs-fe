import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Box, makeStyles } from "@material-ui/core";
import moment from "moment";

import TaskForm from "../../components/TaskForm";
import TaskListContainer from "../../containers/TaskListContainer";
import TaskList from "../../containers/TaskList";
import TaskByDay from "../../components/TaskByDay";
import { useGlobalContext } from "../../components/ContextProvider";
import { formatDate, getUniqDate } from "../../utils";
import deleteTaskAPI from "../../api/deleteTaskAPI";
import DeleteDialog from "../../components/DeleteDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.breakpoints.values.md,
  },
  textField: {
    display: "block",
  },
  button: {
    display: "block",
    margin: "auto",
  },
}));

const DeleteContext = React.createContext();

export default function Timer() {
  const classes = useStyles();
  const { tasks, tags, setTasks } = useGlobalContext();
  const [date, setDate] = useState(null);
  const [totalRecord, setTotalRecord] = useState(5);
  const [uniqDate, setUniqDate] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const renderList = () => {
    const newTasks = tasks.map((task) => {
      const newTask = { ...task };
      newTask.date = formatDate(newTask.start_time, "DD/MM/YYYY");
      newTask.start_time = formatDate(newTask.start_time, "H:mm");
      if (newTask.end_time) {
        newTask.end_time = formatDate(newTask.end_time, "H:mm");
      }
      newTask.tags = newTask.tags.map((tag) => {
        const matchTag = tags.find((item) => item.id === tag);
        return matchTag;
      });
      return newTask;
    });
    let dateList = uniqDate;
    dateList = dateList.slice(0, totalRecord);
    if (date) {
      dateList = dateList.filter((item) => item === date);
    }
    return dateList.map((date) => {
      const list = newTasks
        .filter((item) => item.date === date)
        .sort((a, b) => b.id - a.id);
      return <TaskByDay tasks={list} key={date} date={date} />;
    });
  };
  const handleChange = (e) => {
    const { value } = e.target;
    if (!value) {
      setDate(null);
      return;
    }
    const formatDate = moment(value, "YYYY-MM-DD").format("DD/MM/YYYY");
    setDate(formatDate);
  };
  const onDeleteTask = async () => {
    setOpen(false);
    await deleteTaskAPI(id);
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    setUniqDate(getUniqDate(tasks));
  }, [tasks]);

  return (
    <DeleteContext.Provider value={{ setOpen, open, id, setId, onDeleteTask }}>
      <Box className={classes.root}>
        <TaskForm />
        <TaskListContainer>
          <TextField
            label="Date filter"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            className={classes.textField}
            onChange={handleChange}
          />
          <TaskList>{renderList()}</TaskList>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setTotalRecord((total) => total + total)}
            disabled={totalRecord >= uniqDate.length}
          >
            Load More
          </Button>
        </TaskListContainer>
        <DeleteDialog />
      </Box>
    </DeleteContext.Provider>
  );
}

export const useDeleteContext = () => {
  return useContext(DeleteContext);
};
