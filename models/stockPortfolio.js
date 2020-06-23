const mongoose = require('mongoose');

const StockPortfolioSchema = new mongoose.Schema({
  aapl: { type: Number, required: true },
  googl: { type: Number, required: true },
  msft: { type: Number, required: true },
  amzn: { type: Number, required: true },
  spy: { type: Number, required: true },
  user: { type: String, required: true }
});

module.exports = mongoose.model('StockPortfolio', StockPortfolioSchema);
