import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { nanoid } from "nanoid";

const ExercisesContext = createContext();

const exercisesReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXERCISES":
      return action.payload;
    case "ADD_EXERCISE":
      const id = nanoid();
      return [...state, { ...action.payload, id }]; // {name, time}
    case "REMOVE_EXERCISE":
      const index =
        action.payload !== undefined ? action.payload : state.length - 1;
      return state.filter((_, i) => i !== index);
    default:
      return state;
  }
};

const exerciseIntervalReducer = (state, action) => {
  switch (action.type) {
    case "SET_INTERVAL":
      return action.payload;
    default:
      return state;
  }
};

export const ExercisesProvider = ({ children }) => {
  const [exercises, dispatch] = useReducer(exercisesReducer, []);
  const [exerciseInterval, intervalDispatch] = useReducer(
    exerciseIntervalReducer,
    45,
  );

  const setExerciseInterval = useCallback((time) => {
    intervalDispatch({ type: "SET_INTERVAL", payload: time });
  }, []);

  const setExercises = useCallback((exercises) => {
    dispatch({ type: "SET_EXERCISES", payload: exercises });
  }, []);

  const addExercise = useCallback((exerciseData) => {
    dispatch({ type: "ADD_EXERCISE", payload: exerciseData });
  }, []);

  const removeExercise = useCallback((index) => {
    dispatch({ type: "REMOVE_EXERCISE", payload: index });
  }, []);

  return (
    <ExercisesContext.Provider
      value={{
        setExerciseInterval,
        exerciseInterval,
        exercises,
        setExercises,
        addExercise,
        removeExercise,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export const useExercises = () => {
  const context = useContext(ExercisesContext);
  if (!context) {
    throw new Error("useExercises must be used within an ExercisesProvider");
  }
  return context;
};
