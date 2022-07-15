import { createSlice } from '@reduxjs/toolkit';

const initialState = { times: { work: 45, rest: 15, break: 100 }, inputs: { break: 100, interval: 60, ratio: 0.75 }};

const calcTimes = ({ ratio, interval, break: b }) => {
  const work = Math.round(ratio * interval);
  const rest = interval - work;
  return { rest, work, break: b };
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
