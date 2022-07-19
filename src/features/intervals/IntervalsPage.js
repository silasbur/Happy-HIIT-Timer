import React from 'react';
import { useNavigate } from 'react-router';
import IntervalForm from './IntervalForm';
import { setIntervals } from './IntervalsSlice';
import { useDispatch, useSelector } from 'react-redux';

/*
- Time per interval
- Rest time per interval

(Could use slider for second input as a percentage)
default to 1/4 rest

*/

const IntervalsPage = () => {
  const { inputs, times } = useSelector((s) => ({
    inputs: s.intervals.inputs,
    times: s.intervals.times,
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToNext = () => {
    navigate('/timer');
  };

  const updateIntervals = (values) => {
    dispatch(setIntervals(values));
    localStorage.setItem('intervals', JSON.stringify(values));
  };

  const handleFormChange = (evt) => {
    const inputValues = { ...inputs, [evt.target.name]: +evt.target.value };
    updateIntervals(inputValues);
  };

  const increment = (delta, name) => {
    const incrementedDelta = inputs[name] + delta;
    const inputValues = { ...inputs, [name]: incrementedDelta };
    if (incrementedDelta > 0) {
      updateIntervals(inputValues);
    }
  };


  return (
    <div className="timer-page p-3 w-full flex justify-center">
      {inputs.interval === null ? null :
        <div className="content-wrapper max-w-md w-full">
          <div className="max-w-lg">
            <IntervalForm
              inputVals={inputs}
              handleFormChange={handleFormChange}
              increment={increment}
            />
            
          </div>
          <div className="py-4">
            <div>Work: {times.work}</div>
            <div>Rest: {times.rest}</div>
            <div>Break: {inputs.longBreak}</div>
          </div>
          <div className="flex justify-end w-full">
            <button className="btn btn-primary btn-lg" onClick={navigateToNext}>
              {'>'}
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default IntervalsPage;
