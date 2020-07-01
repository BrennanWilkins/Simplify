import React, { useState } from 'react';
import classes from './Portfolio.module.css';
import CanvasJSReact from '../../components/canvasjs/canvasjs.react';
import { connect } from 'react-redux';
import { createNetWorthOptions } from '../../utils/chartFuncs';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import BuySellPanel from '../../components/BuySellPanel/BuySellPanel';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Portfolio = props => {
  const [showStockSearch, setShowStockSearch] = useState(false);
  const [showCryptoSearch, setShowCryptoSearch] = useState(false);
  const [showBuyStock, setShowBuyStock] = useState(false);
  const [showSellStock, setShowSellStock] = useState(false);
  const [showBuyCrypto, setShowBuyCrypto] = useState(false);
  const [showSellCrypto, setShowSellCrypto] = useState(false);

  const netWorthVal = (props.netWorthData[props.netWorthData.length - 1].value).toFixed(2);

  const showBuySellHandler = (mode) => {
    if ((mode === 'BuyStock' || mode === 'SellStock') && props.stocks.length === 0) {
      return setShowStockSearch(true);
    }
    if ((mode === 'BuyCrypto' || mode === 'SellCrypto') && props.cryptos.length === 0) {
      return setShowCryptoSearch(true);
    }
    mode === 'BuyStock' ? setShowBuyStock(true) :
    mode === 'SellStock' ? setShowSellStock(true) :
    mode === 'BuyCrypto' ? setShowBuyCrypto(true) :
    setShowSellCrypto(true);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.NetWorthTitle}>
        <h1 className={classes.NetWorthText}>Net Worth</h1>
        <h1 className={classes.NetWorthValue}>${netWorthVal}</h1>
      </div>
      <div className={classes.NetWorthChart}>
        <CanvasJSChart options={createNetWorthOptions(props.netWorthData)} />
        <div className={classes.Block}></div>
      </div>
      <div className={classes.Investments}>
        <div className={classes.Stocks}>
          <h1>Stocks</h1>
          <button className={classes.NewBtn} onClick={() => setShowStockSearch(true)}>Add a new holding</button>
          <div className={classes.BuySellBtns}>
            <button className={classes.BuyBtn} onClick={() => showBuySellHandler('BuyStock')}>Buy</button>
            <BuySellPanel mode="BuyStock" show={showBuyStock} close={() => setShowBuyStock(false)} />
            <button className={classes.SellBtn} onClick={() => showBuySellHandler('SellStock')}>Sell</button>
            <BuySellPanel mode="SellStock" show={showSellStock} close={() => setShowSellStock(false)} />
          </div>
          <SearchPanel mode="Stock" show={showStockSearch} close={() => setShowStockSearch(false)} />
          <table className={classes.Table}>
            <thead>
              <tr className={classes.HeaderFields}>
                <th>Ticker</th>
                <th>Company Name</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {props.stocks.map((stock, i) => (
                <tr key={i}>
                  <td className={classes.Symbol}>{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.price === '?' ? '?' : `$${Number(stock.price).toFixed(2)}`}</td>
                  <td className={classes.Value}>{stock.value === '?' ? '?' : `$${Number(stock.value).toFixed(2)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={classes.Cryptos}>
          <h1>Cryptocurrencies</h1>
          <button className={classes.NewBtn} onClick={() => setShowCryptoSearch(true)}>Add a new holding</button>
          <div className={classes.BuySellBtns}>
            <button className={classes.BuyBtn} onClick={() => showBuySellHandler('BuyCrypto')}>Buy</button>
            <BuySellPanel mode="BuyCrypto" show={showBuyCrypto} close={() => setShowBuyCrypto(false)} />
            <button className={classes.SellBtn} onClick={() => showBuySellHandler('SellCrypto')}>Sell</button>
            <BuySellPanel mode="SellCrypto" show={showSellCrypto} close={() => setShowSellCrypto(false)} />
          </div>
          <SearchPanel mode="Crypto" show={showCryptoSearch} close={() => setShowCryptoSearch(false)} />
          <table className={classes.Table}>
            <thead>
              <tr className={classes.HeaderFields}>
                <th>Symbol</th>
                <th>Cryptocurrency</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {props.cryptos.map((crypto, i) => (
                <tr key={i}>
                  <td className={classes.Symbol}>{crypto.symbol}</td>
                  <td>{crypto.name}</td>
                  <td>{crypto.quantity}</td>
                  <td>{crypto.price === '?' ? '?' : `$${Number(crypto.price).toFixed(2)}`}</td>
                  <td className={classes.Value}>{crypto.value === '?' ? '?' : `$${Number(crypto.value).toFixed(2)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  netWorthData: state.netWorth.netWorthData,
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos
});

export default connect(mapStateToProps)(Portfolio);
