import { useEffect, useState } from "react";
import { updateWorkout } from "../shared/workouts.local";
import { useWorkout } from "../contexts/WorkoutContext";

function WorkoutTitleForm() {
  const { setSelectedWorkout, selectedWorkout } = useWorkout();
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Load selected workout from localStorage on mount
  useEffect(() => {
    if (selectedWorkout) {
      setWorkoutTitle(selectedWorkout.title);
    }
  }, [selectedWorkout]);

  // Update workout title
  const handleTitleSubmit = () => {
    if (workoutTitle.trim()) {
      try {
        const updatedSelected = updateWorkout(selectedWorkout.id, {
          title: workoutTitle.trim(),
        });
        setSelectedWorkout(updatedSelected);
        setIsEditingTitle(false);
      } catch (err) {
        console.error("Failed to update workout title:", err);
      }
    }
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTitleSubmit();
    } else if (e.key === "Escape") {
      setWorkoutTitle(selectedWorkout?.title || "");
      setIsEditingTitle(false);
    }
  };

  return (
    <>
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
              </div>
            ) : (
              <h4
                className="font-semibold text-primary cursor-pointer hover:text-primary/80 transition-colors"
                onClick={() => setIsEditingTitle(true)}
                title="Click to edit workout name"
              >
                {workoutTitle}
              </h4>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default WorkoutTitleForm;
