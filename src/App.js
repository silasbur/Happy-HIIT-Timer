import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import ExercisesPage from './features/exercises/ExercisesPage';
import IntervalsPage from './features/intervals/IntervalsPage';
import TimerPage from './features/timer/TimerPage';
import { setExercises } from './features/exercises/exercisesSlice';
import { setIntervals } from './features/intervals/IntervalsSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const exercises = localStorage.getItem('exercises');
    const intervals = localStorage.getItem('intervals');
    if (exercises) dispatch(setExercises(JSON.parse(exercises)));
    if (intervals) dispatch(setIntervals(JSON.parse(intervals)));
    else dispatch(setIntervals({longBreak: 90, interval: 4, ratio: 0.75}));

  }, []);

  return (
    <Routes>
      <Route path="/" element={<ExercisesPage />} />
      <Route path="/intervals" element={<IntervalsPage />} />
      <Route path="/timer" element={<TimerPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
