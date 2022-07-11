import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { removeExercise } from './exercisesSlice';

const ExercisesList = () => {
  const exercises = useSelector((state) => state.exercises);

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
        <tbody>
          {exercises.map(({name, id}, idx) => (
            <Exercise name={name} key={id} count={idx+1}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export const Exercise = ({name, id, count}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeExercise(id))
  }

  return (
    <tr>
      <th>{count}</th>
      <td>{name}</td>
      <td><button className="btn btn-secondary" onClick={handleRemove} >X</button></td>
    </tr>
  )
}


export default ExercisesList;
