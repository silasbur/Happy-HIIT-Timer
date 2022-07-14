import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeExercise, setExercises } from './exercisesSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (sourceIdx, destinationIdx, list) => {
  const result = [...list];
  const [removed] = result.splice(sourceIdx, 1);
  result.splice(destinationIdx, 0, removed);
  return result;
};

const ExercisesList = () => {
  const exercises = useSelector((state) => state.exercises);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const newExercises = reorder(
      result.source.index,
      result.destination.index,
      exercises
    );
    dispatch(setExercises(newExercises));
  };

  return (
    <div className="overflow-x-auto py-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {exercises.map(({ name, id }, idx) => (
                  <Exercise name={name} key={id} idx={idx} id={id} />
                ))}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </div>
  );
};

export const Exercise = ({ name, id, idx }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeExercise(idx));
  };

  return (
    <Draggable draggableId={id} index={idx}>
      {(provided) => {
        return (
          <tr
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <th>{idx + 1}</th>
            <td>{name}</td>
            <td>
              <button className="btn btn-secondary" onClick={handleRemove}>
                X
              </button>
            </td>
          </tr>
        );
      }}
    </Draggable>
  );
};

export default ExercisesList;
