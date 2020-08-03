const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');
const auth = require('../middleware/auth');
const Cryptos = require('../models/cryptos');
const Fuse = require('fuse.js');
const StockSearch = require('stock-ticker-symbol');
const yf = require('yahoo-finance');
const { param, body, validationResult } = require('express-validator');

// public route for searching cryptos
router.get('/searchCrypto/:searchVal',
  [param('searchVal').trim().escape()],
  async (req, res) => {
    try {
      const cryptos = await Cryptos.find({});
      // fuse used to generate best matches for search query
      const fuse = new Fuse(cryptos[0].cryptos, { keys: ['name', 'symbol'] });
      const result = fuse.search(req.params.searchVal).slice(0, 12);
      res.status(200).json({ result });
    } catch(e) { res.sendStatus(500); }
});

// public route for searching stocks
router.get('/searchStock/:searchVal',
  [param('searchVal').trim().escape()],
  (req, res) => {
    // get search results from stock-ticker-symbol API then retrieve prices from yahoo-finance API
    const searchResult = StockSearch.search(req.params.searchVal);
    const promises = searchResult.map(stock => yf.quote({ symbol: stock.ticker, modules: ['price'] }));
    Promise.allSettled(promises).then(results => {
      results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
          if (!result.value.price.regularMarketPrice) {
            searchResult[i].price = '?';
          } else {
            searchResult[i].price = result.value.price.regularMarketPrice;
          }
        }
        else { searchResult[i].price = '?'; }
      });
      const result = searchResult.filter(stock => stock.price !== '?');
      res.status(200).json({ result });
    });
});

