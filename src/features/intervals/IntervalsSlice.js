import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  times: { work: null, rest: null, longBreak: null, interval: null },
  inputs: { longBreak: "", work: "", rest: "" },
};

const calcTimes = ({ work, rest, longBreak }) => {
  work = +work;
  rest = +rest;
  longBreak = +longBreak;
  const interval = work + rest;
  return { rest, work, longBreak, interval };
};

export const intervalsSlice = createSlice({
  name: "intervals",
  initialState,
  reducers: {
    setIntervals: (state, action) => {
      state.inputs = action.payload;
      state.times = calcTimes(action.payload);
      return state;
    },
  },
});

export const { setIntervals } = intervalsSlice.actions;

export default intervalsSlice.reducer;
