import IntervalForm from "../components/IntervalForm";
import PageLayout from "../components/PageLayout";
import WorkoutTitleForm from "../components/WorkoutTitleForm";

/*
- Time per interval
- Rest time per interval

*/

const IntervalsPage = () => {
  return (
    <PageLayout title="Timing" page="intervals">
      <div className="content-wrapper">
        <WorkoutTitleForm />
        <IntervalForm />
      </div>
    </PageLayout>
  );
};

export default IntervalsPage;
