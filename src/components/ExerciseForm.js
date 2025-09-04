import { useEffect } from "react";
import { useState } from "react";
import { useExercises } from "../contexts/ExercisesContext";
import { updateWorkout } from "../shared/workouts.local";
import { useWorkout } from "../contexts/WorkoutContext";

const ExerciseForm = () => {
  const { exercises, addExercise, setExerciseInterval, exerciseInterval } =
    useExercises();
  const { selectedWorkout, setSelectedWorkout } = useWorkout();
  const [name, setName] = useState("");

  // Update workout when exercises change
  useEffect(() => {
    if (selectedWorkout && exercises) {
      try {
        const updatedWorkout = updateWorkout(selectedWorkout.id, { exercises });
        setSelectedWorkout(updatedWorkout);
      } catch (err) {
        console.error("Failed to update workout exercises:", err);
      }
    }
  }, [exercises, selectedWorkout, setSelectedWorkout]);

  const handleAddExercise = (evt) => {
    evt.preventDefault();
    if (name !== "") {
      addExercise({ name, time: +exerciseInterval });
      setName("");
    }
  };

  const increment = (delta) => {
    const incrementedDelta = +exerciseInterval + delta; // convert to number for addition
    if (incrementedDelta > 0) {
      setExerciseInterval(incrementedDelta + "");
    }
  };

  return (
    <form onSubmit={handleAddExercise} className="form-control gap-2">
      <div className="form-control">
        <label>
          <span className="label-text">Exercise name:</span>
        </label>
        <input
          minLength="1"
          maxLength="30"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          type="text"
          placeholder="Mountain Climbers"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <label>
          <span className="label-text">Exercise time:</span>
        </label>
        <div className="input-group">
          <button type="button" onClick={() => increment(-10)} className="btn ">
            -
          </button>
          <input
            value={exerciseInterval}
            onChange={(e) => setExerciseInterval(+e.target.value)}
            type="number"
            className="input input-bordered w-full"
          />
          <button type="button" className="btn" onClick={() => increment(+10)}>
            +
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-square w-full">
        Add Exercise
      </button>
    </form>
  );
};

export default ExerciseForm;
