import { useExercises } from "../contexts/ExercisesContext";
import React, { useRef } from "react";
import truncate from "../shared/truncate";
import { useDrag, useDrop } from "react-dnd";
import { ReactComponent as GripIcon } from "../assets/grip.svg";

const DRAG_TYPE = "EXERCISE";

const reorder = (sourceIdx, destinationIdx, list) => {
  const result = [...list];
  const dragItem = list[sourceIdx];
  const [swappedOut] = result.splice(destinationIdx, 1, dragItem);
  result.splice(sourceIdx, 1, swappedOut);
  return result;
};

const ExercisesList = () => {
  const { exercises, setExercises } = useExercises();

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = exercises[dragIndex];

    if (dragItem) {
      const updatedExercises = reorder(dragIndex, hoverIndex, exercises);
      setExercises(updatedExercises);
    }
  };

  const [, drop] = useDrop(() => ({ accept: DRAG_TYPE }));

  return (
    <div className="overflow-x-auto py-2">
      <h3 className="text-lg">Exercise List</h3>
      <div ref={drop}>
        {exercises.map(({ name, time, id }, idx) => (
          <Exercise
            moveCardHandler={moveCardHandler}
            name={name}
            time={time}
            key={id}
            index={idx}
            id={id}
          />
        ))}
      </div>
    </div>
  );
};

export const Exercise = ({ name, id, time, index, moveCardHandler }) => {
  const { removeExercise } = useExercises();

  const handleRemove = () => {
    removeExercise(index);
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: DRAG_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves../..
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { index, name },
    type: DRAG_TYPE,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { id: droppedId, originalIndex } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCardHandler(droppedId, originalIndex);
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="border border-gray-300 flex justify-between my-2 p-3 bg-gray-50 text-charcoal rounded-md hover:bg-gray-100 hover:border-gray-400 transition-all duration-150 cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-left gap-4 items-center">
        <GripIcon />
        <span>
          <b>{truncate(name, 30)}</b>
        </span>
      </div>
      <div className="justify-right gap-4 flex">
        <span className="text-gray-600 text-sm font-medium">{time}s</span>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ExercisesList;
