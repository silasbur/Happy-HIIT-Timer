import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '../features/exercises/exercisesSlice';
import intervalsReducer from '../features/intervals/IntervalsSlice';

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    intervals: intervalsReducer,
  },
});
