import React, { useState, useRef, useEffect } from 'react';
import classes from './BuySellPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import * as actions from '../../store/actions/index';
import { instance as axios } from '../../axios';
import { calcNetWorth } from '../../utils/valueCalcs';
import Select from 'react-select';
import '../UI/ReactSelectStyles.css';

const originalSelected = { name: '', symbol: '', quantity: 0, price: 0, value: 0, identifier: 'Normal' };

const BuySellPanel = props => {
  const [selected, setSelected] = useState({ ...originalSelected });
  const [selectedName, setSelectedName] = useState('');
  const [selectedVal, setSelectedVal] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [panelClass, setPanelClass] = useState(classes.Hide);
  const [titleText, setTitleText] = useState('');
  const panelRef = useRef();

  useEffect(() => {
    switch(props.mode) {
      case 'BuyStock':
        if (props.show) { setPanelClass(classes.BuyStock); }
        else { setPanelClass(classes.HideBuyStock); }
        setTitleText('Which stock did you buy?');
        break;
      case 'SellStock':
        if (props.show) { setPanelClass(classes.SellStock); }
        else { setPanelClass(classes.HideSellStock); }
        setTitleText('Which stock did you sell?');
        break;
      case 'BuyCrypto':
        if (props.show) { setPanelClass(classes.BuyCrypto); }
        else { setPanelClass(classes.HideBuyCrypto); }
        setTitleText('Which cryptocurrency did you buy?');
        break;
      default:
        if (props.show) { setPanelClass(classes.SellCrypto); }
        else { setPanelClass(classes.HideSellCrypto); }
        setTitleText('Which cryptocurrency did you sell?');
        break;
    }
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
    setTitleText('');
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

  const confirmHandler = async () => {
    if (selectedVal === 0) { return; }
    if ((props.mode === 'SellStock' || props.mode === 'SellCrypto') && selectedVal > selected.quantity) {
      setErr(true);
      return setErrMsg(`You do not own enough${props.mode === 'SellStock' ? ' shares of' : ''} ${selected.symbol} to sell that much.`);
    }
    if (selectedVal === selected.quantity) {
      if (props.mode === 'SellStock') {
        const stocks = [...props.stocks];
        const index = stocks.findIndex(stock => stock.name === selected.name);
        stocks.splice(index, 1);
        const updatedPortfolio = { ...props.portfolio };
        updatedPortfolio.stocks = [...stocks];
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        if (props.isDemo) {
          props.setNetWorthData(updatedNetWorth);
          props.changeStock(stocks);
          return closeHandler();
        }
        try {
          const res = await axios.put('portfolio/deleteStock', { identifier: selected.identifier, name: selected.name });
          const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
          props.setNetWorthData(resp.data.result.dataPoints);
          props.changeStock(stocks);
          return closeHandler();
        } catch(e) {
          setErr(true);
          return setErrMsg('Error connecting to the server.');
        }
      }
      if (props.mode === 'SellCrypto') {
        const cryptos = [...props.cryptos];
        const index = cryptos.findIndex(crypto => crypto.name === selected.name);
        cryptos.splice(index, 1);
        const updatedPortfolio = { ...props.portfolio };
        updatedPortfolio.cryptos = [...cryptos];
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        if (props.isDemo) {
          props.setNetWorthData(updatedNetWorth);
          props.changeCrypto(cryptos);
          return closeHandler();
        }
        try {
          const res = await axios.put('portfolio/deleteCrypto', { identifier: selected.identifier, name: selected.name });
          const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
          props.setNetWorthData(resp.data.result.dataPoints);
          props.changeCrypto(cryptos);
          return closeHandler();
        } catch(e) {
          setErr(true);
          return setErrMsg('Error connecting to the server.');
        }
      }
    }
    const newPortfolio = props.mode === 'BuyStock' || props.mode === 'SellStock' ?
    [...props.stocks] : [...props.cryptos];
    const index = newPortfolio.findIndex(data => data.name === selected.name);
    const newData = { ...newPortfolio[index] };
    const newQuantity = props.mode === 'BuyStock' || props.mode === 'BuyCrypto' ?
    Number(Number(newData.quantity) + Number(selectedVal)) :
    Number(Number(newData.quantity) - Number(selectedVal));
    newData.quantity = Number(newQuantity);
    newData.value = Number(newData.price * newQuantity);
    newPortfolio[index] = { ...newData };
    const updatedPortfolio = { ...props.portfolio };
    if (props.mode === 'BuyStock' || props.mode === 'SellStock') {
      updatedPortfolio.stocks = [...newPortfolio];
      const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
      if (props.isDemo) {
        props.setNetWorthData(updatedNetWorth);
        props.changeStock(newPortfolio);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/changeStock', { ...newData });
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.changeStock(newPortfolio);
        closeHandler();
      } catch(e) {
        setErr(true);
        setErrMsg('Error connecting to the server.');
      }
    } else {
      updatedPortfolio.cryptos = [...newPortfolio];
      const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
      if (props.isDemo) {
        props.setNetWorthData(updatedNetWorth);
        props.changeCrypto(newPortfolio);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/changeCrypto', { ...newData });
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.changeCrypto(newPortfolio);
        closeHandler();
      } catch(e) {
        setErr(true);
        setErrMsg('Error connecting to the server.');
      }
    }
  };

  const selectHandler = (selectedOption) => {
    if (!selectedOption) {
      setSelectedName('');
      return setSelected({ ...originalSelected });
    }
    setSelectedName(selectedOption);
    setErr(false);
    setErrMsg('');
    setSelectedVal(0);
    if (props.mode === 'BuyStock' || props.mode === 'SellStock') {
      const stockMatch = props.stocks.find(stock => stock.name === selectedOption.value);
      setSelected({ ...stockMatch });
    } else {
      const cryptoMatch = props.cryptos.find(crypto => crypto.name === selectedOption.value);
      setSelected({ ...cryptoMatch });
    }
  };

  const stockOptions = props.stocks.map(stock => ({ value: stock.name, label: stock.name }));
  const cryptoOptions = props.cryptos.map(crypto => ({ value: crypto.name, label: crypto.name }));

  return (
    <div ref={panelRef} className={panelClass}>
      <div className={classes.BtnDiv}>
        <CloseBtn close={closeHandler} />
      </div>
      <p className={classes.Text}>{titleText}</p>
      <Select options={props.mode === 'BuyStock' || props.mode === 'SellStock' ? stockOptions : cryptoOptions}
        className={classes.Dropdown} onChange={selectHandler} isSearchable value={selectedName} classNamePrefix="react-select" />
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
  netWorthData: state.netWorth.netWorthData,
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  changeCrypto: (cryptos) => dispatch(actions.changeCrypto(cryptos)),
  changeStock: (stocks) => dispatch(actions.changeStock(stocks)),
  setNetWorthData: (data) => dispatch(actions.setNetWorthData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BuySellPanel);
