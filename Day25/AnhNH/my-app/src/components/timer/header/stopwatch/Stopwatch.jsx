import React from 'react';

const Stopwatch = (props) => {
  const formatTime = () => {
    const getSeconds = `0${(props.timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(props.timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(props.timer / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  return (
    <>
    {formatTime()}
    </>
  );
}

export default Stopwatch;
