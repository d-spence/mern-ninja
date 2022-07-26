require('dotenv').config();
const express = require('express');
const workoutRoutes = require('./routes/workouts');

// express app init
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path, req); // log requests
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});