import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { defaultIntervals } from "../constants";

const IntervalsContext = createContext();

const intervalsReducer = (state, action) => {
  switch (action.type) {
    case "SET_INTERVALS":
      return action.payload;
    default:
      return state;
  }
};

const initialState = { 
  rest: defaultIntervals.rest.toString(), 
  longBreak: defaultIntervals.longBreak.toString() 
};

export const IntervalsProvider = ({ children }) => {
  const [intervals, dispatch] = useReducer(intervalsReducer, initialState);

  const setIntervals = useCallback((intervalData) => {
    dispatch({ type: "SET_INTERVALS", payload: intervalData });
  }, []);

  return (
    <IntervalsContext.Provider
      value={{
        intervals,
        setIntervals,
      }}
    >
      {children}
    </IntervalsContext.Provider>
  );
};

export const useIntervals = () => {
  const context = useContext(IntervalsContext);
  if (!context) {
    throw new Error("useIntervals must be used within an IntervalsProvider");
  }
  return context;
};
