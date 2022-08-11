const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
