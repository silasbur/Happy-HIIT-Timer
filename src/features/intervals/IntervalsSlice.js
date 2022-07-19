import { createSlice } from '@reduxjs/toolkit';

const initialState = { times: { work: null, rest: null, longBreak: null }, inputs: { longBreak: null, interval: null, ratio: null }};

const calcTimes = ({ ratio, interval, longBreak }) => {
  const work = Math.round(ratio * interval);
  const rest = interval - work;
  return { rest, work, longBreak };
};

export const intervalsSlice = createSlice({
  name: 'intervals',
  initialState,
  reducers: {
    setIntervals: (state, action) => {
      state.inputs = action.payload;
      state.times = calcTimes(action.payload)
      return state;
    }
  },
});

export const { setIntervals } = intervalsSlice.actions;

export default intervalsSlice.reducer;
