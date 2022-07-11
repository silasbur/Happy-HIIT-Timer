import { createSlice, nanoid } from '@reduxjs/toolkit';
// import { fetchExercises } from './exercisesAPI';

const initialState = { work: 45, rest: 15 };

export const intervalsSlice = createSlice({
  name: 'intervals',
  initialState,
  reducers: {
    setIntervals: (state, action) => {
      const { work, rest } = action.payload;
      state = { work, rest };
    },
  },
});

export const { setIntervals } = intervalsSlice.actions;

export default intervalsSlice.reducer;
