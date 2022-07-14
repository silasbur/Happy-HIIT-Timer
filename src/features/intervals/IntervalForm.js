import React from 'react';

const IntervalForm = ({
  inputVals,
  handleFormChange,
  increment,
}) => {
  return (
    <>
      <IntervalInput
        intervalValue={inputVals.interval}
        handleFormChange={handleFormChange}
        increment={increment}
      />

      <RatioInput
        handleFormChange={handleFormChange}
        value={inputVals.ratio}
      />
    </>
  );
};

export const IntervalInput = ({
  increment,
  handleFormChange,
  intervalValue,
}) => {
  return (
    <>
      <div className="form-control py-4">
        <label className="label">
          <span className="label-text">Interval length in seconds</span>
        </label>
        <div className="input-group">
          <button onClick={() => increment(-10)} className="btn ">
            -
          </button>
          <input
            value={intervalValue}
            onChange={handleFormChange}
            name="interval"
            type="number"
            className="input input-bordered w-full"
          />
          <button className="btn" onClick={() => increment(+10)}>
            +
          </button>
        </div>
      </div>
      {/* <div class="custom-number-input h-10 w-32">
        <label
          for="custom-input-number"
          class="w-full text-gray-700 text-sm font-semibold"
        >
          Counter Input
        </label>
      </div>
      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span class="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
          name="custom-input-number"
          value="0"
        ></input>
        <button
          data-action="increment"
          class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span class="m-auto text-2xl font-thin">+</span>
        </button>
      </div> */}
    </>
  );
};

export const RatioInput = ({ handleFormChange, value }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Work / rest ratio</span>
      </label>
      <input
        onChange={handleFormChange}
        name="ratio"
        type="range"
        min="0"
        max="1"
        value={value}
        step="0.125"
        className="range"
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default IntervalForm;
