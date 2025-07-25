import React from "react";
import IntervalForm from "./IntervalForm";
import { useIntervals } from "../../contexts/IntervalsContext";
import PageLayout from "../../components/PageLayout";

/*
- Time per interval
- Rest time per interval

*/

const IntervalsPage = () => {
  const { intervals, setIntervals } = useIntervals();
  const { inputs, times } = intervals;

  const updateIntervals = (values) => {
    setIntervals(values);
    localStorage.setItem("intervals", JSON.stringify(values));
  };

  const handleFormChange = (evt) => {
    const inputValues = { ...inputs, [evt.target.name]: evt.target.value };
    updateIntervals(inputValues);
  };

  const increment = (delta, name) => {
    const incrementedDelta = +inputs[name] + delta; // convert to string to number for addition
    const inputValues = { ...inputs, [name]: "" + incrementedDelta }; //convert to string
    if (incrementedDelta > 0) {
      updateIntervals(inputValues);
    }
  };

  return (
    <PageLayout title="Timing" page="intervals">
      {inputs.interval === null ? null : (
        <div className="content-wrapper">
          <div className="flex justify-around">
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
