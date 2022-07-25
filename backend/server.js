const express = require('express');
require('dotenv').config();

// express app init
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.method, req.path, req); // log requests
  next();
});

// routes
app.get('/', (req, res) => {
  res.json({msg: 'Welcome to the app'});
});

// listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});