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
    return res.status(200).json({ result });
  });
});

router.put('/updateStocks', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    if (req.body.data.identifier === 'Manual') {
      const manualStocks = [...portfolio.manualStocks];
      manualStocks.unshift({ name: req.body.data.name, symbol: req.body.data.symbol,
        quantity: req.body.data.quantity, value: req.body.data.value, price: req.body.data.price,
        identifier: req.body.data.identifier });
      portfolio.manualStocks = manualStocks;
    } else {
      const stocks = [...portfolio.stocks];
      stocks.unshift({ name: req.body.data.name, symbol: req.body.data.symbol,
        quantity: req.body.data.quantity, identifier: req.body.data.identifier });
      portfolio.stocks = stocks;
    }
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating stocks.' }); }
      return res.status(200).json({ msg: 'Success' });
    });
  });
});

router.put('/changeStock', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    if (req.body.identifier === 'Manual') {
      const manualStocks = [...portfolio.manualStocks];
      const index = manualStocks.findIndex(stock => stock.name === req.body.name);
      manualStocks[index].name = req.body.name;
      manualStocks[index].symbol = req.body.symbol;
      manualStocks[index].quantity = req.body.quantity;
      manualStocks[index].value = req.body.value;
      manualStocks[index].price = req.body.price;
      portfolio.manualStocks = manualStocks;
    } else {
      const stocks = [...portfolio.stocks];
      const index = stocks.findIndex(stock => stock.name === req.body.name);
      stocks[index].name = req.body.name;
      stocks[index].symbol = req.body.symbol;
      stocks[index].quantity = req.body.quantity;
      portfolio.stocks = stocks;
    }
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating stocks.' }); }
      return res.status(200).json({ msg: 'Success' });
    });
  });
});

router.put('/changeCrypto', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    if (req.body.identifier === 'Manual') {
      const manualCryptos = [...portfolio.manualCryptos];
      const index = manualCryptos.findIndex(crypto => crypto.name === req.body.name);
      manualCryptos[index].name = req.body.name;
      manualCryptos[index].symbol = req.body.symbol;
      manualCryptos[index].quantity = req.body.quantity;
      manualCryptos[index].value = req.body.value;
      manualCryptos[index].price = req.body.price;
      portfolio.manualCryptos = manualCryptos;
    } else {
      const cryptos = [...portfolio.cryptos];
      const index = cryptos.findIndex(crypto => crypto.name === req.body.name);
      cryptos[index].name = req.body.name;
      cryptos[index].symbol = req.body.symbol;
      cryptos[index].quantity = req.body.quantity;
      portfolio.cryptos = cryptos;
    }
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating cryptos.' }); }
      return res.status(200).json({ msg: 'Success' });
    });
  });
});

router.put('/deleteStock', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    if (req.body.identifier === 'Manual') {
      const manualStocks = [...portfolio.manualStocks];
      const index = manualStocks.findIndex(stock => stock.name === req.body.name);
      manualStocks.splice(index, 1);
      portfolio.manualStocks = [...manualStocks];
    } else {
      const stocks = [...portfolio.stocks];
      const index = stocks.findIndex(stock => stock.name === req.body.name);
      stocks.splice(index, 1);
      portfolio.stocks = [...stocks];
    }
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating stocks.' }); }
      return res.status(200).json({ msg: 'Success' });
    });
  });
});

router.put('/deleteCrypto', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    if (req.body.identifier === 'Manual') {
      const manualCryptos = [...portfolio.manualCryptos];
      const index = manualCryptos.findIndex(crypto => crypto.name === req.body.name);
      manualCryptos.splice(index, 1);
      portfolio.manualCryptos = [...manualCryptos];
    } else {
      const cryptos = [...portfolio.cryptos];
      const index = cryptos.findIndex(crypto => crypto.name === req.body.name);
      cryptos.splice(index, 1);
      portfolio.cryptos = [...cryptos];
    }
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating cryptos.' }); }
      return res.status(200).json({ msg: 'Success' });
    });
  });
});

router.put('/updateCryptos', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    if (req.body.data.identifier === 'Manual') {
      const manualCryptos = [...portfolio.manualCryptos];
      manualCryptos.unshift({ name: req.body.data.name, symbol: req.body.data.symbol,
        quantity: req.body.data.quantity, identifier: req.body.data.identifier,
        price: req.body.data.price, value: req.body.data.value });
      portfolio.manualCryptos = manualCryptos;
    } else {
      const cryptos = [...portfolio.cryptos];
      cryptos.unshift({ name: req.body.data.name, symbol: req.body.data.symbol,
        quantity: req.body.data.quantity, identifier: req.body.data.identifier });
      portfolio.cryptos = cryptos;
    }
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error updating cryptos.' }); }
      return res.status(200).json({ msg: 'Success' });
    });
  });
});

router.put('/addAsset', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    const otherAssets = [...portfolio.otherAssets];
    otherAssets.unshift({ name: req.body.name, desc: req.body.desc, value: req.body.value });
    portfolio.otherAssets = otherAssets;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error adding asset.' }); }
      return res.status(200).json({ msg: 'Success', assets: result.otherAssets });
    });
  });
});

router.put('/removeAsset', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    const otherAssets = [...portfolio.otherAssets];
    const index = otherAssets.findIndex(asset => asset.name === req.body.name);
    otherAssets.splice(index, 1);
    portfolio.otherAssets = otherAssets;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error adding asset.' }); }
      return res.status(200).json({ msg: 'Success', assets: result.otherAssets });
    });
  });
});

router.put('/addDebt', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    const liabilities = [...portfolio.liabilities];
    liabilities.unshift({ name: req.body.name, desc: req.body.desc, value: req.body.value });
    portfolio.liabilities = liabilities;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error adding debt.' }); }
      return res.status(200).json({ msg: 'Success', debts: result.liabilities  });
    });
  });
});

router.put('/removeDebt', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    const liabilities = [...portfolio.liabilities];
    const index = liabilities.findIndex(debt => debt.name === req.body.name);
    liabilities.splice(index, 1);
    portfolio.liabilities = liabilities;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error adding asset.' }); }
      return res.status(200).json({ msg: 'Success', debts: result.liabilities });
    });
  });
});

router.put('/updateAsset', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    const otherAssets = [...portfolio.otherAssets];
    const index = otherAssets.findIndex(asset => asset.name === req.body.name);
    otherAssets[index].value = req.body.value;
    portfolio.otherAssets = otherAssets;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error adding asset.' }); }
      return res.status(200).json({ msg: 'Success', assets: result.otherAssets });
    });
  });
});

router.put('/updateDebt', auth, (req, res, next) => {
  Portfolio.findOne({ userId: req.userId }, (err, portfolio) => {
    if (err) { return res.status(500).json({ msg: 'Server error.' }); }
    const liabilities = [...portfolio.liabilities];
    const index = liabilities.findIndex(debt => debt.name === req.body.name);
    liabilities[index].value = req.body.value;
    portfolio.liabilities = liabilities;
    portfolio.save((err, result) => {
      if (err) { return res.status(500).json({ msg: 'Error adding asset.' }); }
      return res.status(200).json({ msg: 'Success', debts: result.liabilities });
    });
  });
});

module.exports = router;
