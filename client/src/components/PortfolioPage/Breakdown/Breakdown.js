import React, { useState, useEffect } from 'react';
import classes from './Breakdown.module.css';
import { connect } from 'react-redux';
import Chart from '../../UI/Chart/Chart';
import { caretIcon } from '../../UI/UIIcons';

const Breakdown = props => {
  const [dataPoints, setDataPoints] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [stockSortDown, setStockSortDown] = useState(true);
  const [cryptoSortDown, setCryptoSortDown] = useState(true);

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

  const sortHandler = mode => {
    if (mode === 'Stocks') {
      if (stockSortDown) { setStockData(stockData.sort((a,b) => a.percent - b.percent));
      } else { setStockData(stockData.sort((a,b) => b.percent - a.percent)); }
      setStockSortDown(prev => !prev);
    } else {
      if (cryptoSortDown) { setCryptoData(cryptoData.sort((a,b) => a.percent - b.percent));
      } else { setCryptoData(cryptoData.sort((a,b) => b.percent - a.percent)); }
      setCryptoSortDown(prev => !prev);
    }
  };

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
        {props.stocks.length > 0 && <Table mode="Stocks" data={stockData} sort={() => sortHandler('Stocks')} down={stockSortDown} />}
        {props.cryptos.length > 0 && <Table mode="Cryptocurrencies" data={cryptoData} sort={() => sortHandler('Cryptos')} down={cryptoSortDown} />}
      </div>
    </div>
  );
};

const Table = ({mode, data, sort, down }) => (
  <div className={classes.TableContainer}>
    <div className={classes.Title}>{mode}</div>
    <div className={classes.TableInnerContainer}>
      <table className={classes.Table}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Percentage<span onClick={sort}
            className={down ? classes.Down : classes.Up}>
            {caretIcon}</span></th>
          </tr>
        </thead>
        <tbody>
          {data.map((inv, i) => (
            <tr key={i}>
              <td>{inv.name}</td>
              <td>{inv.percent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos,
  assets: state.portfolio.otherAssets,
  dark: state.theme.darkMode
});

export default connect(mapStateToProps)(Breakdown);