router.put('/updateStocks', auth,
  [body('data.*').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      if (req.body.quantity < 0) { throw 'err'; }
      if (req.body.data.identifier === 'Manual') {
        const manualStocks = [...portfolio.manualStocks];
        manualStocks.unshift({ ...req.body.data });
        portfolio.manualStocks = manualStocks;
      } else {
        const stocks = [...portfolio.stocks];
        const { value, price, ...data } = req.body.data;
        stocks.unshift(data);
        portfolio.stocks = stocks;
      }
      const result = await portfolio.save();
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

router.put('/changeStock', auth,
  [body('name').not().isEmpty().escape(),
  body('_id').escape(),
  body('symbol').not().isEmpty().escape(),
  body('identifier').not().isEmpty().escape(),
  body('quantity').isNumeric(),
  body('price').isNumeric(),
  body('value').isNumeric()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      if (req.body.quantity < 0) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const stocks = req.body.identifier === 'Manual' ? [...portfolio.manualStocks] :
      [...portfolio.stocks];
      const index = stocks.findIndex(stock => stock.name === req.body.name);
      stocks[index].name = req.body.name;
      stocks[index].symbol = req.body.symbol;
      stocks[index].quantity = req.body.quantity;
      if (req.body.identifier === 'Manual') {
        stocks[index].value = req.body.value;
        stocks[index].price = req.body.price;
        portfolio.manualStocks = stocks;
      } else { portfolio.stocks = stocks; }
      const result = await portfolio.save();
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

router.put('/changeCrypto', auth,
  [body('name').not().isEmpty().escape(),
  body('_id').escape(),
  body('symbol').not().isEmpty().escape(),
  body('identifier').not().isEmpty().escape(),
  body('quantity').isNumeric(),
  body('price').isNumeric(),
  body('value').isNumeric()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      if (req.body.quantity < 0) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const cryptos = req.body.identifier === 'Manual' ? [...portfolio.manualCryptos] :
      [...portfolio.cryptos];
      const index = cryptos.findIndex(crypto => crypto.name === req.body.name);
      cryptos[index].name = req.body.name;
      cryptos[index].symbol = req.body.symbol;
      cryptos[index].quantity = req.body.quantity;
      if (req.body.identifier === 'Manual') {
        cryptos[index].value = req.body.value;
        cryptos[index].price = req.body.price;
        portfolio.manualCryptos = cryptos;
      } else { portfolio.cryptos = cryptos; }
      const result = await portfolio.save();
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

router.put('/deleteStock', auth,
  [body('*').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const stocks = req.body.identifier === 'Manual' ? [...portfolio.manualStocks] :
      [...portfolio.stocks];
      const index = stocks.findIndex(stock => stock.name === req.body.name);
      stocks.splice(index, 1);
      if (req.body.identifier === 'Manual') { portfolio.manualStocks = [...stocks]; }
      else { portfolio.stocks = [...stocks]; }
      const result = await portfolio.save();
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

router.put('/deleteCrypto', auth,
  [body('*').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const cryptos = req.body.identifier === 'Manual' ? [...portfolio.manualCryptos] :
      [...portfolio.cryptos];
      const index = cryptos.findIndex(crypto => crypto.name === req.body.name);
      cryptos.splice(index, 1);
      if (req.body.identifier === 'Manual') { portfolio.manualCryptos = [...cryptos]; }
      else { portfolio.cryptos = [...cryptos]; }
      const result = await portfolio.save();
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

router.put('/updateCryptos', auth,
  [body('data.*').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      if (req.body.quantity < 0) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      if (req.body.data.identifier === 'Manual') {
        const manualCryptos = [...portfolio.manualCryptos];
        manualCryptos.unshift({ ...req.body.data });
        portfolio.manualCryptos = manualCryptos;
      } else {
        const cryptos = [...portfolio.cryptos];
        const { value, price, ...data } = req.body.data;
        cryptos.unshift(data);
        portfolio.cryptos = cryptos;
      }
      const result = await portfolio.save();
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

router.put('/addAsset', auth,
  [body('*').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const otherAssets = [...portfolio.otherAssets];
      otherAssets.unshift({ ...req.body });
      portfolio.otherAssets = otherAssets;
      const result = await portfolio.save();
      res.status(200).json({ assets: result.otherAssets });
    } catch(e) { res.sendStatus(500); }
});

router.put('/removeAsset', auth,
  [body('name').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const otherAssets = [...portfolio.otherAssets];
      const index = otherAssets.findIndex(asset => asset.name === req.body.name);
      otherAssets.splice(index, 1);
      portfolio.otherAssets = otherAssets;
      const result = await portfolio.save();
      res.status(200).json({ assets: result.otherAssets });
    } catch(e) { res.sendStatus(500); }
});

router.put('/addDebt', auth,
  [body('*').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const liabilities = [...portfolio.liabilities];
      liabilities.unshift({ ...req.body });
      portfolio.liabilities = liabilities;
      const result = await portfolio.save();
      res.status(200).json({ debts: result.liabilities  });
    } catch(e) { res.sendStatus(500); }
});

router.put('/removeDebt', auth,
  [body('name').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const liabilities = [...portfolio.liabilities];
      const index = liabilities.findIndex(debt => debt.name === req.body.name);
      liabilities.splice(index, 1);
      portfolio.liabilities = liabilities;
      const result = await portfolio.save();
      res.status(200).json({ debts: result.liabilities });
    } catch(e) { res.sendStatus(500); }
});

router.put('/updateAsset', auth,
  [body('*').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const otherAssets = [...portfolio.otherAssets];
      const index = otherAssets.findIndex(asset => asset.name === req.body.name);
      otherAssets[index].value = req.body.value;
      portfolio.otherAssets = otherAssets;
      const result = await portfolio.save();
      res.status(200).json({ assets: result.otherAssets });
    } catch(e) { res.sendStatus(500); }
});

router.put('/updateDebt', auth,
  [body('*').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const liabilities = [...portfolio.liabilities];
      const index = liabilities.findIndex(debt => debt.name === req.body.name);
      liabilities[index].value = req.body.value;
      portfolio.liabilities = liabilities;
      const result = await portfolio.save();
      res.status(200).json({ debts: result.liabilities });
    } catch(e) { res.sendStatus(500); }
});

module.exports = router;
