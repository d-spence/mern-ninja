import { useState } from 'react';
import { toast } from 'react-toastify';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('0');
  const [reps, setReps] = useState('0');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const resetForm = () => {
    setTitle('');
    setLoad('0');
    setReps('0');
    setError(null);
    setEmptyFields([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    } else if (response.ok) {
      resetForm();
      dispatch({ type: 'CREATE_WORKOUT', payload: data });
      toast.success('Workout was created!');
    }
  }

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label htmlFor="title">Exercise Title:</label>
      <input
        id="title"
        type="text"
        placeholder="Ex: Push Ups"
        className={emptyFields.includes('title') ? 'error' : ''}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="load">Load (in lbs):</label>
      <input
        id="load"
        type="number"
        min="0"
        max="9999"
        className={emptyFields.includes('load') ? 'error' : ''}
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label htmlFor="reps">Reps:</label>
      <input
        id="reps"
        type="number"
        min="0"
        max="9999"
        className={emptyFields.includes('reps') ? 'error' : ''}
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
