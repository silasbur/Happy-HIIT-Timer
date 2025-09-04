import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { getSelectedWorkout, setSelectedWorkout as saveSelectedWorkout } from "../shared/workouts.local";

const WorkoutContext = createContext();

const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED":
      return action.payload;
    default:
      return state;
  }
};

export const WorkoutProvider = ({ children }) => {
  const [selectedWorkout, dispatch] = useReducer(workoutReducer, null);

  // Load selected workout from localStorage on mount
  useEffect(() => {
    const savedWorkout = getSelectedWorkout();
    if (savedWorkout) {
      dispatch({ type: "SET_SELECTED", payload: savedWorkout });
    }
  }, []);

  const setSelectedWorkout = useCallback((workout) => {
    dispatch({ type: "SET_SELECTED", payload: workout });
    saveSelectedWorkout(workout);
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        setSelectedWorkout,
        selectedWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

// set whole workout not just id
export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within an WorkoutProvider");
  }
  return context;
};
