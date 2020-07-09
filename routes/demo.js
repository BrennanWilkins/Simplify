const express = require('express');
const router = express.Router();
const Cryptos = require('../models/cryptos');
const axios = require('axios');
const yf = require('yahoo-finance');
const Fuse = require('fuse.js');
const StockSearch = require('stock-ticker-symbol');
const config = require('config');

router.get('/searchCrypto/:searchVal', (req, res, next) => {
  Cryptos.find({}, (err, cryptos) => {
    if (err) { return res.status(500).json({ msg: 'Failed retrieving cryptos.' }); }
    const fuse = new Fuse(cryptos[0].cryptos, { keys: ['name', 'symbol'] });
    const result = fuse.search(req.params.searchVal).slice(0, 12);
    return res.status(200).json({ result });
  });
});

router.get('/searchStock/:searchVal', (req, res, next) => {
  const searchResult = StockSearch.search(req.params.searchVal);
  const promises = [];
  searchResult.forEach(stock => {
    promises.push(yf.quote({ symbol: stock.ticker, modules: ['price']}));
  });
  Promise.allSettled(promises).then(results => {
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        if (!result.value.price.regularMarketPrice) { searchResult[i].price = '?'; }
        else { searchResult[i].price = result.value.price.regularMarketPrice; }
      }
      else { searchResult[i].price = '?'; }
    });
    const result = searchResult.filter(stock => stock.price !== '?');
    return res.status(200).json({ result });
  });
});

const cmcOptions = { headers: { 'X-CMC_PRO_API_KEY': config.get('CRYPTO_KEY') }, json: true, gzip: true };
const cmcUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=399';

router.post('/demoLogin', async (req, res, next) => {
  try {
    const cryptos = await Cryptos.findOne({ name: 'CryptoList' });
    let updatedCryptos;
    if (new Date().getTime() - new Date(cryptos.date).getTime() >= 3600000) {
      console.log('Updating cryptos...');
      const resp = await axios.get(cmcUrl, cmcOptions);
      const cmcCryptos = resp.data.data.map(obj => {
        return { symbol: obj.symbol, name: obj.name, price: obj.quote.USD.price };
      });
      const result = await Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: cmcCryptos }, {});
      console.log('Crypto update successful');
      updatedCryptos = [...req.body.portfolio.cryptos].map(crypto => {
        const matchingCrypto = cmcCryptos.find(data => data.name === crypto.name);
        if (!matchingCrypto) { return { ...crypto, value: '?' }; }
        return { ...crypto, price: matchingCrypto.price };
      });
    } else {
      updatedCryptos = [...req.body.portfolio.cryptos].map(crypto => {
        const matchingCrypto = cryptos.cryptos.find(data => data.name === crypto.name);
        if (!matchingCrypto) { return { ...crypto, value: '?' }; }
        return { ...crypto, price: matchingCrypto.price };
      });
    }
    const promises = [];
    const updatedStocks = [...req.body.portfolio.stocks];
    updatedStocks.forEach(stock => {
      promises.push(yf.quote({ symbol: stock.symbol, modules: ['price']}));
    });
    const pResults = await Promise.allSettled(promises);
    pResults.forEach((pResult, i) => {
      if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
      else { updatedStocks[i].price = '?'; }
    });
    const combinedStocks = updatedStocks.concat([...req.body.portfolio.manualStocks]);
    const combinedCryptos = updatedCryptos.concat([...req.body.portfolio.manualCryptos]);
    const updatedPortfolio = { ...req.body.portfolio, cryptos: combinedCryptos, stocks: combinedStocks };
    return res.status(200).json({ portfolio: updatedPortfolio });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'There was an error loading the demo account.' });
  }
  // Cryptos.findOne({ name: 'CryptoList' }, (err, cryptos) => {
  //   if (err) { return res.status(500).json({ msg: 'There was an error loading the demo account.' }); }
  //   if (new Date().getTime() - new Date(cryptos.date).getTime() >= 3600000) {
  //     console.log('Updating cryptos...');
  //     axios.get(cmcUrl, cmcOptions).then(resp => {
  //       const cmcCryptos = resp.data.data.map(obj => {
  //         return { symbol: obj.symbol, name: obj.name, price: obj.quote.USD.price };
  //       });
  //       Cryptos.findOneAndUpdate({ name: 'CryptoList' }, { date: new Date(), cryptos: cmcCryptos }, {}, (err, result) => {
  //         if (err) { return res.status(500).json({ msg: 'There was an error loading the demo account.' }); }
  //         console.log('Crypto update successful');
  //         // update portfolio values w current prices
  //         const updatedCryptos = [...req.body.portfolio.cryptos].map(crypto => {
  //           const matchingCrypto = cmcCryptos.find(data => data.name === crypto.name);
  //           if (!matchingCrypto) { return { ...crypto, value: '?' }; }
  //           return { ...crypto, price: matchingCrypto.price };
  //         });
  //         const promises = [];
  //         const updatedStocks = [...req.body.portfolio.stocks];
  //         updatedStocks.forEach(stock => {
  //           promises.push(yf.quote({ symbol: stock.symbol, modules: ['price']}));
  //         });
  //         Promise.allSettled(promises).then(pResults => {
  //           pResults.forEach((pResult, i) => {
  //             if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
  //             else { updatedStocks[i].price = '?'; }
  //           });
  //           const combinedStocks = updatedStocks.concat([...req.body.portfolio.manualStocks]);
  //           const combinedCryptos = updatedCryptos.concat([...req.body.portfolio.manualCryptos]);
  //           const updatedPortfolio = { ...req.body.portfolio, cryptos: combinedCryptos, stocks: combinedStocks };
  //           return res.status(200).json({ portfolio: updatedPortfolio });
  //         });
  //       });
  //     });
  //   } else {
  //     // update portfolio values w current prices
  //     const updatedCryptos = [...req.body.portfolio.cryptos].map(crypto => {
  //       const matchingCrypto = cryptos.cryptos.find(data => data.name === crypto.name);
  //       if (!matchingCrypto) { return { ...crypto, value: '?' }; }
  //       return { ...crypto, price: matchingCrypto.price };
  //     });
  //     const promises = [];
  //     const updatedStocks = [...req.body.portfolio.stocks];
  //     updatedStocks.forEach(stock => {
  //       promises.push(yf.quote({ symbol: stock.symbol, modules: ['price']}));
  //     });
  //     Promise.allSettled(promises).then(pResults => {
  //       pResults.forEach((pResult, i) => {
  //         if (pResult.status === 'fulfilled') { updatedStocks[i].price = pResult.value.price.regularMarketPrice; }
  //         else { updatedStocks[i].price = '?'; }
  //       });
  //       const combinedStocks = updatedStocks.concat([...req.body.portfolio.manualStocks]);
  //       const combinedCryptos = updatedCryptos.concat([...req.body.portfolio.manualCryptos]);
  //       const updatedPortfolio = { ...portfolio, cryptos: combinedCryptos, stocks: combinedStocks };
  //       return res.status(200).json({ portfolio: updatedPortfolio });
  //     });
  //   }
  // });
});

module.exports = router;
