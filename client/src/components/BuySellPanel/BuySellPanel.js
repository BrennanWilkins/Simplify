import React, { useState, useRef, useEffect } from 'react';
import classes from './BuySellPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import * as actions from '../../store/actions/index';
import { instance as axios } from '../../axios';
import { calcNetWorth } from '../../utils/valueCalcs';
import Select from 'react-select';
import '../UI/ReactSelectStyles.css';
import { NumInput } from '../UI/Inputs/Inputs';

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
    // change panel UI based on mode (buy/sell/stocks/cryptos)
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
    if (props.show) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.mode, props.show]);

  const handleClick = e => {
    // close panel on click outside
    if (panelRef.current.contains(e.target)) { return; }
    closeHandler();
  };

  const closeHandler = () => {
    setSelected({ ...originalSelected });
    setSelectedVal(0);
    setSelectedName('');
    errHandler(false);
    setTitleText('');
    props.close();
  };

  const setValHandler = val => {
    errHandler(false);
    setSelectedVal(val);
  };

  const errHandler = bool => {
    if (bool) { setErr(true); return setErrMsg('Error connecting to the server.'); }
    setErr(false); setErrMsg('');
  }

  const confirmHandler = async () => {
    if (selectedVal === 0) { return; }
    // prevent update if selling more than have
    if (props.mode === 'SellStock' || props.mode === 'SellCrypto') {
      if (selectedVal > selected.quantity) {
        setErr(true);
        return setErrMsg(`You do not own enough${props.mode === 'SellStock' ? ' shares of' : ''} ${selected.symbol} to sell that much.`);
      }
      if (selectedVal === selected.quantity) {
        let sellStock = props.mode === 'SellStock';
        // if selling total value in portfolio then delete the stock/crypto from portfolio
        const currField = sellStock ? props.stocks : props.cryptos;
        const curr = currField.filter(inv => inv.name !== selected.name);
        const updatedPortfolio = { ...props.portfolio };
        if (sellStock) { updatedPortfolio.stocks = curr; }
        else { updatedPortfolio.cryptos = curr; }
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        if (props.isDemo) {
          // for demo mode only
          props.setNetWorthData(updatedNetWorth);
          sellStock ? props.changeStock(curr) : props.changeCrypto(curr);
          props.addNotif(`${selected.symbol} removed from portfolio`);
          return closeHandler();
        }
        const data = { identifier: selected.identifier, name: selected.name };
        try {
          const res = sellStock ? await axios.put('portfolio/deleteStock', { ...data }) :
          await axios.put('portfolio/deleteCrypto', { ...data });
          const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
          props.setNetWorthData(resp.data.result.dataPoints);
          sellStock ? props.changeStock(curr) : props.changeCrypto(curr);
          props.addNotif(`${selected.symbol} removed from portfolio`);
          return closeHandler();
        } catch(e) { return errHandler(true); }
      }
    }
    // not selling all of the stock/crypto, update portfolio & net worth
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
    let isStock = props.mode === 'BuyStock' || props.mode === 'SellStock';
    if (isStock) { updatedPortfolio.stocks = [...newPortfolio]; }
    else { updatedPortfolio.cryptos = [...newPortfolio]; }
    const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
    if (props.isDemo) {
      props.setNetWorthData(updatedNetWorth);
      isStock ? props.changeStock(newPortfolio) : props.changeCrypto(newPortfolio);
      props.addNotif(`${selected.symbol} updated in portfolio`);
      return closeHandler();
    }
    try {
      const res = isStock ? await axios.put('portfolio/changeStock', { ...newData }) :
      await axios.put('portfolio/changeCrypto', { ...newData });
      const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
      props.setNetWorthData(resp.data.result.dataPoints);
      isStock ? props.changeStock(newPortfolio) : props.changeCrypto(newPortfolio);
      props.addNotif(`${selected.symbol} updated in portfolio`);
      closeHandler();
    } catch(e) { return errHandler(true); }
  };

  const selectHandler = selectedOption => {
    if (!selectedOption) {
      setSelectedName('');
      return setSelected({ ...originalSelected });
    }
    setSelectedName(selectedOption);
    errHandler(false);
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
        <NumInput val={selectedVal} change={setValHandler} />
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
  changeCrypto: cryptos => dispatch(actions.changeCrypto(cryptos)),
  changeStock: stocks => dispatch(actions.changeStock(stocks)),
  setNetWorthData: data => dispatch(actions.setNetWorthData(data)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(BuySellPanel);
