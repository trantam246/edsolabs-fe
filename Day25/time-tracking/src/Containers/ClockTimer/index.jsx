import React, { useState, useEffect, useRef } from 'react';

export const ClockTimer = ({ onHandleTimeSpend = () => {} }) => {
  const [clockTime, setClockTime] = useState({ hour: 0, minute: 0, second: 0 });
  const clockTimeRef = useRef({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setClockTime({
        ...clockTime,
        second:
          clockTime.second === 59
            ? ((clockTime.second = 0), (clockTime.minute += 1))
            : (clockTime.second += 1),
        hour: clockTime.minute === 59 ? (clockTime.hour += 1) : clockTime.hour,
      });

      if (clockTimeRef.current.second === 59) {
        clockTimeRef.current.second = 0;
        clockTimeRef.current.minute++;
      } else {
        clockTimeRef.current.second++;
      }
      if (clockTimeRef.current.minutes === 59) {
        clockTimeRef.hour++;
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      clockTimeRef.current.second = 0;
      clockTimeRef.current.minute = 0;
      clockTimeRef.current.hour = 0;
    };
  }, []);

  useEffect(() => {
    if (clockTime.hour >= 1) {
      onHandleTimeSpend(clockTime.hour * 60 + clockTime.minute);
    } else {
      onHandleTimeSpend(clockTime.minute);
    }
  }, [clockTime.minute]);

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
