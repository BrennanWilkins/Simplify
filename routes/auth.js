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
const TempUser = require('../models/tempUser');
const { v4: uuid } = require('uuid');
const nodemailer = require('nodemailer');
const Stocks = require('../models/stocks');
const Feedback = require('../models/feedback');

const updateCryptos = async (portCryptos, portManuals) => {
  // update cryptos if last updated >1hr ago else return the cryptos
  const cryptos = await Cryptos.findOne({ name: 'CryptoList' });
  let mappedCryptos;
  if (new Date().getTime() - new Date(cryptos.date).getTime() >= 3600000) {
    console.log('Updating cryptos...');
    const cmcOptions = { headers: { 'X-CMC_PRO_API_KEY': config.get('CRYPTO_KEY') }, json: true, gzip: true };
    const cmcUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=399';
    const resp = await axios.get(cmcUrl, cmcOptions);
    mappedCryptos = resp.data.data.map(obj => ({
      cmcID: obj.id,
      symbol: obj.symbol,
      name: obj.name,
      price: obj.quote.USD.price,
      change: obj.quote.USD.percent_change_7d
    }));
    // update the date and cryptos in mongoDB
    const result = await Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: mappedCryptos }, {});
    console.log('Crypto update successful');
  } else { mappedCryptos = cryptos.cryptos; }
  // update portfolio values w current prices
  const updatedCryptos = portCryptos.map(crypto => {
    const matchingCrypto = mappedCryptos.find(data => data.name === crypto.name);
    if (!matchingCrypto) { return { ...crypto, value: '?' }; }
    return { ...crypto, price: matchingCrypto.price };
  }).concat(portManuals);
  return updatedCryptos;
};

const updateStocks = async () => {
  // update stock directory if hasn't been updated in over 1 day
  const stocks = await Stocks.findOne({ name: 'StockList' });
  if (new Date().getTime() - new Date(stocks.date).getTime() >= 86400000) {
    console.log('Updating stocks...');
    const url = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${config.get('FINNHUB_KEY')}`;
    const allStocks = await axios.get(url, { json: true });
    const mappedStocks = allStocks.data.map(stock => ({ name: stock.description, symbol: stock.displaySymbol }));
    await Stocks.findOneAndUpdate({ name: 'StockList' }, { date: new Date(), stocks: mappedStocks }, {});
    console.log('Stock update successful');
  }
};

const getStockPrices = async stocks => {
  const promises = stocks.map(stock => yf.quote({ symbol: stock.symbol, modules: ['price'] }));
  // await for all stock price requests to finish
  const pResults = await Promise.allSettled(promises);
  pResults.forEach((pResult, i) => {
    // if price not found set it as '?'
    if (pResult.status === 'fulfilled' && pResult.value && pResult.value.price) { stocks[i].price = pResult.value.price.regularMarketPrice; }
    else { stocks[i].price = '?'; }
  });
  return stocks;
};

const deleteOldTempUsers = async () => {
  // delete all temporary users w dateCreated greater than 3 hours ago
  await TempUser.deleteMany({ dateCreated: { "$gte": new Date().getTime() } });
};

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
      const updatedStocks = await getStockPrices([...portfolio.stocks]);
      const combinedStocks = updatedStocks.concat([...portfolio.manualStocks]);
      await deleteOldTempUsers().catch(err => { throw 'err'; });
      await updateStocks().catch(err => { throw 'err'; });
      // update portfolio w current stock/crypto prices
      const updatedCryptos = await updateCryptos([...portfolio.cryptos], [...portfolio.manualCryptos]).catch(err => { throw 'err'; });
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
      const existingUser = await User.findOne({ email: req.body.email });
      const existingTempUser = await TempUser.findOne({ email: req.body.email });
      // if temporary user or current user has same email, return error
      if (existingUser || existingTempUser) { return res.status(400).json({ msg: 'That email is already taken.' }); }
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      const cryptoId = uuid();
      // send email to provided email address to verify user
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        tls: { rejectUnauthorized: false },
        auth: { user: config.get('SIMPLIFY_EMAIL'), pass: config.get('SIMPLIFY_PASS') }
      });
      // const hRef = `https://simplify.herokuapp.com/api/auth/validateSignup/${cryptoId}`;
      const hRef = `http://localhost:9000/api/auth/validateSignup/${cryptoId}`;
      const mailOptions = {
        from: config.get('SIMPLIFY_EMAIL'),
        to: req.body.email,
        subject: 'Verify your email address - Simplify',
        html: `<h2>Click the link below to verify your email.</h2><p><a href="${hRef}">Verify link</a></p>`
      };
      await transporter.sendMail(mailOptions);
      // create new temporary user
      const newTempUser = new TempUser({ email: req.body.email, pass: hashedPassword, dateCreated: new Date().getTime() - 10800000, cryptoId });
      await newTempUser.save();
      res.sendStatus(200);
    }
    catch (e) { res.status(500).json({ msg: 'There was an error signing up.' }); }
});

