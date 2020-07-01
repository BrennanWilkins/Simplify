import React, { useState, useRef, useEffect } from 'react';
import classes from './BuySellPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import * as actions from '../../store/actions/index';
import { instance as axios } from '../../axios';
import { calcNetWorth } from '../../utils/valueCalcs';

const originalSelected = { name: '', symbol: '', quantity: 0, price: 0, value: 0 };

const BuySellPanel = props => {
  const [selected, setSelected] = useState({ ...originalSelected });
  const [selectedName, setSelectedName] = useState('');
  const [selectedVal, setSelectedVal] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const panelRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.mode, props.show]);

  useEffect(() => {
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClick = (e) => {
    if (panelRef.current.contains(e.target)) { return; }
    closeHandler();
  };

  const closeHandler = () => {
    setSelected({ ...originalSelected });
    setSelectedVal(0);
    setSelectedName('');
    setErr(false);
    setErrMsg('');
    props.close();
  };

  const setValHandler = (e) => {
    setErr(false);
    setErrMsg('');
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    setSelectedVal(val);
  };

  const confirmHandler = () => {
    if (selectedVal === 0) { return; }
    if (selectedVal > selected.quantity) {
      setErr(true);
      setErrMsg(`You do not own enough${props.mode === 'SellStock' ? ' shares of' : ''} ${selected.symbol} to sell that much.`);
      return;
    }
    const newPortfolio = props.mode === 'BuyStock' || props.mode === 'SellStock' ?
    [...props.stocks] : [...props.cryptos];
    const index = newPortfolio.findIndex(data => data.name === selected.name);
    const newData = { ...newPortfolio[index] };
    const newQuantity = props.mode === 'BuyStock' || props.mode === 'BuyCrypto' ?
    Number(Number(newData.quantity) + Number(selectedVal)) :
    Number(Number(newData.quantity) - Number(selectedVal));
    newData.quantity = newQuantity;
    newData.value = newData.price * newQuantity;

    if (props.mode === 'BuyStock' || props.mode === 'SellStock') {
      axios.put('portfolio/changeStock', { ...newData }).then(res => {
        newPortfolio[index] = { ...newData };
        const updatedPortfolio = { ...props.portfolio };
        updatedPortfolio.stocks = [...newPortfolio];
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        axios.put('netWorth', { netWorthData: updatedNetWorth }).then(res => {
          props.setNetWorthData(res.data.result.dataPoints);
          props.changeStock(newPortfolio);
          closeHandler();
        }).catch(err => {
          setErr(true);
          setErrMsg('Error connecting to the server.');
        });
      }).catch(err => {
        setErr(true);
        setErrMsg('Error connecting to the server.');
      });
    } else {
      axios.put('portfolio/changeCrypto', { ...newData }).then(res => {
        newPortfolio[index] = { ...newData };
        const updatedPortfolio = { ...props.portfolio };
        updatedPortfolio.cryptos = [...newPortfolio];
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        axios.put('netWorth', { netWorthData: updatedNetWorth }).then(res => {
          props.setNetWorthData(res.data.result.dataPoints);
          props.changeCrypto(newPortfolio);
          closeHandler();
        }).catch(err => {
          setErr(true);
          setErrMsg('Error connecting to the server.');
        });
      }).catch(err => {
        setErr(true);
        setErrMsg('Error connecting to the server.');
      });
    }
  };

  const selectHandler = (e) => {
    const val = e.target.value;
    setSelectedName(val);
    setErr(false);
    setErrMsg('');
    setSelectedVal(0);
    if (val === '') { return setSelected({ ...originalSelected }); }
    if (props.mode === 'BuyStock' || props.mode === 'SellStock') {
      const stockMatch = props.stocks.find(stock => stock.name === val);
      setSelected({ ...stockMatch });
    } else {
      const cryptoMatch = props.cryptos.find(crypto => crypto.name === val);
      setSelected({ ...cryptoMatch });
    }
  };

  return (
    <div ref={panelRef} className={props.mode === 'BuyStock' || props.mode === 'SellStock' ?
      (props.show ? classes.StockPanel : classes.StockPanelHide) :
      (props.show ? classes.CryptoPanel : classes.CryptoPanelHide)}>
    <div className={classes.BtnDiv}>
      <CloseBtn close={closeHandler} />
    </div>
    <p className={classes.Text}>
      {props.mode === 'BuyStock' ?
      'Which stock did you buy?' :
      props.mode === 'SellStock' ?
      'Which stock did you sell?' :
      props.mode === 'BuyCrypto' ?
      'Which cryptocurrency did you buy?' :
      'Which cryptocurrency did you sell?'}
    </p>
    <select className={classes.Dropdown} value={selectedName} onChange={selectHandler}>
      <option value="" hidden></option>
      {props.mode === 'BuyStock' || props.mode === 'SellStock' ?
      props.stocks.map((stock, i) => (
        <option value={stock.name} key={stock.name}>
          {stock.name}
        </option>
      )) :
      props.cryptos.map((crypto, i) => (
        <option value={crypto.name} key={crypto.name}>
          {crypto.name}
        </option>
      ))
      }
    </select>
    <p className={selectedName === '' ? classes.HideText : classes.Text}>
      {props.mode === 'BuyStock' ?
      `How many shares of ${selected.symbol} did you buy?` :
      props.mode === 'SellStock' ?
      `How many shares of ${selected.symbol} did you sell?` :
      props.mode === 'BuyCrypto' ?
      `How much ${selected.symbol} did you buy?` :
      `How much ${selected.symbol} did you sell?`}
    </p>
    <div className={selectedName === '' ? classes.HideInputDiv : classes.InputDiv}>
      <input disabled={selectedName === ''} type="text" className={classes.Input}
        value={selectedVal} onChange={setValHandler} />
      {props.mode === 'SellStock' || props.mode === 'SellCrypto' ? (
        <button className={classes.AllBtn} onClick={() => setSelectedVal(selected.quantity)}>All</button>
      ) : null}
    </div>
    <button onClick={confirmHandler} className={selectedName === '' ? classes.HideConfirmBtn : classes.ConfirmBtn}>
      Confirm
    </button>
    <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  cryptos: state.portfolio.cryptos,
  stocks: state.portfolio.stocks,
  portfolio: state.portfolio,
  netWorthData: state.netWorth.netWorthData
});

const mapDispatchToProps = dispatch => ({
  changeCrypto: (cryptos) => dispatch(actions.changeCrypto(cryptos)),
  changeStock: (stocks) => dispatch(actions.changeStock(stocks)),
  setNetWorthData: (data) => dispatch(actions.setNetWorthData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BuySellPanel);
