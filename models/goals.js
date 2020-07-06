const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema({
  netWorthGoal: Number,
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Goals', GoalsSchema);
