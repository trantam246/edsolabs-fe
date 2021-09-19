import React, { useContext, createContext, useState, useRef } from "react";
import { updateTasks, createTasks, deleteTasks } from "../apis/apis";
import moment from "moment";
import { chooseTag } from "../common/common";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [render, setRender] = useState(false);
  const [startTime, setStart] = useState(``);
  const countRef = useRef(null);
  const [timer, setTimer] = useState(0);
  const [description, setDescription] = useState("");
  const [counting, setCounting] = useState([]);
  const [dotMenu, setdotMenu] = useState(null);
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
  });

  const handleStart = () => {
    const start = moment().format(`YYYY-MM-DD H:mm:ss`);
    setIsActive(true);
    setStart(start);
    setRender(!render);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    createTasks({
      description: description,
      start_time: start,
      status: 0,
      tags: chooseTag(
        state.checkedA,
        state.checkedB,
        state.checkedC,
        state.checkedD
      ),
    })
      .then((res) => {
        setCounting(res.data);
      })
      .catch((err) => {
        alert("Không thể kết nối tới server");
      });
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setRender(!render);
    setdotMenu(null);
    setIsActive(false);
    const end = moment().format(`YYYY-MM-DD H:mm:ss`);
    updateTasks(counting.id, {
      description: description,
      start_time: startTime,
      end_time: end,
      time_spent: `${moment(end).diff(startTime, "seconds")}`,
      tags: chooseTag(
        state.checkedA,
        state.checkedB,
        state.checkedC,
        state.checkedD
      ),
      status: 1,
    });
    setTimer(0);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this file?")) {
      deleteTasks(id)
        .then(() => {
          setRender(!render);
          setdotMenu(null);
        })
        .catch(() => {
          alert("Lỗi");
        });
    }
  };
  const handleRestart = (r) => {
    if (isActive === true) {
      alert("Đang có task chạy...");
    } else {
      setDescription(r);
      console.log(r);
      // setState(t);
      handleStart();
    }
  };
  const handleClose = () => {
    setdotMenu(null);
  };
  const data = {
    isActive,
    state,
    timer,
    render,
    setIsActive,
    setDescription,
    setState,
    setdotMenu,
    dotMenu,
    handleStart,
    handleReset,
    handleDelete,
    handleClose,
    handleRestart,
    render,
    setRender,
  };

  return <TaskContext.Provider value={data}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
