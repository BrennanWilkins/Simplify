import React, { useState, useEffect } from 'react';
import classes from './AnalysisPanel.module.css';
import Select from '../../UI/Select/Select';
import { connect } from 'react-redux';
import PremiumContainer from '../PremiumContainer/PremiumContainer';
import Spinner from '../../UI/Spinner/Spinner';
import { instance as axios } from '../../../axios';
import { formatNum } from '../../../utils/formatNum';
import Chart from '../../UI/Chart/Chart';

const AnalysisPanel = props => {
  const [selected, setSelected] = useState({ value: '', label: '' });
  const [options, setOptions] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState({
    high: 0,
    low: 0,
    mean: 0,
    median: 0
  });
  const [recom, setRecom] = useState({
    buy: [],
    sell: [],
    hold: [],
    strongBuy: [],
    strongSell: []
  });
  const [EPSActual, setEPSActual] = useState([]);
  const [EPSEstimate, setEPSEstimate] = useState([]);

  useEffect(() => {
    const stockOptions = props.stocks.filter(stock => stock.identifier !== 'Manual')
    .map(stock => ({ value: stock.symbol, label: stock.name }));
    setOptions(stockOptions);
  }, [props.stocks]);

  const closeHandler = () => {
    setErr(false);
    setCodeInvalid(false);
    setLoading(false);
    setErrMsg('');
    setSelected({ value: '', label: '' });
    resetData();
    props.close();
  };

  const resetData = () => {
    setTarget({ high: 0, low: 0, mean: 0, median: 0 });
    setEPSActual([]);
    setEPSEstimate([]);
    setRecom({ buy: [], sell: [], hold: [], strongBuy: [], strongSell: [] });
  };

  const selectHandler = selectedOption => {
    if (!selectedOption) { return setSelected({ value: '', label: '' }); }
    setSelected({ ...selectedOption });
    setErr(false);
    getData(selectedOption.value);
  };

  const getData = ticker => {
    if (loading) { return; }
    if (accessCode === '' && !props.isAuth) { return setSelected({ value: '', label: '' }); }
    setLoading(true);
    const url = props.isAuth ? `portfolio/authAnalysis/${ticker}` : `portfolio/analysis/${accessCode}/${ticker}`;
    axios.get(url).then(res => {
      setLoading(false);
      const tar = res.data.target;
      setTarget({ high: tar.targetHigh, low: tar.targetLow, mean: tar.targetMean, median: tar.targetMedian });
      setEPSActual(res.data.earnings.map(pt => ({ x: new Date(pt.period), y: Number(pt.actual.toFixed(2)) })));
      setEPSEstimate(res.data.earnings.map(pt => ({ x: new Date(pt.period), y: Number(pt.estimate.toFixed(2)) })));
      const recomData = res.data.recommendation.slice(0, 7);
      setRecom({
        buy: recomData.map(pt => ({ x: new Date(pt.period), y: pt.buy })),
        sell: recomData.map(pt => ({ x: new Date(pt.period), y: pt.sell })),
        hold: recomData.map(pt => ({ x: new Date(pt.period), y: pt.hold })),
        strongBuy: recomData.map(pt => ({ x: new Date(pt.period), y: pt.strongBuy })),
        strongSell: recomData.map(pt => ({ x: new Date(pt.period), y: pt.strongSell }))
      });
    }).catch(err => {
      setLoading(false);
      resetData();
      if (err.response && err.response.status === 401 && !props.isAuth) { setCodeInvalid(true); errHandler('Invalid access code.'); }
      else if (err.response && err.response.status === 400) { errHandler(`The analysis could not be retrieved for ${ticker}`); }
      else { errHandler('There was an error connecting to the server.'); }
    });
  };

  const errHandler = msg => {
    setErr(true);
    setErrMsg(msg);
  };

  const earningsOptions = {
    animationEnabled: true,
    theme: 'light2',
    exportEnabled: false,
    toolTip: { content: '{x}: ${y}' },
    axisY: { title: 'Quarterly EPS' },
    data: [{
      type: 'scatter',
      name: 'Actual',
      markerType: 'circle',
      markerSize: 30,
      showInLegend: true,
      color: 'rgb(26, 171, 152)',
      fillOpacity: '0.7',
      dataPoints: EPSActual
    },
    {
      type: 'scatter',
      name: 'Estimate',
      markerType: 'circle',
      markerSize: 30,
      showInLegend: true,
      color: 'rgb(15, 119, 147)',
      fillOpacity: '0.7',
      dataPoints: EPSEstimate
    }]
  };

  const recomOptions = {
    animationEnabled: true,
    theme: 'light2',
    exportEnabled: false,
    axisY: { title: 'Number of analysts' },
    legend: { maxWidth: 300 },
    data: [{
      type: 'stackedColumn',
      name: 'Buy',
      yValueFormatString: '#,### Buy',
      showInLegend: true,
      fillOpacity: '1',
      dataPoints: recom.buy
    },
    {
      type: 'stackedColumn',
      name: 'Sell',
      yValueFormatString: '#,### Sell',
      showInLegend: true,
      fillOpacity: '1',
      dataPoints: recom.sell
    },
    {
      type: 'stackedColumn',
      name: 'Hold',
      yValueFormatString: '#,### Hold',
      showInLegend: true,
      fillOpacity: '1',
      dataPoints: recom.hold
    },
    {
      type: 'stackedColumn',
      name: 'Strong Buy',
      yValueFormatString: '#,### Strong Buy',
      showInLegend: true,
      fillOpacity: '1',
      dataPoints: recom.strongBuy
    },
    {
      type: 'stackedColumn',
      name: 'Strong Sell',
      yValueFormatString: '#,### Strong Sell',
      showInLegend: true,
      fillOpacity: '1',
      dataPoints: recom.strongSell
    }]
  };

  return (
    <PremiumContainer title="Stock Analysis" show={props.show} close={closeHandler} accessCode={accessCode}
    codeInvalid={codeInvalid} accessHandler={val => { setCodeInvalid(false); setAccessCode(val); }} isAuth={props.isAuth}>
      <div className={classes.Content}>
        <div className={classes.SubTitle}>Select a stock from your portfolio to retrieve its analysis</div>
        <div className={classes.Select}>
          <Select options={options} change={selectHandler} val={selected} />
          {loading && <Spinner mode="Analysis" />}
        </div>
        <div className={err ? classes.Err : classes.HideErr}>{errMsg}</div>
        <div className={selected.value === '' || loading || err ? classes.HideData : classes.Data}>
          <div className={classes.StockTitle}><span>{selected.value}</span>-<span>{selected.label}</span></div>
          <div className={classes.Title}>{target.mean === 0 ? `No price targets were found for ${selected.value}.` :
          'Current quarter analyst price targets'}</div>
          {target.mean !== 0 &&
            <div className={classes.Targets}>
              <div>
                <span>High: ${formatNum(target.high)}</span>
                <span>Low: ${formatNum(target.low)}</span>
              </div>
              <div>
                <span>Mean: ${formatNum(target.mean)}</span>
                <span>Median: ${formatNum(target.median)}</span>
              </div>
            </div>}
          {EPSActual.length > 0 ?
            <div className={classes.Chart}>
              <div className={classes.ChartTitle}>EPS Actual vs. EPS Estimate</div>
              <Chart options={earningsOptions} />
            </div>
          : <div className={classes.Title}>No EPS data was found for {selected.value}.</div>}
          {recom.buy.length > 0 ?
            <div className={classes.Chart}>
              <div className={classes.ChartTitle}>Recommendation Trends</div>
              <Chart options={recomOptions} />
            </div>
            : <div className={classes.Title}>No recommendation trend data was found for {selected.value}.</div>}
        </div>
      </div>
    </PremiumContainer>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(AnalysisPanel);
