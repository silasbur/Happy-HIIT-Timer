import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage";
import IntervalsPage from "./pages/IntervalsPage";
import TimerPage from "./pages/TimerPage";
import WorkoutPage from "./pages/WorkoutPage";
import ConfigPage from "./pages/ConfigPage.js";
import { useExercises } from "./contexts/ExercisesContext";
import { useIntervals } from "./contexts/IntervalsContext";
import { useWorkout } from "./contexts/WorkoutContext";
import "./App.css";

const App = () => {
  const { setExercises } = useExercises();
  const { setIntervals } = useIntervals();
  const { selectedWorkout } = useWorkout();

  useEffect(() => {
    if (selectedWorkout) {
      const { exercises, intervals } = selectedWorkout;
      if (intervals) setIntervals({
        rest: intervals.rest?.toString() || "",
        longBreak: intervals.longBreak?.toString() || ""
      });
      if (exercises) setExercises(exercises);
    }
  }, [selectedWorkout]);

  return (
    <Routes>
      <Route path="/workouts" element={<WorkoutPage />} />
      <Route path="/rest-intervals" element={<IntervalsPage />} />
      <Route path="/exercises" element={<ExercisesPage />} />
      <Route path="/workout-config" element={<ConfigPage />} />
      <Route path="/timer" element={<TimerPage />} />
      <Route path="*" element={<Navigate to="/workouts" />} />
    </Routes>
  );
};

export default App;
