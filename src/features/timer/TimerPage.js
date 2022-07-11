import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

/*
- set interval for every second or milisecond
- have time variable
- track sets. Use to find to display which exercise we are on.
- each set has rest and work timers in that order
*/

const TimerPage = () => {
  const intervals = useSelector((st) => st.intervals);
  const [phase, setPhase] = useState('rest');
  const [time, setTime] = useState(intervals[phase]);
  const tick = () => {
    setTime((time) => Math.round(time - 1));
  };

  // listen to timer
  useEffect(() => {
    if (time === 0) {
      console.log(time);
      const nextPhase = phase === 'rest' ? 'work' : 'rest';
      console.log(nextPhase)
      setPhase(nextPhase);
      setTime(intervals[phase]);
    }
  }, [time]);

  // set phase timer
  useEffect(() => {
    const id = setInterval(tick, 100);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="timer-page p-3 w-full flex justify-center">
      <div className="content-wrapper max-w-md w-full">
        <div className="max-w-lg">{time}</div>
        <div className="flex justify-end w-full"></div>
      </div>
    </div>
  );
};

export default TimerPage;
