const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

// get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: 'No workouts found' });
  }
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('No such workout');
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      throw new Error('No such workout');
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // check if input fields are empty
  let emptyFields = [];

  if (!title) emptyFields.push('title');
  if (!(load + '')) emptyFields.push('load'); // convert number to string in case of 0 value
  if (!(reps + '')) emptyFields.push('reps');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Could not create workout' });
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('No such workout');
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      throw new Error('No such workout');
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// update a workout
const updateWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const { id } = req.params;

  // check if input fields are empty
  let emptyFields = [];

  if (!title) emptyFields.push('title');
  if (!(load + '')) emptyFields.push('load'); // convert number to string in case of 0 value
  if (!(reps + '')) emptyFields.push('reps');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('No such workout');
    }

    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    if (!workout) {
      throw new Error('No such workout');
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
}
