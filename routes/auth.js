const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../models/user');
const { check, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const config = require('config');
const Cryptos = require('../models/cryptos');
const Portfolio = require('../models/portfolio');
const NetWorth = require('../models/netWorth');
const auth = require('../middleware/auth');
const yf = require('yahoo-finance');
const Goals = require('../models/goals');
const Budgets = require('../models/budgets');

const cmcOptions = { headers: { 'X-CMC_PRO_API_KEY': config.get('CRYPTO_KEY') }, json: true, gzip: true };
const cmcUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=399';

router.post('/login',
  [check('email').not().isEmpty().isEmail().normalizeEmail().escape(),
  check('password').trim().isLength({ min: 8, max: 100 }).escape()],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) { return res.status(400).json({ msg: 'Error in input fields.' }); }
    try {
      const user = await User.findOne({ email: req.body.email });
      // return 400 error if no user found
      if (!user) { return res.status(400).json({ msg: 'Incorrect email or password.' }); }
      const same = await bcryptjs.compare(req.body.password, user.password);
      // return 400 error if password incorrect
      if (!same) { return res.status(400).json({ msg: 'Incorrect email or password.' }); }
      // if remember me chosen then token expires in 7 days, else 1 hour
      const options = req.body.remember === 'false' ? { expiresIn: '1h' } : { expiresIn: '7d' };
      const token = await jwt.sign({ user }, config.get('AUTH_KEY'), options);
      const portfolio = await Portfolio.findOne({ userId: user._id }).lean();
      const netWorth = await NetWorth.findOne({ userId: user._id });
      if (!netWorth || !portfolio) { return res.status(404).json({ msg: 'Could not retrieve user data.' }); }
      const goals = await Goals.findOne({ userId: user._id }).lean();
      const budgets = await Budgets.findOne({ userId: user._id });
      const updatedStocks = [...portfolio.stocks];
      const promises = updatedStocks.map(stock => yf.quote({ symbol: stock.symbol, modules: ['price'] }));
      // await for all stock price requests to finish
      const pResults = await Promise.allSettled(promises);
      pResults.forEach((pResult, i) => {
        // if price not found set it as '?'
        if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
        else { updatedStocks[i].price = '?'; }
      });
      const combinedStocks = updatedStocks.concat([...portfolio.manualStocks]);
      // update cryptos if last updated >1hr ago else return the cryptos
      const cryptos = await Cryptos.findOne({ name: 'CryptoList' });
      let mappedCryptos;
      if (new Date().getTime() - new Date(cryptos.date).getTime() >= 3600000) {
        console.log('Updating cryptos...');
        const resp = await axios.get(cmcUrl, cmcOptions);
        mappedCryptos = resp.data.data.map(obj => ({ symbol: obj.symbol, name: obj.name, price: obj.quote.USD.price, change: obj.quote.USD.percent_change_7d }));
        const result = await Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: mappedCryptos }, {});
        console.log('Crypto update successful');
      } else { mappedCryptos = cryptos.cryptos; }
      // update portfolio values w current prices
      const updatedCryptos = [...portfolio.cryptos].map(crypto => {
        const matchingCrypto = mappedCryptos.find(data => data.name === crypto.name);
        if (!matchingCrypto) { return { ...crypto, value: '?' }; }
        return { ...crypto, price: matchingCrypto.price };
      }).concat([...portfolio.manualCryptos]);
      const updatedPortfolio = { ...portfolio, cryptos: updatedCryptos, stocks: combinedStocks };
      if (!budgets) { return res.status(200).json({ token, portfolio: updatedPortfolio, netWorth, goals }); }
      // if its a new month then reset all budget transactions
      if (new Date().getMonth() !== new Date(budgets.date).getMonth()) {
        budgets.date = String(new Date());
        for (let budget of budgets.budgets) { budget.transactions = []; }
        await budgets.save();
      }
      res.status(200).json({ token, portfolio: updatedPortfolio, netWorth, budgets: budgets.budgets, goals });
    } catch(e) { res.status(500).json({ msg: 'There was an error logging in.' }); }
});

router.post('/signup',
  [check('email').not().isEmpty().isEmail().normalizeEmail().escape(),
  check('password').trim().isLength({ min: 8, max: 100 }).escape(),
  check('confirmPassword').trim().isLength({ min: 8, max: 100 }).escape(),
  check('confirmPassword').custom((value, { req }) => value === req.body.password)],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) { return res.status(400).json({ msg: 'Error in input fields.' }); }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) { return res.status(400).json({ msg: 'Email already taken.' }); }
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      const newUser = new User({ email: req.body.email, password: hashedPassword });
      const saveRes = await newUser.save();
      // if remember clicked then token expires in 7 days else 1 hour
      const options = req.body.remember === 'false' ? { expiresIn: '1h' } : { expiresIn: '7d' };
      const token = await jwt.sign({ newUser }, config.get('AUTH_KEY'), options);
      const newPortfolio = new Portfolio({ cryptos: [], stocks: [], otherAssets: [],
        liabilities: [], manualCryptos: [], manualStocks: [], userId: newUser._id });
      const portfolio = await newPortfolio.save();
      const newNetWorth = new NetWorth({ dataPoints: [{ date: new Date(), value: 0}], userId: newUser._id });
      const netWorth = await newNetWorth.save();
      const newGoals = new Goals({ netWorthGoal: 0, otherGoals: [], userId: newUser._id });
      await newGoals.save();
      // update cryptos if last updated >1hr ago else return the cryptos
      const cryptos = await Cryptos.findOne({ name: 'CryptoList' });
      if (new Date(cryptos.date).getTime() - new Date().getTime() >= 3600000) {
        console.log('Updating cryptos...');
        const resp = await axios.get(cmcUrl, cmcOptions);
        const cmcCryptos = resp.data.data.map(obj => ({ symbol: obj.symbol, name: obj.name, price: obj.quote.USD.price, change: obj.quote.USD.percent_change_7d  }));
        const result = await Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: cmcCryptos }, {});
        console.log('Crypto update successful');
      }
      res.status(200).json({ token, netWorth, portfolio });
    }
    catch (e) { res.status(500).json({ msg: 'Failed signing up user.' }); }
});

