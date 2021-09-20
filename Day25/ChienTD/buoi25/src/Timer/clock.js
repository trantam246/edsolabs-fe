import React, { useState, useRef, useEffect } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Box } from "@mui/system";
import moment from "moment";

const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const Clock = (props) => {
  const [addNewTask, setAddNewTask] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeStart, setTimeStart] = useState();
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);
  const [newTask, setNewTask] = useState({description: "", end_time: "", id: "", start_time: "", status: "", tags: [], time_spent: ""});
  const {valueDes} = props;
  const {valueTag} = props;

  useEffect(() => {
    setNewTask({description: valueDes, end_time: "", id: "", start_time: timeStart, status: "", tags: valueTag, time_spent: ""})
  }, [valueDes, valueTag, timeStart]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    console.log(newTask)
    const today = new Date();
    setTimeStart(moment(today).format("YYYY/MM/DD, HH:mm"));
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };
  // const {
  //   timer,
  //   isActive,
  //   isPaused,
  //   handleStart,
  //   handlePause,
  //   timeStart,
  // } = useTimer(0);
  // props.valueTime(timeStart)
  // const [addNewTask, setAddNewTask] = useState({});
  // setAddNewTask(props.newTask);
  // alert(props.newTask)
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

// const useTimer = (initialState = 0) => {
//   const [timer, setTimer] = useState(initialState);
//   const [isActive, setIsActive] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [timeStart, setTimeStart] = useState();
//   const countRef = useRef(null);

//   const handleStart = () => {
//     setIsActive(true);
//     setIsPaused(true);
//     const today = new Date();
//     setTimeStart(moment(today).format('YYYY/MM/DD, HH:mm'));
//     countRef.current = setInterval(() => {
//       setTimer((timer) => timer + 1);
//     }, 1000);
//   };

//   const handlePause = () => {
//     clearInterval(countRef.current);
//     setIsActive(false);
//     setIsPaused(false);
//     setTimer(0);
//   };

//   return {
//     timer,
//     isActive,
//     isPaused,
//     handleStart,
//     handlePause,
//     timeStart
//   };
// };

export default Clock;
