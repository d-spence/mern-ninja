import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data });
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (lbs): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p><small>{workout.createdAt}</small></p>
      <span onClick={handleClick} title="delete workout">x</span>
    </div>
  );
}

export default WorkoutDetails;
