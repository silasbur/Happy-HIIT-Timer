import React, { useState } from "react";
import { createWorkout } from "../shared/workouts.local";
import { useWorkout } from "../contexts/WorkoutContext";
import { useExercises } from "../contexts/ExercisesContext";
import { useIntervals } from "../contexts/IntervalsContext";
import { defaultIntervals } from "../constants";

const CreateWorkoutButton = ({ setSavedWorkouts }) => {
  const [isCreating, setIsCreating] = useState(false);
  const { setSelectedWorkout } = useWorkout();
  const { setExercises } = useExercises();
  const { setIntervals } = useIntervals();

  const handleCreateWorkout = async () => {
    const workoutName = prompt("Enter workout name:");
    if (!workoutName?.trim()) return;

    setIsCreating(true);
    try {
      // Create new workout with empty exercises and default intervals
      const newWorkout = createWorkout(
        workoutName.trim(),
        [], // empty exercises
        defaultIntervals, // default intervals
      );

      // Set as selected workout
      setSelectedWorkout(newWorkout);

      // Update contexts
      setExercises([]);
      setIntervals({
        rest: defaultIntervals.rest.toString(),
        longBreak: defaultIntervals.longBreak.toString()
      });

      // Add new workout to the list
      setSavedWorkouts((prev) => [...prev, newWorkout]);

    } catch (err) {
      console.error("Failed to create workout:", err);
      alert("Failed to create workout. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      onClick={handleCreateWorkout}
      disabled={isCreating}
      className="btn btn-primary mb-4"
    >
      {isCreating ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        "Create Workout"
      )}
    </button>
  );
};

export default CreateWorkoutButton;
