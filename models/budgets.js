const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  transactions: [],
  category: String,
  budget: Number,
  remaining: Number
});

const BudgetsSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: String,
  budgets: [BudgetSchema]
});

module.exports = mongoose.model('Budgets', BudgetsSchema);
