import { createSlice, nanoid } from '@reduxjs/toolkit';
// import { fetchExercises } from './exercisesAPI';


const initialState = [];

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setExercises: (state, action) => {
      state = action.payload;
      return state;
    },
    addExercise: (state, action) => {
      const id = nanoid();
      state.push({name: action.payload, id});
    },
    removeExercise: (state, action) => {
      if (action.payload === undefined) {
        action.payload = state.length - 1;
      }

      state.splice(action.payload, 1)
    },
  },
});

export const { addExercise, removeExercise, setExercises } = exercisesSlice.actions;

export default exercisesSlice.reducer; 