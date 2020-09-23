const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  rating: Number,
  msg: String,
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
