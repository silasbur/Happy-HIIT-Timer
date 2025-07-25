import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ExercisesPage from "./features/exercises/ExercisesPage";
import IntervalsPage from "./features/intervals/IntervalsPage";
import TimerPage from "./features/timer/TimerPage";
import WorkoutPage from "./features/workouts/WorkoutPage";
import { useExercises } from "./contexts/ExercisesContext";
import { useIntervals } from "./contexts/IntervalsContext";
import "./App.css";

const App = () => {
  const { setExercises } = useExercises();
  const { setIntervals } = useIntervals();

  useEffect(() => {
    const exercises = localStorage.getItem("exercises");
    const intervals = localStorage.getItem("intervals");

    if (exercises) setExercises(JSON.parse(exercises));
    if (intervals) setIntervals(JSON.parse(intervals));
    else setIntervals({ longBreak: 90, rest: 15 });
  }, []);

  return (
    <Routes>
      <Route path="/workouts" element={<WorkoutPage />} />
      <Route path="/exercises" element={<ExercisesPage />} />
      <Route path="/intervals" element={<IntervalsPage />} />
      <Route path="/timer" element={<TimerPage />} />
      <Route path="*" element={<Navigate to="/workouts" />} />
    </Routes>
  );
};

export default App;
