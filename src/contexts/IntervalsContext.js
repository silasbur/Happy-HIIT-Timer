import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

const IntervalsContext = createContext();

const calcTimes = ({ rest, longBreak }) => {
  rest = +rest;
  longBreak = +longBreak;
  return { rest, longBreak };
};

const intervalsReducer = (state, action) => {
  switch (action.type) {
    case "SET_INTERVALS":
      return {
        inputs: action.payload,
        times: calcTimes(action.payload),
      };
    default:
      return state;
  }
};

const initialState = {
  times: { rest: null, longBreak: null, interval: null },
  inputs: { longBreak: "", rest: "" },
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
