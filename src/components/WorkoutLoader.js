import { useState } from "react";
import {
  getSavedWorkouts,
  importWorkoutFromJSON,
} from "../shared/workouts.local";
import { useExercises } from "../contexts/ExercisesContext";
import { useWorkout } from "../contexts/WorkoutContext";
import { useIntervals } from "../contexts/IntervalsContext";

function WorkoutLoader({ setSavedWorkouts }) {
  const [customWorkout, setCustomWorkout] = useState("");
  const [copied, setCopied] = useState(false);
  const { setExercises } = useExercises();
  const { setIntervals } = useIntervals();
  const { setSelectedWorkout } = useWorkout();

  const handleCustomWorkout = () => {
    try {
      const importedWorkout = importWorkoutFromJSON(customWorkout);

      setExercises(importedWorkout.exercises);
      setIntervals({
        rest: importedWorkout.rest,
        longBreak: importedWorkout.longbreak,
      });

      // Use context to set selected workout ID
      setSelectedWorkout(importedWorkout.id);

      // Refresh saved workouts list
      setSavedWorkouts(getSavedWorkouts());

      setCustomWorkout("");
    } catch (err) {
      alert(err.message || "Invalid JSON format. Please check your input.");
    }
  };

  const copyPrompt = async () => {
    try {
      const response = await fetch("/prompt-workout.md");
      const prompt = await response.text();
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy prompt: ", err);
      alert("Failed to copy prompt. Please try again.");
    }
  };

  return (
    <div className="mb-6 p-4 border border-base-300 rounded-lg bg-base-50">
      <h3 className="text-lg font-semibold mb-3">Prompt a Workout</h3>
      <div className="flex gap-2 mb-3">
        <button onClick={copyPrompt} className="btn btn-outline btn-sm">
          {copied ? "✓" : "📋"} {copied ? "Copied!" : "Copy Prompt"}
        </button>
      </div>
      <div className="form-control">
        <textarea
          value={customWorkout}
          onChange={(e) => setCustomWorkout(e.target.value)}
          placeholder="Paste JSON response here..."
          className="textarea textarea-bordered h-24"
        />
        <div className="mt-2">
          <button
            onClick={handleCustomWorkout}
            disabled={!customWorkout.trim()}
            className="btn btn-primary btn-sm"
          >
            Load Custom Workout
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutLoader;
