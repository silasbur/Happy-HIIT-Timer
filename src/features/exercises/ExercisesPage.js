import React from 'react';
import ExercisesList from './ExercisesList';
import ExercisesInput from './ExercisesInput';
import { useNavigate } from 'react-router';

const ExercisesPage = () => {
  const navigate = useNavigate();
  const navigateToNext = () => {
    navigate('/intervals');
  };
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
