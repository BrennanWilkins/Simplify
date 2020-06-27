const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  quantity: Number
});

const otherSchema = new mongoose.Schema({
  name: String,
  desc: String,
  value: Number
});

const PortfolioSchema = new mongoose.Schema({
  cryptos: [assetSchema],
  stocks: [assetSchema],
  otherAssets: [otherSchema],
  liabilities: [otherSchema],
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
