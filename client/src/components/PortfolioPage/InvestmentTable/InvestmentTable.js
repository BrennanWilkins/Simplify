import React, { useState, useEffect } from 'react';
import classes from './InvestmentTable.module.css';
import { connect } from 'react-redux';
import { caretIcon, caretNeutralIcon, stockChartIcon } from '../../UI/UIIcons';
import { formatNum } from '../../../utils/formatNum';

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
    if (data.length < 2 || !props.normal) { return; }
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
    <div className={props.normal ? (props.dark ? `${classes.NormalContainer} ${classes.Dark}` : classes.NormalContainer) :
      (props.mode === 'Stocks' || props.mode === 'Cryptos' ?
      (props.dark ? `${classes.Container} ${classes.Dark}` : classes.Container) :
      (props.dark ? `${classes.Container} ${classes.AssetContainer} ${classes.Dark}` : `${classes.Container} ${classes.AssetContainer}`))}>
      <table className={props.normal ? (props.dark ? `${classes.NormalTable} ${classes.DarkTable}` : classes.NormalTable) :
      (props.dark ? `${classes.Table} ${classes.DarkTable}` : classes.Table)}>
        <thead>
          <tr className={classes.HeaderFields}>
            <th onClick={() => sortHandler('symbol')}>{props.mode === 'Stocks' ? 'Ticker' : props.mode === 'Cryptos' ? 'Symbol' : 'Category'}
              {props.normal && <span className={getClass('symbol')}>
                {sortMethods[getCorrectField('symbol')] === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th>
            <th onClick={() => sortHandler('name')}>
              {props.mode === 'Stocks' ? 'Company Name' : props.mode === 'Cryptos' ? 'Name' : 'Description'}
              {props.normal && <span className={getClass('name')}>
                {sortMethods[getCorrectField('name')] === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th>
            <th onClick={() => sortHandler('quantity')}>{props.mode === 'Stocks' ? 'Shares' : props.mode === 'Cryptos' ? 'Quantity': 'Value'}
              {props.normal && <span className={getClass('quantity')}>
                {sortMethods[getCorrectField('quantity')] === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th>
            {props.mode === 'Stocks' || props.mode === 'Cryptos' ? <th onClick={() => sortHandler('price')}>Price
              {props.normal && <span className={getClass('price')}>
                {sortMethods.price === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th> : null}
            {props.mode === 'Stocks' || props.mode === 'Cryptos' ? <th onClick={() => sortHandler('value')}>Value
              {props.normal && <span className={getClass('value')}>
                {sortMethods.value === '' ? caretNeutralIcon : caretIcon}
              </span>}
            </th> : null}
            {props.normal && (props.mode === 'Stocks' || props.mode === 'Cryptos') && <th className={classes.SymbolHeader}></th>}
          </tr>
        </thead>
        <tbody>
          {props.mode === 'Stocks' ? (
            data.map((stock, i) => (
              <tr key={i}>
                <td className={classes.Symbol} style={stock.symbol.length > 5 ? {wordBreak: 'break-word'} : null}>{stock.symbol}</td>
                <td style={{wordBreak: 'break-word'}}>{stock.name}</td>
                <td>{Number(stock.quantity).toLocaleString(undefined, { maximumFractionDigits: 5 })}</td>
                <td>{stock.price === '?' ? '?' : `$${formatNum(stock.price)}`}</td>
                <td className={classes.Value}>{stock.value === '?' ? '?' : `$${formatNum(stock.value)}`}</td>
                {props.normal && (props.mode === 'Stocks' || props.mode === 'Cryptos') &&
                <td onClick={() => stock.identifier === 'Normal' ? props.showChart(stock.symbol, 'Stock') : null}
                className={classes.ChartBtn}>{stockChartIcon}</td>}
              </tr>
          ))) : props.mode === 'Cryptos' ? (
            data.map((crypto, i) => (
              <tr key={i}>
                <td className={classes.Symbol} style={!crypto.cmcID && crypto.symbol.length > 5  ? {wordBreak: 'break-word'} : null}>
                  {crypto.cmcID ? <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.cmcID}.png`} alt="" /> : crypto.symbol}
                </td>
                <td style={{wordBreak: 'break-word'}}>{crypto.name}</td>
                <td>{Number(crypto.quantity).toLocaleString(undefined, { maximumFractionDigits: 5 })}</td>
                <td>{crypto.price === '?' ? '?' : `$${formatNum(crypto.price)}`}</td>
                <td className={classes.Value}>{crypto.value === '?' ? '?' : `$${formatNum(crypto.value)}`}</td>
                {props.normal && (props.mode === 'Stocks' || props.mode === 'Cryptos') &&
                <td onClick={() => crypto.identifier === 'Normal' ? props.showChart(crypto.symbol, 'Crypto') : null}
                className={classes.ChartBtn}>{stockChartIcon}</td>}
              </tr>
            ))
          ) : props.mode === 'Assets' ? (
            data.map((asset, i) => (
              <tr key={i}>
                <td className={classes.Symbol} style={{wordBreak: 'break-word'}}>{asset.name}</td>
                <td  style={{wordBreak: 'break-word'}}>{asset.desc}</td>
                <td className={classes.Value}>${formatNum(asset.value)}</td>
              </tr>
            ))
          ) : (
            data.map((debt, i) => (
              <tr key={i}>
                <td className={classes.Symbol} style={{wordBreak: 'break-word'}}>{debt.name}</td>
                <td style={{wordBreak: 'break-word'}}>{debt.desc}</td>
                <td className={classes.Value}>${formatNum(debt.value)}</td>
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
  debts: state.portfolio.liabilities,
  dark: state.theme.darkMode,
  cryptoIDs: state.portfolio.cryptoIDs
});

export default connect(mapStateToProps)(InvestmentTable);
