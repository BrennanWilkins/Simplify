import React, { useState, useEffect } from 'react';
import classes from './PriceChartPanel.module.css';
import { StockChart } from '../../UI/Chart/Chart';
import { instance as axios } from '../../../axios';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { connect } from 'react-redux';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import Spinner from '../../UI/Spinner/Spinner';

const PriceChartPanel = props => {
  const [priceData, setPriceData] = useState({ dps1: [], dps2: [], dps3: [] });
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.show) { getData(); }
  }, [props.show, props.symbol]);

  const closeHandler = () => {
    setErr(false);
    setErrMsg('');
    setLoading(false);
    setPriceData({ dps1: [], dps2: [], dps3: [] });
    props.close();
  };

  const getData = async () => {
    if (loading) { return; }
    setLoading(true);
    setErr(false);
    try {
      if (props.mode === 'Stock') {
        const data = await axios.get(`portfolio/stockPriceData/${props.symbol}`);
        setLoading(false);
        const stockData = data.data.stockData;
        const dps1 = []; const dps2 = []; const dps3 = [];
        for (let i = 0; i < stockData.length; i++) {
          dps1.push({ x: new Date(stockData[i].date), y: [stockData[i].open, stockData[i].high, stockData[i].low, stockData[i].close] });
          dps2.push({ x: new Date(stockData[i].date), y: stockData[i].volume });
          dps3.push({ x: new Date(stockData[i].date), y: stockData[i].close });
        }
        setPriceData({ dps1, dps2, dps3 });
      } else {
        const data = await axios.get(`portfolio/cryptoPriceData/${props.symbol}`);
        setLoading(false);
        const cryptoData = data.data.cryptoData;
        const dps1 = []; const dps2 = []; const dps3 = [];
        for (let i = 0; i < cryptoData.length; i++) {
          dps1.push({ x: new Date(cryptoData[i].date), y: cryptoData[i].price });
          dps2.push({ x: new Date(cryptoData[i].date), y: cryptoData[i].volume });
        }
        setPriceData({ dps1, dps2, dps3 });
      }
    } catch(e) {
      setErr(true);
      setLoading(false);
      if (e.response && e.response.status === 400) {
        setErrMsg(`${props.mode === 'Stock' ? 'Stock' : 'Cryptocurrency'} price data could not be retrieved for ${props.symbol}.`);
      } else { setErrMsg('There was an error connecting to the server.'); }
    }
  };

  const options = {
    theme: 'light2',
    charts: [{
      axisX: {
        lineThickness: 5,
        tickLength: 0,
        labelFormatter: e => '',
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: e => ''
        }
      },
      axisY: {
        prefix: '$',
        tickLength: 0
      },
      toolTip: { shared: true },
      data: [{
        name: 'Price (in USD)',
        yValueFormatString: '$#,###.##',
        type: props.mode === 'Stock' ? 'candlestick' : 'spline',
        dataPoints : priceData.dps1
      }]
    },{
      height: 100,
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: 'Volume',
        prefix: '$',
        tickLength: 0
      },
      toolTip: { shared: true },
      data: [{
        name: 'Volume',
        yValueFormatString: '$#,###.##',
        type: 'column',
        dataPoints : priceData.dps2
      }]
    }],
    navigator: {
      dynamicUpdate: false,
      data: [{
        dataPoints: props.mode === 'Stock' ? priceData.dps3 : priceData.dps1
      }],
      slider: {
        minimum: priceData.dps1.length ? priceData.dps1[0].x : new Date(),
        maximum: priceData.dps1.length ? priceData.dps1[priceData.dps1.length - 1].x : new Date()
      }
    }
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.show ? classes.Panel : `${classes.Panel} ${classes.Hide}`}>
        <div className={classes.CloseBtn}><CloseBtn close={closeHandler} /></div>
        <div className={classes.SelectBar}>
          {props.mode === 'Stock' ? props.stocks.map((stock, i) => (
            <span className={props.symbol === stock.symbol ? classes.Active : classes.Inactive}
            onClick={() => stock.identifier === 'Normal' ? props.changeStock(stock.symbol) : null} key={i}
            style={i === 0 ? {marginLeft: 'auto'} : i === props.stocks.length - 1 ? {marginRight: 'auto'} : undefined}>
              {stock.symbol}
              <div className={classes.FocusBorder}></div>
            </span>
          )) : props.cryptos.map((crypto, i) => (
            <span className={props.symbol === crypto.symbol ? classes.Active : classes.Inactive}
            onClick={() => crypto.identifier === 'Normal' ? props.changeCrypto(crypto.symbol) : null} key={i}
            style={i === 0 ? {marginLeft: 'auto'} : i === props.cryptos.length - 1 ? {marginRight: 'auto'} : undefined}>
              {crypto.symbol}
              <div className={classes.FocusBorder}></div>
            </span>
          ))}
        </div>
        <div className={err ? classes.Err : classes.HideErr}>{errMsg}</div>
        {loading && <Spinner mode="PriceChart" />}
        {!err && !loading && priceData.dps1.length !== 0 && <div className={classes.Content}>
          <div className={classes.Title}>{props.symbol} Price and Volume Chart</div>
          <StockChart options={options} />
        </div>}
      </div>
    </PanelContainer>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos
});

export default connect(mapStateToProps)(PriceChartPanel);
