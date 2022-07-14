import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/*
- set interval for every second or milisecond
- have time variable
- track sets. Use to find to display which exercise we are on.
- each set has rest and work timers in that order
*/

const TimerPage = () => {
  const { intervals, exercises } = useSelector(({ intervals, exercises }) => ({
    intervals: intervals.times,
    exercises,
  }));
  const [phase, setPhase] = useState('rest');
  const [time, setTime] = useState(intervals[phase]);
  const [icount, setIcount] = useState(0);
  const tick = () => {
    setTime((time) => time - 0.1);
  };

  // listen to timer
  useEffect(() => {
    if (time < 0.1) {
      const nextPhase = phase === 'rest' ? 'work' : 'rest';
      if (nextPhase === 'rest') {
        setIcount(icount + 1);
      }
      setTime(intervals[nextPhase]);
      setPhase(nextPhase);
    }
  }, [time]);

  // set phase timer
  useEffect(() => {
    const id = setInterval(tick, 100);
    return () => {
      clearInterval(id);
    };
  }, []);

  const progressColor = phase === 'rest' ? 'accent' : 'info';
  const percentComplete = (time / intervals[phase]) * 100;
  const progress = phase === 'rest' ? percentComplete : 100 - percentComplete;
  const count = phase === 'rest' ? time : intervals[phase] - time;

  return (
    <div className="timer-page p-3 w-full flex justify-center">
      <div className="content-wrapper max-w-md w-full">
        <div className="max-w-lg">{Math.round(count * 100) / 100}</div>
        <div className="flex justify-end w-full">
          <progress
            className={`progress progress-${progressColor} w-56`}
            value={progress}
            max="100"
          ></progress>
          {exercises.length ? (
            <div className="badge badge-primary">{exercises[icount % exercises.length].name}</div>
          ) : null}
          {icount + ' / ' + exercises.length}
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
