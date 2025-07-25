import React, { useEffect, useState } from "react";
import ExercisesList from "./ExercisesList";
import ExerciseForm from "./ExerciseForm";
import { useExercises } from "../../contexts/ExercisesContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import PageLayout from "../../components/PageLayout";
import { getSelectedWorkout, updateWorkout } from "../workouts/workouts.local";

const ExercisesPage = () => {
  const { exercises, setExercises } = useExercises();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Load selected workout from localStorage on mount
  useEffect(() => {
    const workout = getSelectedWorkout();
    if (workout) {
      setSelectedWorkout(workout);
      setWorkoutTitle(workout.title);
      setExercises(workout.exercises || []);
    }
  }, [setExercises]);

  // Update workout when exercises change
  useEffect(() => {
    if (selectedWorkout && exercises) {
      try {
        updateWorkout(selectedWorkout.id, { exercises });
      } catch (err) {
        console.error("Failed to update workout exercises:", err);
      }
    }
  }, [exercises, selectedWorkout]);

  // Update workout title
  const handleTitleSubmit = () => {
    if (selectedWorkout && workoutTitle.trim()) {
      try {
        const updatedWorkout = updateWorkout(selectedWorkout.id, { 
          title: workoutTitle.trim() 
        });
        setSelectedWorkout(updatedWorkout);
        setIsEditingTitle(false);
      } catch (err) {
        console.error("Failed to update workout title:", err);
      }
    }
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setWorkoutTitle(selectedWorkout?.title || "");
      setIsEditingTitle(false);
    }
  };

  const isMobile = window.innerwidth < 600;

  return (
    <PageLayout title="Exercises" page="exercises">
      {selectedWorkout && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="badge badge-primary badge-sm">Editing</span>
            {isEditingTitle ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={workoutTitle}
                  onChange={(e) => setWorkoutTitle(e.target.value)}
                  onKeyDown={handleTitleKeyPress}
                  className="input input-sm bg-white/80 text-primary flex-1"
                  autoFocus
                />
                <button
                  onClick={handleTitleSubmit}
                  className="btn btn-xs btn-primary"
                >
                  ✓
                </button>
                <button
                  onClick={() => {
                    setWorkoutTitle(selectedWorkout?.title || "");
                    setIsEditingTitle(false);
                  }}
                  className="btn btn-xs btn-ghost"
                >
                  ✕
                </button>
              </div>
            ) : (
              <h4 
                className="font-semibold text-primary cursor-pointer hover:text-primary/80 transition-colors"
                onClick={() => setIsEditingTitle(true)}
                title="Click to edit workout name"
              >
                {selectedWorkout.title}
              </h4>
            )}
          </div>
        </div>
      )}
      <ExerciseForm />
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        {exercises.length ? <ExercisesList /> : null}
      </DndProvider>
    </PageLayout>
  );
};

export default ExercisesPage;
