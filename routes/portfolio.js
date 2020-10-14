const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');
const auth = require('../middleware/auth');
const Cryptos = require('../models/cryptos');
const Fuse = require('fuse.js');
const yf = require('yahoo-finance');
const { param, body, validationResult } = require('express-validator');
const config = require('config');
const axios = require('axios');
const Stocks = require('../models/stocks');

// public route for searching cryptos
router.get('/searchCrypto/:searchVal',
  [param('searchVal').trim().escape()],
  async (req, res) => {
    try {
      const cryptos = await Cryptos.find({});
      // fuse used to generate best matches for search query
      const fuse = new Fuse(cryptos[0].cryptos, { keys: ['name', 'symbol'] });
      const result = fuse.search(req.params.searchVal).slice(0, 12).map(crypto => ({
        symbol: crypto.item.symbol,
        name: crypto.item.name,
        price: crypto.item.price,
        change: crypto.item.change,
        cmcID: crypto.item.cmcID
      }));
      res.status(200).json({ result });
    } catch(e) { res.sendStatus(500); }
});

// public route for searching stocks
router.get('/searchStock/:searchVal',
  [param('searchVal').trim().escape()],
  async (req, res) => {
    try {
      const stocks = await Stocks.findOne({ name: 'StockList' });
      // fuse used to generate best matches for search query
      const fuse = new Fuse(stocks.stocks, { keys: ['name', 'symbol'] });
      const searchRes = fuse.search(req.params.searchVal).slice(0, 12).map(stock => ({ symbol: stock.item.symbol, name: stock.item.name }));
      // make sure all stock match results are found in yahoo finance api and add prices
      const promises = searchRes.map(stock => yf.quote({ symbol: stock.symbol, modules: ['price', 'summaryDetail'] }));
      const pResults = await Promise.allSettled(promises);
      pResults.forEach((pResult, i) => {
        // if error set price/change as null
        if (pResult.status === 'fulfilled' && pResult.value && pResult.value.price &&
        pResult.value.summaryDetail && pResult.value.price.regularMarketPrice && pResult.value.summaryDetail.previousClose) {
          searchRes[i].price = pResult.value.price.regularMarketPrice;
          searchRes[i].change = ((searchRes[i].price - pResult.value.summaryDetail.previousClose) / pResult.value.summaryDetail.previousClose) * 100;
        }
        else { searchRes[i].price = '?'; searchRes[i].change = '?'; }
      });
      const result = searchRes.filter(stock => stock.price !== '?');
      res.status(200).json({ result });
    } catch(e) { res.sendStatus(500); }
});

router.put('/updateStocks', auth,
  [body('data.*').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      if (req.body.quantity < 0) { throw 'err'; }
      if (req.body.data.identifier === 'Manual') {
        if (req.body.data.name.length > 70 || req.body.data.symbol.length > 70) { throw 'err'; }
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
        if (req.body.data.name.length > 70 || req.body.data.symbol.length > 70) { throw 'err'; }
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
      if (!validationResult(req).isEmpty() || req.body.name.length > 70 || req.body.desc.length > 70) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const otherAssets = [...portfolio.otherAssets];
      otherAssets.unshift({ ...req.body });
      portfolio.otherAssets = otherAssets;
      const result = await portfolio.save();
      res.status(200).json({ assets: result.otherAssets });
    } catch(e) { res.sendStatus(500); }
});

router.put('/removeAsset', auth,
  [body('desc').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const otherAssets = [...portfolio.otherAssets];
      const index = otherAssets.findIndex(asset => asset.desc === req.body.desc);
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
      if (!validationResult(req).isEmpty() || req.body.name.length > 70 || req.body.desc.length > 70) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const liabilities = [...portfolio.liabilities];
      liabilities.unshift({ ...req.body });
      portfolio.liabilities = liabilities;
      const result = await portfolio.save();
      res.status(200).json({ debts: result.liabilities  });
    } catch(e) { res.sendStatus(500); }
});

router.put('/removeDebt', auth,
  [body('desc').not().isEmpty().escape()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const portfolio = await Portfolio.findOne({ userId: req.userId });
      const liabilities = [...portfolio.liabilities];
      const index = liabilities.findIndex(debt => debt.desc === req.body.desc);
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
      const index = otherAssets.findIndex(asset => asset.desc === req.body.desc);
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
      const index = liabilities.findIndex(debt => debt.desc === req.body.desc);
      liabilities[index].value = req.body.value;
      portfolio.liabilities = liabilities;
      const result = await portfolio.save();
      res.status(200).json({ debts: result.liabilities });
    } catch(e) { res.sendStatus(500); }
});

