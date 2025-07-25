import ExercisesList from "../exercises/ExercisesList";
import truncate from "../../utils/truncate";
import { useState, useEffect } from "react";
import { useExercises } from "../../contexts/ExercisesContext";
import { useNavigate } from "react-router-dom";
import { useIntervals } from "../../contexts/IntervalsContext";
import PageLayout from "../../components/PageLayout";
import { 
  getSavedWorkouts, 
  getSelectedWorkout, 
  setSelectedWorkout, 
  importWorkoutFromJSON 
} from "./workouts.local";

const WorkoutPage = () => {
  const navigate = useNavigate();
  const [selectedWorkout, setSelectedWorkoutState] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [customWorkout, setCustomWorkout] = useState("");
  const [copied, setCopied] = useState(false);
  const { setExercises } = useExercises();
  const { setIntervals } = useIntervals();

  // Load workouts on mount
  useEffect(() => {
    const workouts = getSavedWorkouts();
    setSavedWorkouts(workouts);
    
    const selected = getSelectedWorkout();
    setSelectedWorkoutState(selected);
  }, []);

  function handleClick(workout) {
    setExercises(workout.exercises);
    setIntervals({
      rest: workout.rest,
      longBreak: workout.longbreak,
    });
    const selectedWorkout = setSelectedWorkout(workout);
    setSelectedWorkoutState(selectedWorkout);
  }

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

  const handleCustomWorkout = () => {
    try {
      const importedWorkout = importWorkoutFromJSON(customWorkout);
      
      setExercises(importedWorkout.exercises);
      setIntervals({
        rest: importedWorkout.rest,
        longBreak: importedWorkout.longbreak,
      });
      
      const selectedWorkout = setSelectedWorkout(importedWorkout);
      setSelectedWorkoutState(selectedWorkout);
      
      // Refresh saved workouts list
      setSavedWorkouts(getSavedWorkouts());
      
      setCustomWorkout("");
    } catch (err) {
      alert(err.message || "Invalid JSON format. Please check your input.");
    }
  };

  function jumpToTimerPage() {
    navigate("/timer");
  }

  return (
    <PageLayout title="Workout" page="workouts">
      {/* Custom Workout Section */}
      <div className="mb-6 p-4 border border-base-300 rounded-lg bg-base-50">
        <h3 className="text-lg font-semibold mb-3">Create Custom Workout</h3>
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

      {/* Selected Workout Display */}
      {selectedWorkout && (
        <div
          className="mb-4 p-4 bg-primary/10 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/15 transition-colors duration-200"
          onClick={jumpToTimerPage}
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
            <div className="flex items-center gap-2 text-primary">
              <span className="text-sm font-medium">Start Workout</span>
              <span className="text-lg">→</span>
            </div>
          </div>
          <p className="text-sm text-base-content/70">
            {selectedWorkout.exercises.length} exercises •{" "}
            {selectedWorkout.rest}s rest • {selectedWorkout.longbreak}s break
          </p>
        </div>
      )}

      {/* Saved Workouts */}
      <h3 className="text-lg font-semibold mb-3">Saved Workouts</h3>
      {savedWorkouts.length === 0 ? (
        <p className="text-base-content/60 text-center py-8">No saved workouts yet. Import a workout or create one!</p>
      ) : (
        savedWorkouts.map((workout) => {
          return (
            <div
              key={workout.id}
              onClick={() => handleClick(workout)}
              className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer mb-4 p-4 border-2 ${
                selectedWorkout?.id === workout.id
                  ? "border-primary/40 bg-primary/5"
                  : "border-base-300 hover:border-primary/50"
              }`}
            >
              <div className="card-body p-0">
                <h3
                  className={`card-title text-lg ${
                    selectedWorkout?.id === workout.id
                      ? "text-primary/80"
                      : "text-base-content"
                  }`}
                >
                  {workout.title}
                </h3>
                <p className="text-sm text-base-content/70">
                  {workout.exercises.length} exercises • {workout.rest}s rest •{" "}
                  {workout.longbreak}s break
                </p>
              </div>
            </div>
          );
        })
      )}
    </PageLayout>
  );
};

export default WorkoutPage;
