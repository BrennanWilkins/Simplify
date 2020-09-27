const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  price: Number,
  change: Number,
  cmcID: Number
});

const CryptosSchema = new mongoose.Schema({
  date: String,
  name: String,
  cryptos: [CryptoSchema]
});

module.exports = mongoose.model('Cryptos', CryptosSchema);
