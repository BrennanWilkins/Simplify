const mongoose = require('mongoose');

const TempUserSchema = new mongoose.Schema({
  dateCreated: Number,
  cryptoId: String,
  email: String,
  pass: String
});

module.exports = mongoose.model('TempUser', TempUserSchema);
