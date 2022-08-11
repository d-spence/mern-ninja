const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// static register method
userSchema.statics.register = async function(email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error ('Email is not valid');
  }

  const validatorPasswordOptions = {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  };

  if (!validator.isStrongPassword(password, validatorPasswordOptions)) {
    const { minLength } = validatorPasswordOptions;

    throw Error (`Password must be valid and contain at least ${minLength} characters`);
  }

  // check if the user email already exists
  const userExists = await this.findOne({ email });

  if (userExists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });

  return user;
}

module.exports = mongoose.model('User', userSchema);
