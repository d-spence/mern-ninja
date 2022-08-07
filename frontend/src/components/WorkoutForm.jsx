import { useState } from 'react';

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState(0);
  const [error, setError] = useState(null);

  const resetForm = (resetError=true) => {
    setTitle('');
    setLoad('');
    setReps('');

    if (resetError) setError(null);
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
    } else if (response.ok) {
      resetForm();
      console.log('new workout added', data);
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label htmlFor="title">Exercise Title:</label>
      <input
        id="title"
        type="text"
        placeholder="Ex: Push Ups"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="load">Load (in lbs):</label>
      <input
        id="load"
        type="number"
        min="0"
        max="9999"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label htmlFor="reps">Reps:</label>
      <input
        id="reps"
        type="number"
        min="0"
        max="9999"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
