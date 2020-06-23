const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, max: 40},
  password: {type: String, required: true, max: 40}
});

module.exports = mongoose.model('User', UserSchema);
