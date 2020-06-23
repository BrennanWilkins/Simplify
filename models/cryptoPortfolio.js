const mongoose = require('mongoose');

const CryptoPortfolioSchema = new mongoose.Schema({
  btc: { type: Number, required: true },
  eth: { type: Number, required: true },
  ltc: { type: Number, required: true },
  user: { type: String, required: true }
});

module.exports = mongoose.model('CryptoPortfolio', CryptoPortfolioSchema);
