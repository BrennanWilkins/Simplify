const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  desc: String,
  val: String,
  date: String
});

const BudgetSchema = new mongoose.Schema({
  transactions: [TransactionSchema],
  category: String,
  budget: Number
});

const BudgetsSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: String,
  budgets: [BudgetSchema]
});

module.exports = mongoose.model('Budgets', BudgetsSchema);
