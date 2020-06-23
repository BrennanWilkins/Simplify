const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Portfolio = require('../models/stockPortfolio');

const BASE_URL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';

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

router.get('/aapl', verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading price' }); }
    axios.get(BASE_URL + 'AAPL&apikey=' + process.env.STOCK_KEY).then(resp => {
      res.send(resp.data);
    }).catch(err => {
      res.send(err);
    });
  });
});
router.get('/googl', verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading price' }); }
    axios.get(BASE_URL + 'GOOGL&apikey=' + process.env.STOCK_KEY).then(resp => {
      res.send(resp.data);
    }).catch(err => {
      res.send(err);
    });
  });
});
router.get('/msft', verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading price' }); }
    axios.get(BASE_URL + 'MSFT&apikey=' + process.env.STOCK_KEY).then(resp => {
      res.send(resp.data);
    }).catch(err => {
      res.send(err);
    });
  });
});
router.get('/amzn', verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading price' }); }
    axios.get(BASE_URL + 'AMZN&apikey=' + process.env.STOCK_KEY).then(resp => {
      res.send(resp.data);
    }).catch(err => {
      res.send(err);
    });
  });
});
router.get('/tsla', verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading price' }); }
    axios.get(BASE_URL + 'TSLA&apikey=' + process.env.STOCK_KEY).then(resp => {
      res.send(resp.data);
    }).catch(err => {
      res.send(err);
    });
  });
});
router.get('/spy', verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading price' }); }
    axios.get(BASE_URL + 'SPY&apikey=' + process.env.STOCK_KEY).then(resp => {
      res.send(resp.data);
    }).catch(err => {
      res.send(err);
    });
  });
});
router.get('/voo', verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error loading price' }); }
    axios.get(BASE_URL + 'VOO&apikey=' + process.env.STOCK_KEY).then(resp => {
      res.send(resp.data);
    }).catch(err => {
      res.send(err);
    });
  });
});

router.post('/portfolio', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error verifying' }); }
    Portfolio.findOne({ 'user': req.body.username }).exec((err, portfolio) => {
      if (err) { return res.json({ message: 'error getting user portfolio' }); }
      if (portfolio.length != 0) {
        return res.json({ message: 'Success', portfolio });
      } else {
        return res.json({ message: 'error' });
      }
    });
  });
});

router.post('/updatePortfolio', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.AUTH_KEY, (error, authData) => {
    if(error) { return res.json({ message: 'error verifying' }); }
    console.log(req.body);
    const newPortfolio = { user: req.body.username, aapl: req.body.stocks.AAPL.shares, googl: req.body.stocks.GOOGL.shares, msft: req.body.stocks.MSFT.shares, amzn: req.body.stocks.AMZN.shares, spy: req.body.stocks.SPY.shares };
    console.log(newPortfolio);
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
