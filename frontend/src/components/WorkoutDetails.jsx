import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const dateCreated = new Date(workout.createdAt);

  const handleEditOnClick = () => {
    dispatch({ type: 'EDIT_WORKOUT_FORM', payload: workout });
  }

  const handleDeleteOnClick = async () => {
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
      <div className="buttons">
        <span
          className="material-symbols-outlined update"
          onClick={handleEditOnClick}
          title="edit workout">update
        </span>
        <span
          className="material-symbols-outlined delete"
          onClick={handleDeleteOnClick}
          title="delete workout">delete
        </span>
      </div>
    </div>
  );
}

export default WorkoutDetails;
