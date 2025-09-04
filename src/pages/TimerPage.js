import React, {
  useMemo,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useExercises } from "../contexts/ExercisesContext";
import { useIntervals } from "../contexts/IntervalsContext";
import { useWorkout } from "../contexts/WorkoutContext";
import shortBeep from "../assets/shortAlert.mp3";
import longBeep from "../assets/longAlert.mp3";
import PageLayout from "../components/PageLayout";
import truncate from "../shared/truncate";

const TimerPage = () => {
  const { exercises, exerciseInterval } = useExercises();
  const { intervals } = useIntervals();
  const { selectedWorkout } = useWorkout();

  const workoutName = selectedWorkout?.title || "Custom Workout";
  const [time, setTime] = useState(null);
  const [icount, setIcount] = useState(0);
  const [pcount, setPcount] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [isSoundOn, setSound] = useState(true);
  const longAlert = useRef(new Audio(longBeep));
  const shortAlert = useRef(new Audio(shortBeep));

  // Calculate the complete sequence of phases
  const phaseSequence = useMemo(() => {
    const exerciseCount = exercises.length || 5;
    const intervalTimes = {
      rest: Number(intervals.rest) || 0,
      longBreak: Number(intervals.longBreak) || 0
    };

    const sequence = [];

    for (let i = 0; i < exerciseCount; i++) {
      // Add work phase with exercise
      sequence.push({
        key: "work",
        exercise: exercises?.[i]?.name ?? i,
        time: exercises?.[i]?.time || exerciseInterval,
      });
      if (i < exerciseCount - 1) {
        // Add rest
        sequence.push({
          key: "rest",
          time: intervalTimes.rest,
        });
      }
    }

    // Add long break at the end if configured
    if (intervalTimes.longBreak) {
      sequence.push({
        key: "longBreak",
        time: intervalTimes.longBreak,
      });
    }

    return sequence;
  }, [exercises, intervals, exerciseInterval]);

  const toggleRunning = () => {
    setRunning((isRunning) => !isRunning);
  };

  const reset = useCallback(() => {
    setRunning(false);
    setPcount(0);
    setIcount(0);
    // Reset to first phase time
    if (phaseSequence.length > 0) {
      setTime(phaseSequence[0].time);
    }
  }, [phaseSequence]);

  const skipToNext = useCallback(() => {
    if (phaseSequence.length > 0) {
      const newPcount = (pcount + 1) % phaseSequence.length;
      setPcount(newPcount);

      // Update icount if we're moving to a new exercise
      if (phaseSequence[newPcount].key === "work") {
        setIcount((prev) => prev + 1);
      }

      setTime(phaseSequence[newPcount].time);
    }
  }, [phaseSequence, pcount]);

  const currPhase = useMemo(() => {
    if (!phaseSequence.length) return {};
    const phaseIndex = pcount % phaseSequence.length;
    return phaseSequence[phaseIndex];
  }, [phaseSequence, pcount]);

  const nextPhase = useMemo(() => {
    if (!phaseSequence.length) return {};
    const phaseIndex = (pcount + 1) % phaseSequence.length;
    return phaseSequence[phaseIndex];
  }, [phaseSequence, pcount]);

  // Set phase and time after phaseSquence load
  useEffect(() => {
    setTime(currPhase?.time ?? null);
  }, [currPhase]);

  const playSounds = useCallback(
    (time) => {
      if (isRunning) {
        if (time === 4 || time === 3 || time === 2) {
          shortAlert.current.play();
        }
        if (time === 1) {
          longAlert.current.play();
        }
      }
    },
    [isRunning],
  );

  // listen to timer
  useEffect(() => {
    if (isSoundOn && time <= 5) {
      playSounds(time, isRunning);
    }
    if (time !== null && time < 1) {
      // triggering from default values

      if (nextPhase.key !== "work") {
        setIcount(icount + 1);
      }

      setTime(nextPhase.time);
      setPcount((prev) => prev + 1);
    }
  }, [
    time,
    icount,
    intervals,
    exercises.length,
    isRunning,
    isSoundOn,
    playSounds,
    currPhase,
    nextPhase,
  ]);

  const tick = () => {
    setTime((time) => time - 1);
  };

  // set phase timer
  useEffect(() => {
    // handle pauses
    if (isRunning) {
      const id = setInterval(tick, 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [isRunning]);

  const progressColor = useMemo(
    () => (currPhase.key === "rest" ? "accent" : "info"),
    [currPhase],
  );

  const textDecoration = useMemo(
    () => (isSoundOn ? null : "line-through"),
    [isSoundOn],
  );

  const progress = useMemo(() => {
    if (
      time === null ||
      !phaseSequence.length ||
      pcount >= phaseSequence.length
    ) {
      return 0;
    }
    return (time / currPhase.time) * 100;
  }, [time, currPhase, pcount, phaseSequence]);
  return (
    <PageLayout page="timer" title={workoutName}>
      {time === null ? null : (
        <div className="content-wrapper">
          <progress
            className={`progress progress-${progressColor} h-full`}
            value={progress}
            max="100"
          ></progress>
          <div className="text-9xl flex">
            <div className="w-3/12 flex justify-end items-center text-2xl"></div>
            <div className="flex grow justify-center items-center">
              {Math.ceil(time)}
            </div>
            <div className="w-3/12 flex justify-center items-center text-xl">
              {currPhase && currPhase.key === "longBreak"
                ? "BREAK"
                : currPhase.key.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col gap-2 my-4">
            {exercises.length ? (
              <div className="w-full relative">
                <div className="w-full h-16 flex items-center line-height-64 text-2xl">
                  <div className="w-9/12 h-full text-center bg-gray-100 text-charcoal flex items-center justify-center">
                    {(() => {
                      // During rest phases, show the next exercise
                      const isRestPhase = currPhase.key === "rest" || currPhase.key === "longBreak";
                      const displayIndex = isRestPhase ? (icount + 1) % exercises.length : icount % exercises.length;
                      const exerciseName = exercises[displayIndex]?.name || `Exercise ${displayIndex + 1}`;
                      return truncate(exerciseName, 20);
                    })()}
                  </div>
                  <div className="w-3/12 h-full text-center bg-gray-200 text-charcoal flex items-center justify-center">
                    {(() => {
                      // During rest phases, show the next exercise number
                      const isRestPhase = currPhase.key === "rest" || currPhase.key === "longBreak";
                      const displayCount = isRestPhase ? (icount + 1) % exercises.length + 1 : icount % exercises.length + 1;
                      return displayCount + "/" + exercises.length;
                    })()}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex justify-around my-4">
            <button
              className="btn btn-primary rounded-none"
              onClick={() => toggleRunning()}
            >
              {isRunning ? "Pause" : "Play"}
            </button>
            <button className="btn btn-secondary rounded-none" onClick={reset}>
              Reset
            </button>
            <button
              className="btn btn-accent rounded-none"
              onClick={skipToNext}
              disabled={phaseSequence.length === 0}
            >
              Next
            </button>
            <button
              className={`${textDecoration} btn rounded-none`}
              onClick={() => setSound((s) => !s)}
            >
              Sound
            </button>
          </div>

          {/* Exercise Roadmap - Only show upcoming phases */}
          {phaseSequence.length > 0 && (
            <div className="mt-6 w-full">
              <h4 className="text-lg font-semibold mb-3 text-center">
                {workoutName}
              </h4>
              <div className="flex flex-col gap-2">
                {phaseSequence.map((phase, index) => {
                  const isCurrentPhase = index === pcount % phaseSequence.length;
                  const isCompletedPhase = index < pcount % phaseSequence.length;
                  const isRestPhase = phase.key === "rest" || phase.key === "longBreak";
                  
                  // Don't render completed phases
                  if (isCompletedPhase) return null;
                  
                  // Calculate exercise number for work phases
                  const exerciseNumber = Math.floor(index / 2) + 1;
                  
                  return (
                    <div
                      key={`${phase.key}-${index}`}
                      className={`w-full p-3 rounded-lg border transition-all duration-500 ${
                        isCurrentPhase
                          ? isRestPhase 
                            ? `bg-success text-success-content border-success shadow-lg ${isRunning ? 'animate-pulse scale-105' : ''}`
                            : `bg-primary text-primary-content border-primary shadow-lg ${isRunning ? 'animate-pulse scale-105' : ''}`
                          : isRestPhase
                            ? "bg-success/10 text-success-content border-success/20"
                            : "bg-base-200 text-base-content border-base-300"
                      } ${isCurrentPhase && isRunning ? 'transform transition-transform duration-1000' : ''}`}
                      style={isCurrentPhase && isRunning ? {
                        animation: 'pulse-scale 2s ease-in-out infinite'
                      } : {}}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {!isRestPhase && (
                            <span className="text-sm font-bold">
                              {exerciseNumber}
                            </span>
                          )}
                          <span className="font-medium">
                            {isRestPhase 
                              ? phase.key === "longBreak" ? "Long Break" : "Rest"
                              : typeof phase.exercise === 'string' ? phase.exercise : "Work"
                            }
                          </span>
                        </div>
                        <div className="text-sm font-medium">
                          {phase.time}s
                        </div>
                      </div>
                    </div>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default TimerPage;
