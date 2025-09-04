import { useState, useEffect } from "react";
import { useExercises } from "../contexts/ExercisesContext";
import { useIntervals } from "../contexts/IntervalsContext";
import { useWorkout } from "../contexts/WorkoutContext";
import PageLayout from "../components/PageLayout";
import WorkoutLoader from "../components/WorkoutLoader";
import SavedWorkoutCard from "../components/SavedWorkoutCard";
import CreateWorkoutButton from "../components/CreateWorkoutButton";
import { getSavedWorkouts } from "../shared/workouts.local";

const WorkoutPage = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const { setExercises } = useExercises();
  const { setIntervals } = useIntervals();
  const { setSelectedWorkout, selectedWorkout } = useWorkout();

  // Load workouts on mount
  useEffect(() => {
    const workouts = getSavedWorkouts();
    setSavedWorkouts(workouts);
  }, []);

  function handleClick(workout) {
    if (selectedWorkout?.id === workout.id) {
      setSelectedWorkout(null);
      return;
    }
    setExercises(workout.exercises);
    setIntervals({
      rest: workout.intervals?.rest?.toString() || "",
      longBreak: workout.intervals?.longBreak?.toString() || ""
    });
    setSelectedWorkout(workout);
  }

  return (
    <PageLayout title="Workout" page="workouts">

      {/* Saved Workouts */}
      {savedWorkouts.length !== 0 && (
        <h3 className="text-lg font-semibold mb-3">Workouts</h3>
      )}

      {savedWorkouts.map((workout) => (
        <SavedWorkoutCard
          key={workout.id}
          workout={workout}
          isSelected={selectedWorkout?.id === workout.id}
          onClick={handleClick}
        />
      ))}
      <CreateWorkoutButton
        setSavedWorkouts={setSavedWorkouts}
        to="/rest-intervals"
      />
      <WorkoutLoader setSavedWorkouts={setSavedWorkouts} />
    </PageLayout>
  );
};

export default WorkoutPage;
