import React, { useState, useRef, useEffect, useContext } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Box } from "@mui/system";
import moment from "moment";
import TasksApi from "../API/tasksApi";
import { DataContext } from "../context/dataContent";

// Format time
const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const Clock = (props) => {
  const { getReload } = useContext(DataContext);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [status, setStatus] = useState(1);
  const [timeSpent, setTimeSpent] = useState();
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);

  const [newTask, setNewTask] = useState({
    description: "",
    end_time: "",
    id: "",
    start_time: "",
    status: "",
    tags: [],
    time_spent: "",
  });
  const { valueDes } = props;
  const { valueTag } = props;

  const handleStart = () => {
    setStatus(1);
    setIsActive(true);
    setIsPaused(true);
    console.log(newTask);
    console.log("start: ",timeStart)
    const fetchNewTask = async () => {
      try {
        await TasksApi.postTask(newTask);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewTask();
    getReload();
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    console.log("end: ",timeEnd)
    console.log("spent: ",timeSpent)
    setTimer(0);
  };

  useEffect(() => {
    const endTime = new Date();
    setTimeEnd(moment(endTime).format("YYYY/MM/DD, HH:mm:ss"));
    //Tính thời gian
    // var diffTime = moment(timeEnd).diff(timeStart, "HH:mm:ss");
    var duration = moment.duration(moment(timeStart).diff(moment(timeEnd)));
    setTimeSpent(duration);
    setStatus(0);
  }, [isPaused, timeEnd, timeStart]);

  useEffect(() => {
    const today = new Date();
    setTimeStart(moment(today).format("YYYY/MM/DD, HH:mm:ss"));
    setNewTask({
      description: valueDes,
      end_time: "",
      id: "",
      start_time: timeStart,
      status: status,
      tags: valueTag,
      time_spent: "",
    });
  }, [valueDes, valueTag, timeStart, status]);

  return (
    <Box>
      <Box className="stopwatch-card" display="flex" alignItems="center">
        <Box component="h3" m={0} mr={2}>
          {formatTime(timer)}
        </Box>
        <Box>
          {!isActive && !isPaused ? (
            <Box onClick={handleStart}>
              <PlayCircleFilledIcon style={{ fontSize: "40px" }} />
            </Box>
          ) : (
            <Box onClick={handlePause}>
              <PauseCircleIcon style={{ fontSize: "40px" }} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Clock;
