import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import shortBeep from '../../assets/shortAlert.mp3';
import longBeep from '../../assets/longAlert.mp3';

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

  const longAlert = useRef(new Audio(longBeep));
  const shortAlert = useRef(new Audio(shortBeep));

  const [phase, setPhase] = useState('rest');
  const [time, setTime] = useState(null);
  const [icount, setIcount] = useState(1);
  const [isRunning, setRunning] = useState(false);
  const [isSoundOn, setSound] = useState(true);

  const toggleRunning = () => {
    setRunning((isRunning) => !isRunning);
  };

  const reset = () => {
    setRunning(false);
    setPhase('rest');
    setIcount(1);
    setTime(intervals['rest']);
  };

  const getNextPhase = (phase, intervalCount, numExercises) => {
    if (phase === 'rest' || phase === 'longBreak') {
      return 'work';
    } else if (intervalCount % numExercises === 0) {
      return 'longBreak';
    } else {
      return 'rest';
    }
  };

  // listen to changes after loading local storage
  useEffect(() => {
    setTime(intervals[phase]);
  }, [intervals]);

  const playSounds = (time) => {
    if (isRunning) {
      if (time === 4 || time === 3 || time === 2) shortAlert.current.play();
      if (time === 1) longAlert.current.play();
    }
  };

  // listen to timer
  useEffect(() => {
    if (isSoundOn) {
      playSounds(time, isRunning);
    }
    if (time !== null && time <= 0.1) {
      // triggering from default values
      const nextPhase = getNextPhase(phase, icount, exercises.length);
      if (nextPhase !== 'work') {
        setIcount(icount + 1);
      }
      setTime(intervals[nextPhase]);

      setPhase(nextPhase);
    }
  }, [time]);

  const tick = () => {
    setTime((time) => Math.round((time - 0.1) * 10) / 10);
  };

  // set phase timer
  useEffect(() => {
    // handle pauses
    if (isRunning) {
      const id = setInterval(tick, 100);
      return () => {
        clearInterval(id);
      };
    }
  }, [isRunning]);

  const progressColor = phase === 'rest' ? 'accent' : 'info';
  const percentComplete = (time / intervals[phase]) * 100;
  const progress = phase !== 'work' ? percentComplete : 100 - percentComplete;

  return (
    <div className="timer-page p-3 w-full flex justify-center">
      {time === null ? null : (
        <div className="content-wrapper max-w-md w-full">
          <div className="max-w-lg">{Math.ceil(time)}</div>
          <div className="flex justify-end w-full">
            <progress
              className={`progress progress-${progressColor} w-56`}
              value={progress}
              max="100"
            ></progress>
            {exercises.length ? (
              <div className="badge badge-primary">
                {exercises[(icount - 1) % exercises.length].name}
              </div>
            ) : null}
            {icount + ' / ' + exercises.length}
          </div>
          <button onClick={() => toggleRunning()}>
            {isRunning ? 'Pause' : 'Play'}{' '}
          </button>
          <button onClick={reset}>Reset</button>
          <button onClick={() => setSound((s) => !s)}>sound {isSoundOn ? null : 'x'}</button>
        </div>
      )}
    </div>
  );
};

export default TimerPage;
