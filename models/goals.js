const mongoose = require('mongoose');

const ContribSchema = new mongoose.Schema({
  val: Number,
  date: String
});

const GoalSchema = new mongoose.Schema({
  isComplete: Boolean,
  name: String,
  goal: Number,
  date: String,
  contributions: [ContribSchema]
});

const GoalsSchema = new mongoose.Schema({
  netWorthGoal: Number,
  otherGoals: [GoalSchema],
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Goals', GoalsSchema);
