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

const cmcOptions = {
  headers: {
    'X-CMC_PRO_API_KEY': config.get('CRYPTO_KEY')
  },
  json: true,
  gzip: true
};

const cmcUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=399';

router.post('/login', [
  check('email').isEmail(),
  check('password').trim().isLength({ min: 8, max: 100 }),
  body('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'Error in input fields.' });
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
      if (!user) { return res.status(400).json({ msg: 'Incorrect email or password.' }); }
      bcryptjs.compare(req.body.password, user.password, (err, resp) => {
        if (resp) {
          const options = req.body.remember === 'false' ? { expiresIn: '1h' } : { expiresIn: '30d' };
          jwt.sign({ user }, config.get('AUTH_KEY'), options, (err, token) => {
            if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
            Portfolio.findOne({ userId: user._id }).lean().exec((err, portfolio) => {
              if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
              if (!portfolio) { return res.status(404).json({ msg: 'Could not retrieve user data.' }); }
              NetWorth.findOne({ userId: user._id }).exec((err, netWorth) => {
                if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
                if (!netWorth) { return res.status(404).json({ msg: 'Could not retrieve user data.' }); }
                // update cryptos if last updated >1hr ago else return the cryptos
                Cryptos.findOne({ name: 'CryptoList' }).exec((err, cryptos) => {
                  if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
                  if (new Date().getTime() - new Date(cryptos.date).getTime() >= 3600000) {
                    console.log('Updating cryptos...');
                    axios.get(cmcUrl, cmcOptions).then(resp => {
                      const cmcCryptos = resp.data.data.map(obj => {
                        return { symbol: obj.symbol, name: obj.name, price: obj.quote.USD.price };
                      });
                      Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: cmcCryptos }, {}, (err, result) => {
                        if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
                        console.log('Crypto update successful');
                        // update portfolio values w current prices
                        const updatedCryptos = [...portfolio.cryptos].map(crypto => {
                          const matchingCrypto = cmcCryptos.find(data => data.name === crypto.name);
                          if (!matchingCrypto) { return { ...crypto, value: '?' }; }
                          return { ...crypto, price: matchingCrypto.price };
                        });
                        const promises = [];
                        const updatedStocks = [...portfolio.stocks];
                        updatedStocks.forEach(stock => {
                          promises.push(yf.quote({ symbol: stock.symbol, modules: ['price']}));
                        });
                        Promise.allSettled(promises).then(pResults => {
                          pResults.forEach((pResult, i) => {
                            if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
                            else { updatedStocks[i].price = '?'; }
                          });
                          const updatedPortfolio = { ...portfolio, cryptos: updatedCryptos, stocks: updatedStocks };
                          return res.status(200).json({ msg: 'Success.', token, portfolio: updatedPortfolio, netWorth });
                        });
                      });
                    }).catch(err => {
                      console.log('Crypto update failed');
                      return res.status(500).json({ msg: 'There was an error logging in.' });
                    });
                  } else {
                    // update portfolio values w current prices
                    const updatedCryptos = [...portfolio.cryptos].map(crypto => {
                      const matchingCrypto = cryptos.cryptos.find(data => data.name === crypto.name);
                      if (!matchingCrypto) { return { ...crypto, value: '?' }; }
                      return { ...crypto, price: matchingCrypto.price };
                    });
                    const promises = [];
                    const updatedStocks = [...portfolio.stocks];
                    updatedStocks.forEach(stock => {
                      promises.push(yf.quote({ symbol: stock.symbol, modules: ['price']}));
                    });
                    Promise.allSettled(promises).then(pResults => {
                      pResults.forEach((pResult, i) => {
                        if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
                        else { updatedStocks[i].price = '?'; }
                      });
                      const updatedPortfolio = { ...portfolio, cryptos: updatedCryptos, stocks: updatedStocks };
                      return res.status(200).json({ msg: 'Success.', token, portfolio: updatedPortfolio, netWorth });
                    });
                  }
                });
              });
            });
          });
        } else {
          return res.status(400).json({ msg: 'Incorrect email or password.' });
        }
      });
    });
  }
]);

