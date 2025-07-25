import React from "react";
import { useState } from "react";
import { useExercises } from "../../contexts/ExercisesContext";

const ExerciseForm = () => {
  const { addExercise, setExerciseInterval, exerciseInterval } = useExercises();
  const [name, setName] = useState("");

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
      setExerciseInterval(incrementedDelta);
    }
  };

  return (
    <form
      onSubmit={handleAddExercise}
      className="form-control gap-2 border border-gray-200 p-4 rounded"
    >
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
