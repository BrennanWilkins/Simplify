import React, { useState, useEffect } from 'react';
import classes from './InvestmentTable.module.css';
import { connect } from 'react-redux';
import btcIcon from '../../../assets/btcIcon.png';
import ethIcon from '../../../assets/ethIcon.png';
import ltcIcon from '../../../assets/ltcIcon.png';
import { caretIcon, caretNeutralIcon } from '../../UI/UIIcons';

const InvestmentTable = props => {
  const [data, setData] = useState([]);
  const [sortMethods, setSortMethods] = useState({
    name: '',
    desc: '',
    symbol: '',
    quantity: '',
    price: '',
    value: ''
  });

  useEffect(() => {
    syncData();
    if (!props.normal) { return; }
    // reset sort methods on data change
    let methods = { ...sortMethods };
    for (let key in methods) { methods[key] = ''; }
    setSortMethods(methods);
  }, [props.mode, props.stocks, props.cryptos, props.assets, props.debts]);

  const syncData = () => {
    // sync data state to props based on mode
    if (props.mode === 'Stocks') { setData([...props.stocks]); }
    else if (props.mode === 'Cryptos') { setData([...props.cryptos]); }
    else if (props.mode === 'Assets') { setData([...props.assets]); }
    else { setData([...props.debts]); }
  };

  const sortData = (method, field) => {
    // sort data either ascending/descending/no sort
    // sort alphabetically if field is string else numerically
    let isString = field === 'name' || field === 'desc' || field === 'symbol';
    if (method === 'Ascend') {
      const sorted = isString ?
      data.sort((a, b) => a[field].localeCompare(b[field])) :
      data.sort((a, b) => a[field] - b[field]);
      setData(sorted);
    } else if (method === 'Descend') {
      const sorted = isString ?
      data.sort((a, b) => b[field].localeCompare(a[field])) :
      data.sort((a, b) => b[field] - a[field]);
      setData(sorted);
    } else { syncData(); }
    // update current field in sort methods & return all others to ''
    let methods = { ...sortMethods };
    for (let key in methods) { methods[key] = ''; }
    methods[field] = method;
    setSortMethods(methods);
  };

  const sortHandler = field => {
    if (data.length < 2) { return; }
    field = getCorrectField(field);
    // sort method cycles through none -> ascending -> descending -> none...
    let method = '';
    if (sortMethods[field] === '') { method = 'Descend'; }
    else if (sortMethods[field] === 'Descend') { method = 'Ascend'; }
    sortData(method, field);
  };

  const getClass = field => {
    // get caret icon class based on field and current sorting method
    field = getCorrectField(field);
    if (sortMethods[field] === '') { return classes.Neutral; }
    else if (sortMethods[field] === 'Ascend') { return classes.Ascend; }
    else { return classes.Descend; }
  };

  const getCorrectField = field => {
    // get correct field value due to differences in field names between the modes
    let isInvestment = props.mode === 'Stocks' || props.mode === 'Cryptos';
    if (field === 'symbol' && !isInvestment) { field = 'name'; }
    else if (field === 'name' && !isInvestment) { field = 'desc'; }
    else if (field === 'quantity' && !isInvestment) { field = 'value'; }
    return field;
  };

  return (
    <div className={props.normal ? null : (props.mode === 'Stocks' || props.mode === 'Cryptos' ? classes.TableContainer : classes.AssetTableContainer)}>
      <table className={props.normal ? classes.NormalTable : classes.Table}>
        <thead>
          <tr className={classes.HeaderFields}>
            <th>{props.mode === 'Stocks' ? 'Ticker' : props.mode === 'Cryptos' ? 'Symbol' : 'Name'}
              {props.normal && <span onClick={() => sortHandler('symbol')} className={getClass('symbol')}>
                {sortMethods[getCorrectField('symbol')] === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th>
            <th>{props.mode === 'Stocks' ? 'Company Name' : props.mode === 'Cryptos' ? 'Cryptocurrency' : 'Description'}
              {props.normal && <span onClick={() => sortHandler('name')} className={getClass('name')}>
                {sortMethods[getCorrectField('name')] === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th>
            <th>{props.mode === 'Stocks' ? 'Shares' : props.mode === 'Cryptos' ? 'Quantity': 'Value'}
              {props.normal && <span onClick={() => sortHandler('quantity')} className={getClass('quantity')}>
                {sortMethods[getCorrectField('quantity')] === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th>
            {props.mode === 'Stocks' || props.mode === 'Cryptos' ? <th>Price
              {props.normal && <span onClick={() => sortHandler('price')} className={getClass('price')}>
                {sortMethods.price === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th> : null}
            {props.mode === 'Stocks' || props.mode === 'Cryptos' ? <th>Value
              {props.normal && <span onClick={() => sortHandler('value')} className={getClass('value')}>
                {sortMethods.value === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th> : null}
          </tr>
        </thead>
        <tbody>
          {props.mode === 'Stocks' ? (
            data.map((stock, i) => (
              <tr key={i}>
                <td className={classes.Symbol}>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>{Number(stock.quantity).toLocaleString(undefined, { maximumFractionDigits: 5 })}</td>
                <td>{stock.price === '?' ? '?' : `$${Number(stock.price).toFixed(2)}`}</td>
                <td className={classes.Value}>{stock.value === '?' ? '?' : `$${Number(stock.value).toFixed(2)}`}</td>
              </tr>
          ))) : props.mode === 'Cryptos' ? (
            data.map((crypto, i) => (
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
            data.map((asset, i) => (
              <tr key={i}>
                <td className={classes.Symbol}>{asset.name}</td>
                <td>{asset.desc}</td>
                <td className={classes.Value}>${Number(asset.value).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            data.map((debt, i) => (
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
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos,
  assets: state.portfolio.otherAssets,
  debts: state.portfolio.liabilities
});

export default connect(mapStateToProps)(InvestmentTable);