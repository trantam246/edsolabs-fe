import React, { useState, useEffect } from 'react';

export const ClockTimer = ({ onHandleTimeSpend = () => {} }) => {
  const [clockTime, setClockTime] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newClockTime = {
        ...clockTime,
        second:
          clockTime.second === 59
            ? ((clockTime.second = 0), (clockTime.minute += 1))
            : (clockTime.second += 1),
        hour: clockTime.minute === 59 ? (clockTime.hour += 1) : clockTime.hour,
      };

      setClockTime(newClockTime);
    }, 1000);
    return () => {
      clearInterval(interval);
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
      {clockTime.hour >= 10 ? clockTime.hour : `0${clockTime.hour}`}:
      {clockTime.minute >= 10 ? clockTime.minute : `0${clockTime.minute}`}:
      {clockTime.second >= 10 ? clockTime.second : `0${clockTime.second}`}
    </div>
  );
};
