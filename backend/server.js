require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
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

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connection to database established');

    // listen for requests
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
