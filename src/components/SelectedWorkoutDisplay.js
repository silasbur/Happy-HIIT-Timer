import React from "react";
import { useNavigate } from "react-router-dom";

const SelectedWorkoutDisplay = ({ selectedWorkout, showStartButton = true, onClick, className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (showStartButton) {
      navigate("/timer");
    }
  };

  if (!selectedWorkout) return null;

  return (
    <div
      className={`mb-4 p-4 bg-primary/10 border border-primary/20 rounded-lg ${
        showStartButton || onClick ? "cursor-pointer hover:bg-primary/15 transition-colors duration-200" : ""
      } ${className}`}
      onClick={handleClick}
    >
      <div>
        <h4 className="font-semibold text-primary">
          {selectedWorkout.title}
        </h4>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="badge badge-primary badge-sm">Selected</span>
        </div>
        {showStartButton && (
          <div className="flex items-center gap-2 text-primary">
            <span className="text-sm font-medium">Start Workout</span>
            <span className="text-lg">→</span>
          </div>
        )}
      </div>
      <p className="text-sm text-base-content/70">
        {selectedWorkout.exercises.length} exercises •{" "}
        {selectedWorkout.intervals?.rest || 0}s rest • {selectedWorkout.intervals?.longBreak || 0}s break
      </p>
    </div>
  );
};

export default SelectedWorkoutDisplay;