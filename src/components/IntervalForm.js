import { useIntervals } from "../contexts/IntervalsContext";
import { updateWorkout } from "../shared/workouts.local";
import { useWorkout } from "../contexts/WorkoutContext";

const IntervalForm = () => {
  const { intervals, setIntervals } = useIntervals();
  const { selectedWorkout, setSelectedWorkout } = useWorkout();

  const handleFormChange = (evt) => { 
    const updatedIntervals = {
      ...intervals,
      [evt.target.name]: evt.target.value,
    };
    setIntervals(updatedIntervals);
  };

  const increment = (delta, name) => {
    const incrementedDelta = +intervals[name] + delta; // convert to string to number for addition
    const inputValues = { ...intervals, [name]: "" + incrementedDelta }; //convert to string
    console.log(inputValues);
    setIntervals(inputValues);
    if (selectedWorkout) {
      // Convert strings back to numbers for storage
      const intervalsAsNumbers = {
        rest: Number(inputValues.rest) || 0,
        longBreak: Number(inputValues.longBreak) || 0
      };
      const updatedWorkout = updateWorkout(selectedWorkout.id, { intervals: intervalsAsNumbers });
      setSelectedWorkout(updatedWorkout);
    }
  };

  return (
    <>
      <IntervalInput
        value={intervals.rest}
        handleFormChange={handleFormChange}
        increment={increment}
        name="rest"
        label="Rest between exercises"
      />

      <IntervalInput
        value={intervals.longBreak}
        handleFormChange={handleFormChange}
        increment={increment}
        name="longBreak"
        label="Rest between rounds"
      />
    </>
  );
};

export const IntervalInput = ({
  increment,
  handleFormChange,
  value,
  name,
  label,
}) => {
  return (
    <>
      <div className="form-control py-2">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="input-group">
          <button onClick={() => increment(-10, name)} className="btn ">
            -
          </button>
          <input
            value={value}
            onChange={handleFormChange}
            name={name}
            type="number"
            className="input input-bordered w-full"
          />
          <button className="btn" onClick={() => increment(+10, name)}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default IntervalForm;
