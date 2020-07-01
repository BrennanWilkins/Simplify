const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');
const auth = require('../middleware/auth');
const Cryptos = require('../models/cryptos');
const Fuse = require('fuse.js');
const StockSearch = require('stock-ticker-symbol');
const yf = require('yahoo-finance');

router.get('/searchCrypto/:searchVal', auth, (req, res, next) => {
  Cryptos.find({}, (err, cryptos) => {
    if (err) { return res.status(500).json({ msg: 'Failed retrieving cryptos.' }); }
    const fuse = new Fuse(cryptos[0].cryptos, { keys: ['name', 'symbol'] });
    const result = fuse.search(req.params.searchVal).slice(0, 12);
    return res.status(200).json({ result });
  });
});

router.get('/searchStock/:searchVal', auth, (req, res, next) => {
  const searchResult = StockSearch.search(req.params.searchVal);
  const promises = [];
  searchResult.forEach(stock => {
    promises.push(yf.quote({ symbol: stock.ticker, modules: ['price']}));
  });
  Promise.allSettled(promises).then(results => {
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') { searchResult[i].price = result.value.price.regularMarketPrice; }
      else { searchResult[i].price = '?'; }
    });
    const result = searchResult.filter(stock => stock.price !== '?');
    return res.status(200).json({ result });
  });
});

router.put('/updateStocks', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Error updating stocks.' }); }
    const stocks = [...portfolio.stocks];
    stocks.unshift({ name: req.body.data.name, symbol: req.body.data.symbol, quantity: req.body.data.quantity });
    portfolio.stocks = stocks;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating stocks.' }); }
      return res.status(200).json({ msg: 'Success' });
    });
  });
});

router.put('/changeStock', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Error updating stocks.' }); }
    const stocks = [...portfolio.stocks];
    const index = stocks.findIndex(stock => stock.name === req.body.name);
    stocks[index].name = req.body.name;
    stocks[index].symbol = req.body.symbol;
    stocks[index].quantity = req.body.quantity;
    portfolio.stocks = stocks;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating stocks.' }); }
      return res.status(200).json({ msg: 'Success', result: result.stocks });
    });
  });
});

router.put('/changeCrypto', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Error updating cryptos.' }); }
    const cryptos = [...portfolio.cryptos];
    const index = cryptos.findIndex(crypto => crypto.name === req.body.name);
    cryptos[index].name = req.body.name;
    cryptos[index].symbol = req.body.symbol;
    cryptos[index].quantity = req.body.quantity;
    portfolio.cryptos = cryptos;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating cryptos.' }); }
      return res.status(200).json({ msg: 'Success', result: result.cryptos });
    });
  });
});

router.put('/updateCryptos', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Error updating cryptos.' }); }
    const cryptos = [...portfolio.cryptos];
    cryptos.unshift({ name: req.body.data.name, symbol: req.body.data.symbol, quantity: req.body.data.quantity });
    portfolio.cryptos = cryptos;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating cryptos.' }); }
      return res.status(200).json({ msg: 'Success' });
    });
  });
});

module.exports = router;
