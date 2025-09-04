import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

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

  const setSelectedWorkout = useCallback((workout) => {
    dispatch({ type: "SET_SELECTED", payload: workout });
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
