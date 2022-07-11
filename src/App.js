import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom';
import ExercisesPage from './features/exercises/ExercisesPage';
import IntervalsPage from './features/intervals/IntervalsPage';
import TimerPage from './features/timer/TimerPage';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ExercisesPage />} />
      <Route path='/intervals' element={<IntervalsPage />} />
      <Route path='/timer' element={<TimerPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App;