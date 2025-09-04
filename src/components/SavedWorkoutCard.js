import React from "react";

const SavedWorkoutCard = ({ workout, isSelected, onClick, className = "" }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(workout);
    }
  };

  return (
    <div
      key={workout.id}
      onClick={handleClick}
      className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer mb-4 p-4 border-2 ${
        isSelected
          ? "border-primary/40 bg-primary/5"
          : "border-base-300 hover:border-primary/50"
      } ${className}`}
    >
      <div className="card-body p-0">
        <h3
          className={`card-title text-lg ${
            isSelected
              ? "text-primary/80"
              : "text-base-content"
          }`}
        >
          {workout.title}
        </h3>
        <p className="text-sm text-base-content/70">
          {workout.exercises.length} exercises • {workout.intervals?.rest ?? 0}s rest •{" "}
          {workout.intervals?.longBreak ?? 0}s break
        </p>
      </div>
    </div>
  );
};

export default SavedWorkoutCard;