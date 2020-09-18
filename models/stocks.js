const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  symbol: String,
  name: String
});

const StocksSchema = new mongoose.Schema({
  date: String,
  name: String,
  stocks: [StockSchema]
});

module.exports = mongoose.model('Stocks', StocksSchema);
