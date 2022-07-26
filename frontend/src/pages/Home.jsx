import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutEditForm from '../components/WorkoutEditForm';

const Home = () => {
  const { workouts, editedWorkout, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: data });
      }
    }

    if (user) fetchWorkouts();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
        {workouts?.length < 1 && (
          <h4>You haven't added any workouts yet...</h4>
        )}
      </div>
      {editedWorkout && <WorkoutEditForm workout={editedWorkout} />}
      {!editedWorkout && <WorkoutForm />}
    </div>
  );
}

export default Home;
