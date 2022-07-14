import { createSlice } from '@reduxjs/toolkit';

const initialState = { times: { work: 45, rest: 15}, inputs: { interval: 60, ratio: 0.75 }};

const calcTimes = ({ ratio, interval }) => {
  const work = Math.round(ratio * interval);
  const rest = interval - work;
  return { rest, work };
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
