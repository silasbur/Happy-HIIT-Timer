import ExercisesList from "../components/ExercisesList";
import ExerciseForm from "../components/ExerciseForm";
import { useExercises } from "../contexts/ExercisesContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useIntervals } from "../contexts/IntervalsContext";
import IntervalForm from "../components/IntervalForm";
import PageLayout from "../components/PageLayout";
import WorkoutTitleForm from "../components/WorkoutTitleForm";

function ConfigPage() {
  const { exercises } = useExercises();
  const { intervals, setIntervals } = useIntervals();
  const { inputs } = intervals;

  const updateIntervals = (values) => {
    setIntervals(values);
    // update local storage here
    localStorage.setItem("intervals", JSON.stringify(values));
  };

  const handleFormChange = (evt) => {
    const inputValues = { ...inputs, [evt.target.name]: evt.target.value };
    updateIntervals(inputValues);
  };

  const increment = (delta, name) => {
    const incrementedDelta = +inputs[name] + delta; // convert to string to number for addition
    const inputValues = { ...inputs, [name]: "" + incrementedDelta }; //convert to string
    if (incrementedDelta > 0) {
      updateIntervals(inputValues);
    }
  };

  const isMobile = window.innerwidth < 600;
  return (
    <PageLayout page="config">
      <WorkoutTitleForm />
      <div className="content-wrapper">
        <h2>Rest Intervals</h2>
        <IntervalForm
          inputVals={inputs}
          handleFormChange={handleFormChange}
          increment={increment}
        />
      </div>

      <div className="content-wrapper">
        <h2 className="py-2">Exercises</h2>
        <ExerciseForm />
      </div>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        {exercises.length ? <ExercisesList /> : null}
      </DndProvider>
    </PageLayout>
  );
}

export default ConfigPage;
