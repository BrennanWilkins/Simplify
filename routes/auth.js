const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../models/user');
const CryptoPortfolio = require('../models/cryptoPortfolio');
const StockPortfolio = require('../models/stockPortfolio');
const { check, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

router.post('/logIn', [
  check('username').trim().isLength({ min: 6 }),
  check('password').trim().isLength({ min: 6 }),
  body('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return; }
    let response = {};
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) { return; }
      if (!user) {
        return res.json({ message: 'Incorrect username or password.'});
      }
      bcryptjs.compare(req.body.password, user.password, (err, resp) => {
        if (resp) {
          jwt.sign({ user }, process.env.AUTH_KEY,(err, token) => {
            return res.json({ token, message: 'Success' });
          });
        } else {
          return res.json({ message: 'Incorrect username or password.'});
        }
      });
    });
  }
]);

router.post('/signUp', [
  check('username').trim().isLength({ min: 6, max: 40 }),
  check('password').trim().isLength({ min: 6, max: 40 }),
  check('confirmPassword').trim().isLength({ min: 1, max: 40 }),
  check('confirmPassword').custom((value, { req }) => value === req.body.password),
  body('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.json({ message: 'Error in input fields.' }); }
    User.find({ 'username': req.body.username }).exec((err, user) => {
      if (err) { return res.json({ message: 'Error connecting to DB.' }); }
      if (user.length != 0) {
        return res.json({ message: 'Taken' });
      }
      bcryptjs.hash(req.body.password, 10, (err0, hashedPassword) => {
        if (err0) { return res.json({ message: 'Failed encrypting password.' }); }
        const user = new User({ username: req.body.username, password: hashedPassword });
        user.save(err1 => {
          if (err1) { return res.json({ message: 'Failed saving user to DB.' }); }
          const crypto = new CryptoPortfolio({ btc: 0, ltc: 0, eth: 0, user: req.body.username });
          crypto.save(err2 => {
            if(err2) { return res.json({ message: 'Failed saving new crypto portfolio' }); }
            const stock = new StockPortfolio({ aapl: 0, googl: 0, msft: 0, amzn: 0, spy: 0, user: req.body.username });
            stock.save(err3 => {
              if(err3) { return res.json({ message: 'Failed saving new stock portfolio.' }); }
              return res.json({ message: 'Success' });
            });
          });
        });
      });
    });
    // const crypto = new CryptoPortfolio({ btc: 0, ltc: 0, eth: 0, user: req.body.username });
    // const stock = new StockPortfolio({ aapl: 0, googl: 0, msft: 0, amzn: 0, spy: 0, user: req.body.username });
    // crypto.save(err2 => {
    //   if(err2) { return res.json({ message: 'Failed saving new crypto portfolio' }); }
    //   // return res.json({ message: 'Success' });
    // });
    // stock.save(err3 => {
    //   if(err3) { return res.json({ message: 'Failed saving new stock portfolio.' }); }
    // });
    // return res.json({ message: 'Success' });
  }
]);

module.exports = router;
