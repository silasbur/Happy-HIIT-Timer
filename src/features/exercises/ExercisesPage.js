import React, { useEffect, useState } from 'react';
import ExercisesList from './ExercisesList';
import ExercisesInput from './ExercisesInput';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const ExercisesPage = () => {
  const exercises = useSelector((s) => s.exercises);
  const [updateOk, setUpdateOk] = useState(false);
  const navigate = useNavigate();
  const navigateToNext = () => {
    navigate('/intervals');
  };

  useEffect(() => {
    setUpdateOk(true);
  }, []);

  useEffect(() => {
    if (updateOk) localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  return (
    <div className="exercises-page p-3 w-full flex justify-center">
      <div className="content-wrapper max-w-md w-full">
        {' '}
        <div className="max-w-lg">
          <ExercisesInput />
          <ExercisesList />
        </div>
        <div className="flex justify-end w-full">
          <button className="btn btn-primary btn-lg" onClick={navigateToNext}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
