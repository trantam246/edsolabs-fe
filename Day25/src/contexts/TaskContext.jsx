import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskPlaying, setTaskPlaying] = useState({});

  const getAllTasks = () => {
    setTaskLoading(true);
    axios
      .get(`http://localhost:3004/tasks`)
      .then((res) => {
        setTasks(res.data);
        setTaskLoading(false);
      })
      .catch((e) => {
        setTaskLoading(false);
      });
  };

  const handlePlaying = (task) => {
    setPlaying(true);
    return axios
      .post(`http://localhost:3004/tasks`, task)
      .then((res) => {
        getAllTasks();
        setPlaying(true);
        setTaskPlaying(res.data);
        return res.status;
      })
      .catch((e) => {
        setTaskPlaying({});
        getAllTasks();
      });
  };

  const handleStoping = (task) => {
    setPlaying(false);
    return axios
      .patch(`http://localhost:3004/tasks/${taskPlaying.id}`, task)
      .then((res) => {
        getAllTasks();
        setPlaying(false);
        return res.status;
      })
      .catch((e) => {
        getAllTasks();
      });
  };

  const handleDeleteTask = (task) => {
    return axios
      .delete(`http://localhost:3004/tasks/${task.id}`)
      .then((res) => {
        getAllTasks();
        return res.status;
      })
      .catch((e) => {
        getAllTasks();
      });
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        playing,
        taskLoading,
        handlePlaying,
        handleStoping,
        handleDeleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};