const mongoose = require('mongoose');

const NetWorthData = new mongoose.Schema({
  date: String,
  value: Number
});

const NetWorthSchema = new mongoose.Schema({
  dataPoints: [NetWorthData],
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('NetWorth', NetWorthSchema);
