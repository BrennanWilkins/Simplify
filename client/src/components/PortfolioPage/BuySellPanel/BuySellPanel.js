import React, { useState, useEffect, useRef } from 'react';
import classes from './BuySellPanel.module.css';
import { connect } from 'react-redux';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import * as actions from '../../../store/actions/index';
import { instance as axios } from '../../../axios';
import { calcNetWorth } from '../../../utils/valueCalcs';
import Select from '../../UI/Select/Select';
import { NumInput } from '../../UI/Inputs/Inputs';
import PortPanelContainer from '../PortPanelContainer/PortPanelContainer';

const BuySellPanel = props => {
  const [selected, setSelected] = useState({ name: '', symbol: '', quantity: 0, price: 0, value: 0, identifier: 'Normal' });
  const [selectedName, setSelectedName] = useState('');
  const [selectedVal, setSelectedVal] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [options, setOptions] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    // set options based on mode/panel shown
    if (props.show) {
      if (props.mode === 'BuyStock' || props.mode === 'SellStock') {
        setOptions(props.stocks.map(stock => ({ value: stock.name, label: stock.name })));
      } else { setOptions(props.cryptos.map(crypto => ({ value: crypto.name, label: crypto.name }))); }
    }
  }, [props.mode, props.show, props.stocks, props.cryptos]);

  useEffect(() => {
    // enter key submit if input field not 0
    const enterHandler = e => { if (e.key === 'Enter') { confirmHandler(); } };

    if (selectedVal !== 0) { document.addEventListener('keypress', enterHandler); }
    return () => document.removeEventListener('keypress', enterHandler);
  }, [selectedVal]);

  const closeHandler = () => {
    setSelected({ name: '', symbol: '', quantity: 0, price: 0, value: 0, identifier: 'Normal' });
    setSelectedVal(0);
    setSelectedName('');
    errHandler(false);
    setOptions([]);
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
          // retrieves today's highlights again if stock/crypto deleted
          props.setUpdateHighlights();
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
          // retrieves today's highlights again if stock/crypto deleted
          props.setUpdateHighlights();
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
      return setSelected({ name: '', symbol: '', quantity: 0, price: 0, value: 0, identifier: 'Normal' });
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
    inputRef.current.focus();
  };

  const calcLeft = () => {
    switch(props.mode) {
      case 'BuyStock': return props.show ? '455px' : '92.5px';
      case 'SellStock': return props.show ? '455px' : '157.5px';
      case 'BuyCrypto': return props.show ? '-205px' : '187.5px';
      default: return props.show ? '-205px' : '247.5px';
    }
  };

  return (
    <PortPanelContainer show={props.show} close={closeHandler} left={calcLeft()} down={props.down}>
      <p className={classes.Text}>{
        props.mode === 'BuyStock' ? 'Which stock did you buy?' :
        props.mode === 'SellStock' ? 'Which stock did you sell?' :
        props.mode === 'BuyCrypto' ? 'Which cryptocurrency did you buy?' :
        'Which cryptocurrency did you sell?'
      }</p>
      <Select options={options} change={selectHandler} val={selectedName} />
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
        <NumInput val={selectedVal} change={setValHandler} ref={inputRef} />
        {(props.mode === 'SellStock' || props.mode === 'SellCrypto') && (
          <div className={classes.AllBtn}><BlueBtn clicked={() => setSelectedVal(selected.quantity)}>All</BlueBtn></div>)}
      </div>
      <div className={selectedName === '' ? classes.HideConfirmBtn : classes.ConfirmBtn}>
        <BlueBtn clicked={confirmHandler}>Confirm</BlueBtn>
      </div>
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
    </PortPanelContainer>
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
  addNotif: msg => dispatch(actions.addNotif(msg)),
  setUpdateHighlights: () => dispatch(actions.setUpdateHighlights(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(BuySellPanel);
