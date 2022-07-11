import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import IntervalForm from './IntervalForm';
import { setIntervals } from './IntervalsSlice';
import { useDispatch } from 'react-redux';

/*
- Time per interval
- Rest time per interval

(Could use slider for second input as a percentage)
default to 1/4 rest

*/

const IntervalsPage = () => {
  const [inputVals, setInputs] = useState({ interval: 60, rest: 75 });

  const calcTimes = () => {
    const restTime = inputVals.rest * 0.01 * inputVals.interval;
    const exerciseTime = inputVals.interval - restTime;
    return { restTime, exerciseTime };
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToNext = () => {
    dispatch(setIntervals({ work: exerciseTime, rest: restTime }));
    navigate('/timer');
  };

  const { exerciseTime, restTime } = useMemo(calcTimes, [
    inputVals.interval,
    inputVals.rest,
  ]);

  const handleFormChange = (evt) => {
    setInputs((st) => ({ ...st, [evt.target.name]: evt.target.value }));
  };

  const incrementInterval = (delta) => {
    const incrementedDelta = inputVals.interval + delta;
    if (incrementedDelta > 0) {
      setInputs((st) => ({ ...st, interval: incrementedDelta }));
    }
  };
  return (
    <div className="timer-page p-3 w-full flex justify-center">
      <div className="content-wrapper max-w-md w-full">
        <div className="max-w-lg">
          <IntervalForm
            restTime={restTime}
            exerciseTime={exerciseTime}
            inputVals={inputVals}
            handleFormChange={handleFormChange}
            incrementInterval={incrementInterval}
          />
        </div>
        <div className="flex justify-end w-full">
          <button className="btn btn-primary btn-lg" onClick={navigateToNext}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntervalsPage;