// public route for getting highest/lowest 7 day price change of stocks/cryptos in portfolio
router.post('/highlights',
  [body('stocks.*').trim().escape(),
  body('cryptos.*').trim().escape()],
  async (req, res) => {
    try {
      if (!req.body.stocks.length && !req.body.cryptos.length) { throw 'err'; }
      let highestStock = null; let lowestStock = null; let highestCrypto = null; let lowestCrypto = null;
      if (req.body.stocks.length) {
        const startDate = new Date(new Date().getTime() - (86400000 * 7));
        const endDate = new Date();
        // get historical data for past 7 days
        const yfResult = await yf.historical({ symbols: [...req.body.stocks], from: startDate, to: endDate });
        const changes = [];
        for (let symbol in yfResult) {
          // continue if stock not found
          if (!yfResult[symbol].length) { continue; }
          let change = ((yfResult[symbol][0].close - yfResult[symbol][yfResult[symbol].length - 1].close) / yfResult[symbol][yfResult[symbol].length - 1].close) * 100;
          changes.push({ symbol, change });
        }
        // sort price changes high to low
        if (changes.length > 1) { changes.sort((a,b) => b.change - a.change); }
        highestStock = changes.length > 0 ? changes[0] : null;
        lowestStock = changes.length > 1 ? changes[changes.length - 1] : null;
      }
      if (req.body.cryptos.length) {
        const cryptos = await Cryptos.find({});
        const changes = [];
        for (let symbol of req.body.cryptos) {
          let crypto = cryptos[0].cryptos.find(crypto => crypto.symbol === symbol);
          // if crypto not found continue
          if (!crypto) { continue; }
          changes.push({ symbol, change: crypto.change });
        }
        // sort price changes high to low
        if (changes.length > 1) { changes.sort((a,b) => b.change - a.change); }
        highestCrypto = changes.length > 0 ? changes[0] : null;
        lowestCrypto = changes.length > 1 ? changes[changes.length - 1] : null;
      }
      res.status(200).json({ highestStock, lowestStock, highestCrypto, lowestCrypto });
    } catch(e) { console.log(e); res.sendStatus(500); }
});

const getTickerNews = async query => {
  // get news from past week to today
  const startDate = new Date(new Date().getTime() - 604800000).toISOString().split('T')[0];
  const endDate = new Date().toISOString().split('T')[0];
  // retrieve both news & news sentiment analysis
  const newsUrl = `https://finnhub.io/api/v1/company-news?symbol=${query}&from=${startDate}&to=${endDate}&token=${config.get('FINNHUB_KEY2')}`;
  const sentimentUrl = `https://finnhub.io/api/v1/news-sentiment?symbol=${query}&token=${config.get('FINNHUB_KEY2')}`;
  const news = await axios.get(newsUrl, { json: true });
  const sentiment = await axios.get(sentimentUrl, { json: true });
  // check for valid response
  if (Array.isArray(news) && news.length === 0) { return 'not found'; }
  if (news.data.length === 0 || !sentiment.data.buzz) { return 'not found'; }
  if (news.status !== 200 || sentiment.status !== 200) { return 'error'; }
  return { news: news.data.slice(0, 20), sentiment: sentiment.data };
};

// public route for getting company news from finnhub api, must have access code
router.get('/news/:code/:query',
  [param('*').trim().escape()],
  async (req, res) => {
    // unauthorized
    if (req.params.code !== config.get('NEWS_CODE')) { return res.sendStatus(401); }
    try {
      const result = await getTickerNews(req.params.query).catch(err => { throw 'err'; });
      if (result === 'not found') { return res.sendStatus(400); }
      if (result === 'error') { throw 'err'; }
      const { news, sentiment } = result;
      res.status(200).json({ news, sentiment });
    } catch(e) { res.sendStatus(500); }
});

// private route for getting company news from finnhub api
router.get('/authNews/:query', auth,
  [param('*').trim().escape()],
  async (req, res) => {
    try {
      const result = await getTickerNews(req.params.query).catch(err => { throw 'err'; });
      if (result === 'not found') { return res.sendStatus(400); }
      if (result === 'error') { throw 'err'; }
      const { news, sentiment } = result;
      res.status(200).json({ news, sentiment });
    } catch(e) { res.sendStatus(500); }
});

