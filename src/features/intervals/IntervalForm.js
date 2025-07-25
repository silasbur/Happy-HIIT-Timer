import React from "react";

const IntervalForm = ({ inputVals, handleFormChange, increment }) => {
  return (
    <>
      <IntervalInput
        value={inputVals.rest}
        handleFormChange={handleFormChange}
        increment={increment}
        name="rest"
        label="Rest between exercises"
      />

      <IntervalInput
        value={inputVals.longBreak}
        handleFormChange={handleFormChange}
        increment={increment}
        name="longBreak"
        label="Rest between sets"
      />
    </>
  );
};

export const IntervalInput = ({
  increment,
  handleFormChange,
  value,
  name,
  label,
}) => {
  return (
    <>
      <div className="form-control py-2">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="input-group">
          <button onClick={() => increment(-10, name)} className="btn ">
            -
          </button>
          <input
            value={value}
            onChange={handleFormChange}
            name={name}
            type="number"
            className="input input-bordered w-full"
          />
          <button className="btn" onClick={() => increment(+10, name)}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default IntervalForm;
