const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  quantity: Number,
  identifier: String
});

const manualAssetSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  quantity: Number,
  price: Number,
  value: Number,
  identifier: String
});

const otherSchema = new mongoose.Schema({
  name: String,
  desc: String,
  value: Number
});

const PortfolioSchema = new mongoose.Schema({
  cryptos: [assetSchema],
  manualCryptos: [manualAssetSchema],
  manualStocks: [manualAssetSchema],
  stocks: [assetSchema],
  otherAssets: [otherSchema],
  liabilities: [otherSchema],
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
