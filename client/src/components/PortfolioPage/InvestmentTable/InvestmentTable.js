import React from 'react';
import classes from './InvestmentTable.module.css';
import { connect } from 'react-redux';
import btcIcon from '../../../assets/btcIcon.png';
import ethIcon from '../../../assets/ethIcon.png';
import ltcIcon from '../../../assets/ltcIcon.png';

const InvestmentTable = props => (
  <div className={props.normal ? null : (props.mode === 'Stocks' || props.mode === 'Cryptos' ? classes.TableContainer : classes.AssetTableContainer)}>
    <table className={props.normal ? classes.NormalTable : classes.Table}>
      <thead>
        <tr className={classes.HeaderFields}>
          <th>{props.mode === 'Stocks' ? 'Ticker' : props.mode === 'Cryptos' ? 'Symbol' : 'Name'}</th>
          <th>{props.mode === 'Stocks' ? 'Company Name' : props.mode === 'Cryptos' ? 'Cryptocurrency' : 'Description'}</th>
          <th>{props.mode === 'Stocks' ? 'Shares' : props.mode === 'Cryptos' ? 'Quantity': 'Value'}</th>
          {props.mode === 'Stocks' || props.mode === 'Cryptos' ? <th>Price</th> : null}
          {props.mode === 'Stocks' || props.mode === 'Cryptos' ? <th>Value</th> : null}
        </tr>
      </thead>
      <tbody>
        {props.mode === 'Stocks' ? (
          props.stocks.map((stock, i) => (
            <tr key={i}>
              <td className={classes.Symbol}>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{Number(stock.quantity).toLocaleString(undefined, { maximumFractionDigits: 5 })}</td>
              <td>{stock.price === '?' ? '?' : `$${Number(stock.price).toFixed(2)}`}</td>
              <td className={classes.Value}>{stock.value === '?' ? '?' : `$${Number(stock.value).toFixed(2)}`}</td>
            </tr>
        ))) : props.mode === 'Cryptos' ? (
          props.cryptos.map((crypto, i) => (
            <tr key={i}>
              <td className={classes.Symbol}>
                {crypto.symbol === 'BTC' ? <img src={btcIcon} alt="BTC"></img> :
                crypto.symbol === 'ETH' ? <img src={ethIcon} alt="ETH"></img> :
                crypto.symbol === 'LTC' ? <img src={ltcIcon} alt="LTC"></img> :
                crypto.symbol}
              </td>
              <td>{crypto.name}</td>
              <td>{Number(crypto.quantity).toLocaleString(undefined, { maximumFractionDigits: 5 })}</td>
              <td>{crypto.price === '?' ? '?' : `$${Number(crypto.price).toFixed(2)}`}</td>
              <td className={classes.Value}>{crypto.value === '?' ? '?' : `$${Number(crypto.value).toFixed(2)}`}</td>
            </tr>
          ))
        ) : props.mode === 'Assets' ? (
          props.assets.map((asset, i) => (
            <tr key={i}>
              <td className={classes.Symbol}>{asset.name}</td>
              <td>{asset.desc}</td>
              <td className={classes.Value}>${Number(asset.value).toFixed(2)}</td>
            </tr>
          ))
        ) : (
          props.debts.map((debt, i) => (
            <tr key={i}>
              <td className={classes.Symbol}>{debt.name}</td>
              <td>{debt.desc}</td>
              <td className={classes.Value}>${Number(debt.value).toFixed(2)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos,
  assets: state.portfolio.otherAssets,
  debts: state.portfolio.liabilities
});

export default connect(mapStateToProps)(InvestmentTable);
