import React, { useState, useEffect, useRef } from 'react';

export const ClockTimer = ({ onHandleTimeSpend = () => {} }) => {
  const [clockTime, setClockTime] = useState({});
  const clockTimeRef = useRef({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (clockTimeRef.current.second === 60) {
        clockTimeRef.current.second = 0;
        clockTimeRef.current.minute++;
      } else {
        clockTimeRef.current.second++;
      }
      if (clockTimeRef.current.minutes === 60) {
        clockTimeRef.hour++;
      }

      setClockTime({});
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (clockTimeRef.current.hour >= 1) {
      onHandleTimeSpend(
        clockTimeRef.current.hour * 60 + clockTimeRef.current.minute,
      );
    } else {
      onHandleTimeSpend(clockTimeRef.current.minute);
    }
  }, [clockTimeRef.current.minute]);

  return (
    <div>
      {clockTimeRef.current.hour >= 10
        ? clockTimeRef.current.hour
        : `0${clockTimeRef.current.hour}`}
      :
      {clockTimeRef.current.minute >= 10
        ? clockTimeRef.current.minute
        : `0${clockTimeRef.current.minute}`}
      :
      {clockTimeRef.current.second >= 10
        ? clockTimeRef.current.second
        : `0${clockTimeRef.current.second}`}
    </div>
  );
};
