import React, { useState, useEffect } from 'react';
import classes from './Breakdown.module.css';
import { connect } from 'react-redux';
import Chart from '../../UI/Chart/Chart';

const Breakdown = props => {
  const [dataPoints, setDataPoints] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    // calculate percentages and category totals of stocks/cryptos/assets of portfolio
    const data = []; let stockTot = 0; let cryptoTot = 0;
    for (let stock of props.stocks) { stockTot += Number(stock.value); }
    for (let crypto of props.cryptos) { cryptoTot += Number(crypto.value); }
    let tot = stockTot + cryptoTot;
    for (let asset of props.assets) { tot += Number(asset.value); }
    if (stockTot > 0) { data.push({ label: 'Stocks', y: ((stockTot / tot) * 100).toFixed(2), val: stockTot.toFixed(2) }); }
    if (cryptoTot > 0) { data.push({ label: 'Cryptocurrencies', y: ((cryptoTot / tot) * 100).toFixed(2), val: cryptoTot.toFixed(2) }); }
    // calculate asset total percentages by category
    const assetCategs = [];
    for (let asset of props.assets) { if (!assetCategs.includes(asset.name)) { assetCategs.push(asset.name); } }
    const assetTots = assetCategs.map(name => ({ name, value: 0 }));
    for (let asset of props.assets) {
      const i = assetTots.findIndex(assetTot => assetTot.name === asset.name);
      assetTots[i].value += Number(asset.value);
    }
    for (let asset of assetTots) {
      data.push({ label: asset.name, y: ((asset.value / tot) * 100).toFixed(2), val: asset.value.toFixed(2) });
    }
    setDataPoints([...data]);
    // get stock/crypto percentages for tables
    if (props.stocks.length > 0) {
      setStockData(props.stocks.map(stock => ({ name: stock.symbol, percent: (stock.value / stockTot * 100).toFixed(2) })).sort((a,b) => b.percent - a.percent));
    }
    if (props.cryptos.length > 0) {
      setCryptoData(props.cryptos.map(crypto => ({ name: crypto.symbol, percent: (crypto.value / cryptoTot * 100).toFixed(2) })).sort((a,b) => b.percent - a.percent));
    }
  }, [props.stocks, props.cryptos, props.assets]);

  const options = {
    backgroundColor: 'transparent',
    data: [{
      type: "pie",
      toolTipContent: "{label}: {y}% (${val})",
      indexLabel: "{y}%",
      indexLabelFontWeight: "bold",
      indexLabelPlacement: "inside",
      dataPoints
    }],
    width: 350,
    height: 350
  };

  return (
    <div className={props.dark ? `${classes.Dark} ${classes.Container}` : classes.Container}>
      <h1>Portfolio Breakdown</h1>
      <div className={classes.Content}>
        <div className={classes.Chart}><Chart options={options} darkMode4={props.dark} /></div>
        {props.stocks.length > 0 &&
          <div className={classes.TableContainer}>
            <div className={classes.Title}>Stocks</div>
            <div className={classes.TableInnerContainer}>
              <table className={classes.Table}>
                <thead><tr><th>Symbol</th><th>Percentage</th></tr></thead>
                <tbody>
                  {stockData.map((stock, i) => (
                    <tr key={i}>
                      <td>{stock.name}</td>
                      <td>{stock.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}
        {props.cryptos.length > 0 &&
          <div className={classes.TableContainer}>
            <div className={classes.Title}>Cryptocurrencies</div>
            <div className={classes.TableInnerContainer}>
              <table className={classes.Table}>
                <thead><tr><th>Symbol</th><th>Percentage</th></tr></thead>
                <tbody>
                  {cryptoData.map((crypto, i) => (
                    <tr key={i}>
                      <td>{crypto.name}</td>
                      <td>{crypto.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos,
  assets: state.portfolio.otherAssets,
  dark: state.theme.darkMode
});

export default connect(mapStateToProps)(Breakdown);