router.get('/validateSignup/:cryptoId',
  [check('*').trim().escape()],
  async (req, res) => {
    try {
      const tempUser = await TempUser.findOne({ cryptoId: req.params.cryptoId });
      if (!tempUser) { throw 'err'; }
      // email validated, create new user
      const newUser = new User({ email: tempUser.email, password: tempUser.pass });
      await newUser.save();
      const newPortfolio = new Portfolio({ cryptos: [], stocks: [], otherAssets: [],
        liabilities: [], manualCryptos: [], manualStocks: [], userId: newUser._id });
      const portfolio = await newPortfolio.save();
      const newNetWorth = new NetWorth({ dataPoints: [{ date: new Date(), value: 0}], userId: newUser._id });
      const netWorth = await newNetWorth.save();
      const newGoals = new Goals({ netWorthGoal: 0, otherGoals: [], userId: newUser._id });
      await newGoals.save();
      await TempUser.findOneAndDelete({ cryptoId: req.params.cryptoId });
      res.redirect('http://localhost:3000/login?valid=true');
      // res.redirect('https://simplify.herokuapp.com/login?valid=true');
    } catch(e) { res.redirect('http://localhost:3000/login?valid=false'); /*res.redirect('https://simplify.herokuapp.com/login?valid=false'*/ }
});

router.get('/autoLogin', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId }).lean();
    const netWorth = await NetWorth.findOne({ userId: req.userId });
    if (!portfolio || !netWorth) { throw 'could not retrieve user data.'; }
    const goals = await Goals.findOne({ userId: req.userId }).lean();
    const budgets = await Budgets.findOne({ userId: req.userId });
    const updatedStocks = await getStockPrices([...portfolio.stocks]);
    const combinedStocks = updatedStocks.concat([...portfolio.manualStocks]);
    await deleteOldTempUsers().catch(err => { throw 'err'; });
    await updateStocks().catch(err => { throw 'err'; });
    // update portfolio with current stock/crypto prices
    const updatedCryptos = await updateCryptos([...portfolio.cryptos], [...portfolio.manualCryptos]).catch(err => { throw 'err'; });
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
  // for demo mode, retrieves stock/crypto prices for default demo portfolio
  try {
    const updatedCryptos = await updateCryptos([...req.body.portfolio.cryptos], [...req.body.portfolio.manualCryptos]).catch(err => { throw 'err'; });
    const updatedStocks = await getStockPrices([...req.body.portfolio.stocks]);
    const combinedStocks = updatedStocks.concat([...req.body.portfolio.manualStocks]);
    const updatedPortfolio = { ...req.body.portfolio, cryptos: updatedCryptos, stocks: combinedStocks };
    await deleteOldTempUsers().catch(err => { throw 'err'; });
    await updateStocks().catch(err => { throw 'err'; });
    res.status(200).json({ portfolio: updatedPortfolio });
  } catch (err) { res.sendStatus(500); }
});

router.post('/deleteAccount', auth, async (req, res) => {
  // deletes all of users data
  try {
    const user = await User.findOneAndDelete({ _id: req.userId });
    const portfolio = await Portfolio.findOneAndDelete({ userId: req.userId });
    const networth = await NetWorth.findOneAndDelete({ userId: req.userId });
    const goals = await Goals.findOneAndDelete({ userId: req.userId });
    const budget = await Budgets.findOneAndDelete({ userId: req.userId });
    res.sendStatus(200);
  } catch(e) { res.sendStatus(500); }
});

router.post('/changePassword', auth,
  [body('oldPass').not().isEmpty().trim().escape(),
  body('newPass').not().isEmpty().trim().escape()],
  async (req, res) => {
    // verify old password & change to new password
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      const user = await User.findOne({ _id: req.userId });
      if (!user) { throw 'err'; }
      const same = await bcryptjs.compare(req.body.oldPass, user.password);
      if (!same) { return res.status(400).json({ msg: 'Current password is incorrect.' }); }
      const hashedPassword = await bcryptjs.hash(req.body.newPass, 10);
      user.password = hashedPassword;
      await user.save();
      res.sendStatus(200);
    } catch(e) { res.status(500).json({ msg: 'There was an error connecting to the server.' }); }
});

router.post('/feedback', auth,
  [body('msg').trim().escape(),
  body('rating').isNumeric()],
  async (req, res) => {
    try {
      if (!validationResult(req).isEmpty()) { throw 'err'; }
      // save feedback in DB w reference to userId
      const feedback = new Feedback({ userId: req.userId, rating: req.body.rating, msg: req.body.msg });
      await feedback.save();
      res.sendStatus(200);
    } catch(e) { res.sendStatus(500); }
});

module.exports = router;
