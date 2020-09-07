import React, { useState, useEffect } from 'react';
import classes from './Highlights.module.css';
import { connect } from 'react-redux';
import { formatNum } from '../../../utils/formatNum';
import * as actions from '../../../store/actions';
import { instance as axios } from '../../../axios';
import { arrowRight } from '../../UI/UIIcons';

const Highlights = props => {
  const [NWchange, setNWChange] = useState(0);
  const [showErr, setShowErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (props.netWorthData.length >= 2) {
      // calculate change in net worth since last log in
      let diff = props.netWorthData[props.netWorthData.length - 1].value - props.netWorthData[props.netWorthData.length - 2].value;
      setNWChange(diff);
    }
    if (!props.stocks.length && !props.cryptos.length) {
      setErrMsg('Add more stocks and cryptocurrencies to your portfolio to get more highlights.');
      return setShowErr(true);
    }

    const getData = async () => {
      try {
        const stockNames = props.stocks.filter(stock => stock.identifier !== 'Manual').map(stock => stock.symbol);
        const cryptoNames = props.cryptos.filter(crypto => crypto.identifier !== 'Manual').map(crypto => crypto.symbol);
        const data = await axios.post('portfolio/highlights', { stocks: stockNames, cryptos: cryptoNames });
        props.setHighlights(data.data);
      } catch(e) { setErrMsg('There was an error connecting to the server.'); setShowErr(true); }
    };

    // get highest/lowest performing stock/crypto this week on mount
    if (props.updateHighlights) { getData(); }
  }, [props.netWorthData, props.wasMounted, props.stocks, props.cryptos, props.setHighlights]);

  return (
    <div className={classes.Container}>
      <h1 className={classes.Title}>Today's Highlights</h1>
      <div className={classes.InfoContainer}>
        <div className={classes.InfoContent}>
          <div className={classes.Info}>{
            NWchange === 0 ? <span>Your net worth has not changed since the last time you logged in.</span> :
            <span>Your net worth has {NWchange > 0 ? 'increased' : 'decreased'} by <span className={NWchange > 0 ? classes.Green : classes.Red}>
            ${formatNum(Math.abs(NWchange))}</span> since you last logged in.</span>
          }</div>
          {props.highestStock.symbol !== '' &&
            <div className={`${classes.Info} ${classes.AnimIn}`}>
              <span className={classes.Bold}>{props.highestStock.symbol} </span>
              is your highest performing stock this week, {props.highestStock.change > 0 ? 'increasing' : 'decreasing'} in price by
              <span className={props.highestStock.change > 0 ? classes.Green : classes.Red}> {Math.abs((props.highestStock.change)).toFixed(2)}%.</span>
            </div>}
          {props.lowestStock.symbol !== '' &&
            <div className={`${classes.Info} ${classes.AnimIn}`}>
              <span className={classes.Bold}>{props.lowestStock.symbol} </span>
              is your lowest performing stock this week, {props.lowestStock.change > 0 ? 'increasing' : 'decreasing'} in price by
              <span className={props.lowestStock.change > 0 ? classes.Green : classes.Red}> {Math.abs((props.lowestStock.change)).toFixed(2)}%.</span>
            </div>}
          {props.highestCrypto.symbol !== '' &&
            <div className={`${classes.Info} ${classes.AnimIn}`}>
              <span className={classes.Bold}>{props.highestCrypto.symbol} </span>
              is your highest performing cryptocurrency this week, {props.highestCrypto.change > 0 ? 'increasing' : 'decreasing'} in price by
              <span className={props.highestCrypto.change > 0 ? classes.Green : classes.Red}> {Math.abs((props.highestCrypto.change)).toFixed(2)}%.</span>
            </div>}
          {props.lowestCrypto.symbol !== '' &&
            <div className={`${classes.Info} ${classes.AnimIn}`}>
              <span className={classes.Bold}>{props.lowestCrypto.symbol} </span>
              is your lowest performing cryptocurrency this week, {props.lowestCrypto.change > 0 ? 'increasing' : 'decreasing'} in price by
              <span className={props.lowestCrypto.change > 0 ? classes.Green : classes.Red}> {Math.abs((props.lowestCrypto.change)).toFixed(2)}%.</span>
            </div>}
          {showErr && <div className={classes.NoInfo}>{errMsg}</div>}
        </div>
        <div className={classes.NewsLink} onClick={props.openNews}>Get financial news{arrowRight}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  netWorthData: state.netWorth.netWorthData,
  updateHighlights: state.portfolio.updateHighlights,
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos,
  highestStock: state.portfolio.highlightData.highestStock,
  lowestStock: state.portfolio.highlightData.lowestStock,
  highestCrypto: state.portfolio.highlightData.highestCrypto,
  lowestCrypto: state.portfolio.highlightData.lowestCrypto
});

const mapDispatchToProps = dispatch => ({
  setHighlights: data => dispatch(actions.setHighlights(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);