router.get('/autoLogin', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId }).lean();
    const netWorth = await NetWorth.findOne({ userId: req.userId });
    if (!portfolio || !netWorth) { throw 'could not retrieve user data.'; }
    const goals = await Goals.findOne({ userId: req.userId }).lean();
    const budgets = await Budgets.findOne({ userId: req.userId });
    const cryptos = await Cryptos.findOne({ name: 'CryptoList' });
    const updatedStocks = [...portfolio.stocks];
    const promises = updatedStocks.map(stock => yf.quote({ symbol: stock.symbol, modules: ['price']}));
    // wait for all stock price requests to finish
    const pResults = await Promise.allSettled(promises);
    pResults.forEach((pResult, i) => {
      // if stock price not found then set price as '?'
      if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
      else { updatedStocks[i].price = '?'; }
    });
    const combinedStocks = updatedStocks.concat([...portfolio.manualStocks]);
    let mappedCryptos;
    // if cryptos last updated over 1 hr ago then update cryptos
    if (new Date().getTime() - new Date(cryptos.date).getTime() >= 3600000) {
      console.log('Updating cryptos...');
      const resp = await axios.get(cmcUrl, cmcOptions);
      mappedCryptos = resp.data.data.map(obj => ({ symbol: obj.symbol, name: obj.name, price: obj.quote.USD.price, change: obj.quote.USD.percent_change_7d  }));
      const result = await Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: mappedCryptos }, {});
      console.log('Crypto update successful');
    } else { mappedCryptos = cryptos.cryptos; }
    const updatedCryptos = [...portfolio.cryptos].map(crypto => {
      const matchingCrypto = mappedCryptos.find(data => data.name === crypto.name);
      if (!matchingCrypto) { return { ...crypto, value: '?' }; }
      return { ...crypto, price: matchingCrypto.price };
    }).concat([...portfolio.manualCryptos]);
    const updatedPortfolio = { ...portfolio, cryptos: updatedCryptos, stocks: combinedStocks };
    if (!budgets) { return res.status(200).json({ portfolio: updatedPortfolio, netWorth, goals }); }
    // if new month then reset budget transactions
    if (new Date().getMonth() !== new Date(budgets.date).getMonth()) {
      budgets.date = String(new Date());
      for (let budget of budgets.budgets) { budget.transactions = []; }
      await budgets.save();
    }
    res.status(200).json({ portfolio: updatedPortfolio, netWorth, budgets: budgets.budgets, goals });
  } catch(e) { res.sendStatus(500); }
});

router.post('/demoLogin', async (req, res) => {
  // for demo mode, retrieves stock prices for default demo portfolio
  try {
    const cryptos = await Cryptos.findOne({ name: 'CryptoList' });
    let mappedCryptos;
    if (new Date().getTime() - new Date(cryptos.date).getTime() >= 3600000) {
      console.log('Updating cryptos...');
      const resp = await axios.get(cmcUrl, cmcOptions);
      mappedCryptos = resp.data.data.map(obj => ({ symbol: obj.symbol, name: obj.name, price: obj.quote.USD.price, change: obj.quote.USD.percent_change_7d  }));
      const result = await Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: mappedCryptos }, {});
      console.log('Crypto update successful');
    } else { mappedCryptos = cryptos.cryptos; }
    const updatedCryptos = [...req.body.portfolio.cryptos].map(crypto => {
      const matchingCrypto = mappedCryptos.find(data => data.name === crypto.name);
      if (!matchingCrypto) { return { ...crypto, value: '?' }; }
      return { ...crypto, price: matchingCrypto.price };
    }).concat([...req.body.portfolio.manualCryptos]);
    const updatedStocks = [...req.body.portfolio.stocks];
    const promises = updatedStocks.map(stock => yf.quote({ symbol: stock.symbol, modules: ['price']}));
    const pResults = await Promise.allSettled(promises);
    pResults.forEach((pResult, i) => {
      if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
      else { updatedStocks[i].price = '?'; }
    });
    const combinedStocks = updatedStocks.concat([...req.body.portfolio.manualStocks]);
    const updatedPortfolio = { ...req.body.portfolio, cryptos: updatedCryptos, stocks: combinedStocks };
    res.status(200).json({ portfolio: updatedPortfolio });
  } catch (err) { res.sendStatus(500); }
});

module.exports = router;
