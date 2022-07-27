import React from 'react';
import { useNavigate } from 'react-router-dom';

const nextPageMap = {
  exercises: '/intervals',
  intervals: '/timer',
};

const prevPageMap = {
  intervals: '/exercises',
  timer: '/intervals',
};

const PageLayout = (props) => {
  const navigate = useNavigate();
  const navigateToNext = () => {
    navigate(nextPageMap[props.page]);
  };
  const navigateToPrevious = () => {
    navigate(prevPageMap[props.page])
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {props.page === 'exercises' ? null : (
            <button
              onClick={navigateToPrevious}
              className="btn btn-ghost btn-circle"
            >
              {'<'}
            </button>
          )}
        </div>
        <div class="navbar-center">
          <a class="text-xl">Happy HIIT Timer</a>
        </div>
        <div class="navbar-end">
          {props.page !== 'timer' ? (
            <button
              onClick={navigateToNext}
              className="btn btn-ghost btn-circle"
            >
              {'>'}
            </button>
          ) : null}
        </div>
      </div>
      <div className={`${props.page}-page p-3 w-full flex justify-center`}>
        <div className="content-wrapper max-w-md w-full">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
