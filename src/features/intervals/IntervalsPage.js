import React from 'react';
import { useNavigate } from 'react-router';
import IntervalForm from './IntervalForm';
import { setIntervals } from './IntervalsSlice';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../components/PageLayout';

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
    <PageLayout title="Timing" page="intervals">
      {inputs.interval === null ? null : (
        <div className="content-wrapper">
          <div className="flex justify-between">
            <div>Work: {times.work}</div>
            <div>Rest: {times.rest}</div>
            <div>Break: {inputs.longBreak}</div>
          </div>
          <div>
            <IntervalForm
              inputVals={inputs}
              handleFormChange={handleFormChange}
              increment={increment}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default IntervalsPage;
