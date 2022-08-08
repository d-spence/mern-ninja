import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const dateCreated = new Date(workout.createdAt);

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data });
      toast.error('Workout was deleted!');
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (lbs): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p className="date">
        Added {formatDistanceToNow(dateCreated, {
          addSuffix: true,
          includeSeconds: true,
        })} ({format(dateCreated, 'MM.dd.yy')})
      </p>
      <span
        className="material-symbols-outlined"
        onClick={handleClick}
        title="delete workout">delete
      </span>
    </div>
  );
}

export default WorkoutDetails;
