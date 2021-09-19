import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  // có task đang playing hay không
  const [playing, setPlaying] = useState(false);
  // task đang được playing
  const [taskPlaying, setTaskPlaying] = useState({});
  const [taskLoading, setTaskLoading] = useState(false);

  // restart tag - lam lai task cu
  const [taskRestarted, setTaskRestarted] = useState({});

  // state ở single task
  const [stopInSingleTask, setStopInSingleTask] = useState(false);

  /** get all tasks in db */
  const getAllTasks = () => {
    setTaskLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => {
        setTasks(res.data);
        setTaskLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setTaskLoading(false);
      });
  };

  /** Gọi api khi play task, post thời gian bắt đầu task */
  const handlePlaying = (task) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/tasks`, task)
      .then((res) => {
        getAllTasks();
        setPlaying(true);
        setTaskPlaying(res.data);
        return res.status;
      })
      .catch((e) => {
        console.log(e);
        setTaskPlaying({});
        getAllTasks();
      });
  };

  const handleStoping = (task) => {
    setPlaying(false);
    return axios
      .patch(`${process.env.REACT_APP_API_URL}/tasks/${taskPlaying.id}`, task)
      .then((res) => {
        getAllTasks();
        setPlaying(false);
        setTaskPlaying({});
        return res.status;
      })
      .catch((e) => {
        console.log(e);
        getAllTasks();
      });
  };

  /** Xoa task duoc chon */
  const handleDeleteTask = (task) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`)
      .then((res) => {
        getAllTasks();
        return res.status;
      })
      .catch((e) => {
        console.log(e);
        getAllTasks();
      });
  };

  const handleRestart = (task) => {
    setTaskRestarted(task);
    // console.log(task);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const data = {
    tasks,
    playing,
    handlePlaying,
    handleStoping,
    taskLoading,
    handleDeleteTask,
    taskPlaying,
    stopInSingleTask,
    setStopInSingleTask,
    handleRestart,
    taskRestarted,
  };

  return <TaskContext.Provider value={data}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
