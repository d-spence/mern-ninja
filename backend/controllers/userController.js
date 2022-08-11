const User = require('../models/userModel');

// login user
const loginUser = async (req, res) => {
  res.status(501).json({ msg: 'NOT IMPLEMENTED: login user' });
}

// register user
const registerUser = async (req, res) => {
  res.status(501).json({ msg: 'NOT IMPLEMENTED: register user' });
}

module.exports = {
  loginUser,
  registerUser,
}