router.post('/signup', [
  check('email').isEmail(),
  check('password').trim().isLength({ min: 8, max: 100 }),
  check('confirmPassword').trim().isLength({ min: 8, max: 100 }),
  check('confirmPassword').custom((value, { req }) => value === req.body.password),
  body('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ msg: 'Error in input fields.' }); }
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) { return res.status(500).json({ msg: 'Error connecting to server.' }); }
      if (user) { return res.status(400).json({ msg: 'Email already taken.' }); }
      bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) { return res.json({ msg: 'Failed signing up user.' }); }
        const newUser = new User({ email: req.body.email, password: hashedPassword });
        newUser.save(err => {
          if (err) { return res.status(500).json({ msg: 'Failed signing up user.' }); }
          // auto login
          const options = req.body.remember === 'false' ? { expiresIn: '1h' } : { expiresIn: '30d' };
          jwt.sign({ newUser }, config.get('AUTH_KEY'), options, (err, token) => {
            if (err) { return res.status(500).json({ msg: 'Failed signing up user.' }); }
            const newPortfolio = new Portfolio({ cryptos: [], stocks: [], otherAssets: [], liabilities: [], userId: newUser._id });
            newPortfolio.save((err, portfolio) => {
              if (err) { return res.status(500).json({ msg: 'Failed signing up user.' }); }
              const newNetWorth = new NetWorth({ dataPoints: [{ date: new Date(), value: 0}], userId: newUser._id });
              newNetWorth.save((err, netWorth) => {
                if (err) { return res.status(500).json({ msg: 'Failed signing up user.' }); }
                // update cryptos if last updated >1hr ago else return the cryptos
                Cryptos.findOne({ name: 'CryptoList' }).exec((err, cryptos) => {
                  if (err) { return res.status(500).json({ msg: 'Failed signing up user.' }); }
                  if (new Date(cryptos.date).getTime() - new Date().getTime() >= 3600000) {
                    console.log('Updating cryptos...');
                    axios.get(cmcUrl, cmcOptions).then(resp => {
                      const cmcCryptos = resp.data.data.map(obj => {
                        return { symbol: obj.symbol, name: obj.name, price: obj.quote.USD.price };
                      });
                      Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: cmcCryptos }, {}, (err, result) => {
                        if (err) { return res.status(500).json({ msg: 'Failed signing up user.' }); }
                        console.log('Crypto update successful');
                        return res.status(200).json({ msg: 'Success.', token, netWorth, portfolio });
                      });
                    }).catch(err => {
                      console.log('Crypto update failed');
                      return res.status(500).json({ msg: 'Failed signing up user.' });
                    });
                  } else {
                    return res.status(200).json({ msg: 'Success.', token, netWorth, portfolio });
                  }
                });
              });
            });
          });
        });
      });
    });
  }
]);

router.get('/autoLogin', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }).lean().exec((err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
    if (!portfolio) { return res.status(404).json({ msg: 'Could not retrieve user data.' }); }
    NetWorth.findOne({ userId: req.userId }).exec((err, netWorth) => {
      if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
      if (!netWorth) { return res.status(404).json({ msg: 'Could not retrieve user data.' }); }
      // update cryptos if last updated >1hr ago else return the cryptos
      Cryptos.findOne({ name: 'CryptoList' }).exec((err, cryptos) => {
        if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
        if (new Date().getTime() - new Date(cryptos.date).getTime() >= 3600000) {
          console.log('Updating cryptos...');
          axios.get(cmcUrl, cmcOptions).then(resp => {
            const cmcCryptos = resp.data.data.map(obj => {
              return { symbol: obj.symbol, name: obj.name, price: obj.quote.USD.price };
            });
            Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: cmcCryptos }, {}, (err, result) => {
              if (err) { return res.status(500).json({ msg: 'There was an error logging in.' }); }
              console.log('Crypto update successful');
              // update portfolio values w current prices
              const updatedCryptos = [...portfolio.cryptos].map(crypto => {
                const matchingCrypto = cmcCryptos.find(data => data.name === crypto.name);
                if (!matchingCrypto) { return { ...crypto, value: '?' }; }
                return { ...crypto, price: matchingCrypto.price };
              });
              const promises = [];
              const updatedStocks = [...portfolio.stocks];
              updatedStocks.forEach(stock => {
                promises.push(yf.quote({ symbol: stock.symbol, modules: ['price']}));
              });
              Promise.allSettled(promises).then(pResults => {
                pResults.forEach((pResult, i) => {
                  if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
                  else { updatedStocks[i].price = '?'; }
                });
                const updatedPortfolio = { ...portfolio, cryptos: updatedCryptos, stocks: updatedStocks };
                return res.status(200).json({ msg: 'Success.', portfolio: updatedPortfolio, netWorth });
              });
            });
          }).catch(err => {
            console.log('Crypto update failed');
            return res.status(500).json({ msg: 'There was an error logging in.' });
          });
        } else {
          // update portfolio values w current prices
          const updatedCryptos = [...portfolio.cryptos].map(crypto => {
            const matchingCrypto = cryptos.cryptos.find(data => data.name === crypto.name);
            if (!matchingCrypto) { return { ...crypto, value: '?' }; }
            return { ...crypto, price: matchingCrypto.price };
          });
          const promises = [];
          const updatedStocks = [...portfolio.stocks];
          updatedStocks.forEach(stock => {
            promises.push(yf.quote({ symbol: stock.symbol, modules: ['price']}));
          });
          Promise.allSettled(promises).then(pResults => {
            pResults.forEach((pResult, i) => {
              if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
              else { updatedStocks[i].price = '?'; }
            });
            const updatedPortfolio = { ...portfolio, cryptos: updatedCryptos, stocks: updatedStocks };
            return res.status(200).json({ msg: 'Success.', portfolio: updatedPortfolio, netWorth });
          });
        }
      });
    });
  });
});

module.exports = router;
