import React, { useState } from 'react';
import { FaPlayCircle, FaStopCircle } from 'react-icons/fa';
import useStyles from './styleofTimer';
const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const CountTimer = (props) => {
  const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [idPut, setIdPut] = useState(0);
    const countRef = React.useRef(null);
    const _URL = process.env.REACT_APP_URL;

    const handleStart = () => {
      //biến lưu trữ ngày current với time
      const d = new Date();
      const currentDate = `${
        d.getMonth() + 1
      }/${d.getDate()}/${d.getFullYear()}`;
      const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      const CurrentTime = `${currentDate} ${time}`;
      props.valueStartTime(CurrentTime);
      //post data lên db
      const dataObj = { ...props.dataTask, start_time: CurrentTime, status: 0 };
      fetch(`${_URL}tasks`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(dataObj),
      }).then((res) => {
        res.json().then((response) => setIdPut(response.id));
        fetch(`${_URL}tasks`)
          .then((response) => response.json())
          .then((data) => {
            props.returnData(data);
          });
      });

      setIsHidden(true);
      setIsActive(true);

      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    };

    const handleStop = () => {
      const x = new Date();
      const currentDateEnd = `${
        x.getMonth() + 1
      }/${x.getDate()}/${x.getFullYear()}`;
      const timeEnd =
        x.getHours() + ':' + x.getMinutes() + ':' + x.getSeconds();
      const CurrentTimeEnd = `${currentDateEnd} ${timeEnd}`;
      props.valueEndTime(CurrentTimeEnd);
      props.valueCountTime(timer);
      const minutes = new Date(timer * 1000).toISOString().substr(14, 2);
      const dataObj = {
        ...props.dataTask,
        end_time: CurrentTimeEnd,
        time_spent: minutes,
        status: 1,
      };
      fetch(`${_URL}tasks/` + idPut, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(dataObj),
      })
        .then((response) => response.json())
        .then((data) => {
          fetch(`${_URL}tasks`)
            .then((res) => res.json())
            .then((result) => {
              props.returnDataPut(result);
            });
        });
      setIsHidden(false);
      clearInterval(countRef.current);
      setIsActive(false);
      setTimer(0);
      setTimeout(() => {
        props.re_render({
          description: 'What are you working on? ',
          start_time: '',
          end_time: '',
          time_spent: '',
          tags: [],
          status: '',
        });
      }, 100);
    };

    return {
      timer,
      isActive,
      handleStart,
      handleStop,
      isHidden,
    };
  };
  const classes = useStyles();
  const { timer, isActive, handleStart, handleStop, isHidden } = useTimer(0);

  return (
    <div className={classes.boxTimer}>
      <p className={classes.countTime}>{formatTime(timer)}</p>
      <div className="buttons">
        {!isActive ? (
          <button onClick={handleStart}>
            <FaPlayCircle />
          </button>
        ) : null}
        {isHidden && (
          <button onClick={handleStop}>
            <FaStopCircle />
          </button>
        )}
      </div>
    </div>
  );
};

export default CountTimer;
