import React from "react";

const SavedWorkoutCard = ({ workout, isSelected, onClick, onDelete, className = "" }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(workout);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent card selection when clicking delete
    if (onDelete) {
      onDelete(workout.id);
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
        <div className="flex justify-between items-start">
          <div className="flex-1">
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
          <button
            onClick={handleDelete}
            className="btn-sm text-gray-500 ml-2"
            title="Delete workout"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedWorkoutCard;