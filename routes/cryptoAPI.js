var express = require('express');
var router = express.Router();
var rp = require('request-promise');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Portfolio = require('../models/cryptoPortfolio');

const verifyToken = (req, res, next) => {
  // get auth header value
  const bearerHeader = req.headers['authorization'];
  //format of token: Authorization: Bearer <token>
  if (typeof bearerHeader !== 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.get('/btc', verifyToken, function(req, res) {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading btc price' }); }
    const requestOptions = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
      qs: { 'id': '1', },
      headers: { 'X-CMC_PRO_API_KEY': process.env.CRYPTO_KEY },
      json: true,
      gzip: true
    };
    rp(requestOptions).then(resp => {
      res.send(resp.data);
    }).catch((err) => {
      res.json({ message: err.message });
    });
  });
});

router.get('/ltc', verifyToken, function(req, res) {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading ltc price' }); }
    const requestOptions = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
      qs: { 'id': '2', },
      headers: { 'X-CMC_PRO_API_KEY': process.env.CRYPTO_KEY },
      json: true,
      gzip: true
    };
    rp(requestOptions).then(resp => {
      res.send(resp.data);
    }).catch((err) => {
      res.json({ message: err.message });
    });
  });
});

router.get('/eth', verifyToken, function(req, res) {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading eth price' }); }
    const requestOptions = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
      qs: { 'id': '1027', },
      headers: { 'X-CMC_PRO_API_KEY': process.env.CRYPTO_KEY },
      json: true,
      gzip: true
    };
    rp(requestOptions).then(resp => {
      res.send(resp.data);
    }).catch((err) => {
      res.json({ message: err.message });
    });
  });
});

router.post('/portfolio', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error verifying' }); }
    Portfolio.findOne({ 'user': req.body.username }).exec((err, portfolio) => {
      if (err) { return res.json({ message: 'error getting portfolio from DB.' }); }
      if (portfolio.length != 0) {
        return res.json({ message: 'Success', portfolio });
      } else {
        return res.json({ message: 'error portfolio not found.' });
      }
    });
  });
});

router.post('/updatePortfolio', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error verifying' }); }
    // console.log(req.body);
    const newPortfolio = { user: req.body.username, btc: req.body.cryptos.btc.quantity, ltc: req.body.cryptos.ltc.quantity, eth: req.body.cryptos.eth.quantity };
    // console.log(newPortfolio);
    Portfolio.findOneAndUpdate({ 'user': req.body.username }, newPortfolio, {new: true}, (err, portfolio) => {
      if (err) { return res.json({ message: 'error getting portfolio from DB.' }); }
      console.log(portfolio);
      if (portfolio.length != 0) {
        return res.json({ message: 'Success', portfolio });
      } else {
        return res.json({ message: 'error updating portfolio.' });
      }
    });
  });
});

module.exports = router;