const getGeneralNews = async () => {
  const newsUrl = `https://finnhub.io/api/v1/news?category=general&token=${config.get('FINNHUB_KEY2')}`;
  const news = await axios.get(newsUrl, { json: true });
  // check for valid response
  if (Array.isArray(news) && news.length === 0) { return 'error'; }
  if (news.data.length === 0 || news.status !== 200) { return 'error'; }
  return news.data.slice(0, 20);
};

// public route for getting general market news from finnhub api, must have access code
router.get('/generalNews/:code',
  [param('code').trim().escape()],
  async (req, res) => {
    // unauthorized
    if (req.params.code !== config.get('NEWS_CODE')) { return res.sendStatus(401); }
    try {
      const news = await getGeneralNews().catch(err => { throw 'err'; });
      if (news === 'error') { throw 'err'; }
      res.status(200).json({ news });
    } catch(e) { res.sendStatus(500); }
});

// private route for getting general market news from finnhub api
router.get('/authGeneralNews', auth,
  [param('code').trim().escape()],
  async (req, res) => {
    try {
      const news = await getGeneralNews().catch(err => { throw 'err'; });
      if (news === 'error') { throw 'err'; }
      res.status(200).json({ news });
    } catch(e) { res.sendStatus(500); }
});

const getAnalysis = async ticker => {
  const getUrl = mode => `https://finnhub.io/api/v1/stock/${mode}?symbol=${ticker}&token=${config.get('FINNHUB_KEY2')}`;
  // get recommendation trends, price target, & EPS surprises from finnhub API
  const recommendation = await axios.get(getUrl('recommendation'), { json: true });
  const target = await axios.get(getUrl('price-target'), { json: true });
  const earnings = await axios.get(getUrl('earnings'), { json: true });
  // check for valid response
  if (Array.isArray(recommendation) || Array.isArray(target) || Array.isArray(earnings)) { return 'not found'; }
  if (recommendation.status !== 200 || target.status !== 200 || earnings.status !== 200) { return 'error'; }
  return { recommendation: recommendation.data, target: target.data, earnings: earnings.data };
};

// public route for getting stock analysis, requires access code
router.get('/analysis/:code/:ticker',
  [param('*').trim().escape()],
  async (req, res) => {
    // unauthorized
    if (req.params.code !== config.get('NEWS_CODE')) { return res.sendStatus(401); }
    try {
      const result = await getAnalysis(req.params.ticker).catch(err => { throw 'err'; });
      if (result === 'not found') { return res.sendStatus(400); }
      if (result === 'error') { throw 'err'; }
      const { recommendation, target, earnings } = result;
      res.status(200).json({ recommendation, target, earnings });
    } catch(e) { res.sendStatus(500); }
});

// private route for getting stock analysis
router.get('/authAnalysis/:ticker', auth,
  [param('*').trim().escape()],
  async (req, res) => {
    try {
      const result = await getAnalysis(req.params.ticker).catch(err => { throw 'err'; });
      if (result === 'not found') { return res.sendStatus(400); }
      if (result === 'error') { throw 'err'; }
      const { recommendation, target, earnings } = result;
      res.status(200).json({ recommendation, target, earnings });
    } catch(e) { res.sendStatus(500); }
});

// public route for getting stock price/volume data for stock charts
router.get('/stockPriceData/:ticker',
  [param('*').trim().escape()],
  async (req, res) => {
    try {
      const endDate = new Date().toISOString().split('T')[0];
      // start date is 5 years from today
      const startDate = new Date(new Date().getTime() - 157680000000).toISOString().split('T')[0];
      const stockData = await yf.historical({ symbol: req.params.ticker, from: startDate, to: endDate, period: 'd' });
      // check for valid response
      if (stockData.length === 0) { return res.sendStatus(400); }
      res.status(200).json({ stockData });
    } catch(e) { res.sendStatus(500); }
});

// public route for getting cypto price/volume data for crypto charts
router.get('/cryptoPriceData/:ticker',
  [param('*').trim().escape()],
  async (req, res) => {
    try {
      const coinList = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      const cryptoMatch = coinList.data.find(coin => coin.symbol.toUpperCase() === req.params.ticker.toUpperCase());
      if (!cryptoMatch) { return res.sendStatus(400); }
      const cryptoData = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoMatch.id}/market_chart?vs_currency=usd&days=1825`);
      const data = [];
      const prices = cryptoData.data.prices;
      for (let i = 0; i < prices.length; i++) {
        data.push({ date: prices[i][0], price: prices[i][1], volume: cryptoData.data.total_volumes[i][1] });
      }
      res.status(200).json({ cryptoData: data });
    } catch(e) { res.sendStatus(500); }
});

module.exports = router;
