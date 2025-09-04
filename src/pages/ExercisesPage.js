import ExercisesList from "../components/ExercisesList";
import WorkoutTitleForm from "../components/WorkoutTitleForm";
import ExerciseForm from "../components/ExerciseForm";
import { useExercises } from "../contexts/ExercisesContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import PageLayout from "../components/PageLayout";

const ExercisesPage = () => {
  const { exercises } = useExercises();

  const isMobile = window.innerwidth < 600;

  return (
    <PageLayout title="Exercises" page="exercises">
      <WorkoutTitleForm />
      <ExerciseForm />
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        {exercises.length > 0 && <ExercisesList />}
      </DndProvider>
    </PageLayout>
  );
};

export default ExercisesPage;
