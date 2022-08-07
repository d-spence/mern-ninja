const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (lbs): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p><small>{workout.createdAt}</small></p>
    </div>
  );
}

export default WorkoutDetails;
