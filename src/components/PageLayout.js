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
    navigate(prevPageMap[props.page]);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-sm">
        <div className="navbar bg-gray-100">
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
          <div className="navbar-center">
            <span className="text-xl">Happy HIIT Timer</span>
          </div>
          <div className="navbar-end">
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
        <div className={`${props.page}-page p-3`}>
          <div className="page-content-wrapper">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
