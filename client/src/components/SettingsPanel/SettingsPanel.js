import React, { useState, useRef, useEffect } from 'react';
import classes from './SettingsPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import '../UI/ReactSelectStyles.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Select from 'react-select';
import { instance as axios } from '../../axios';
import { calcNetWorth } from '../../utils/valueCalcs';
import BlueBtn from '../UI/BlueBtn/BlueBtn';

const originalSelected = { name: '', symbol: '', quantity: 0, price: 0, value: 0, identifier: 'Manual' };

const SettingsPanel = props => {
  const [selectedName, setSelectedName] = useState('');
  const [selected, setSelected] = useState({ ...originalSelected });
  const [priceVal, setPriceVal] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showInput, setShowInput] = useState(false);
  const panelRef = useRef();

  useEffect(() => {
    if (props.show) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.mode, props.show]);

  const handleClick = e => {
    // close panel on outside click
    if (panelRef.current.contains(e.target)) { return; }
    closeHandler();
  };

  const closeHandler = () => {
    setSelected({ ...originalSelected });
    setPriceVal(0);
    setSelectedName('');
    setErr(false);
    setErrMsg('');
    setShowInput(false);
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
    setPriceVal(val);
  };

  const stocks = props.stocks.filter(stock => stock.identifier === 'Manual');
  const cryptos = props.cryptos.filter(crypto => crypto.identifier === 'Manual');

  const selectHandler = (selectedOption) => {
    if (!selectedOption) {
      setSelectedName('');
      setShowInput(false);
      return setSelected({ ...originalSelected });
    }
    setShowInput(true);
    setSelectedName(selectedOption);
    setErr(false);
    setErrMsg('');
    if (props.mode === 'Stock') {
      const stockMatch = stocks.find(stock => stock.name === selectedOption.value);
      setSelected({ ...stockMatch });
      setPriceVal(stockMatch.price);
    } else {
      const cryptoMatch = cryptos.find(crypto => crypto.name === selectedOption.value);
      setSelected({ ...cryptoMatch });
      setPriceVal(cryptoMatch.price);
    }
  };

  // options used for the select element
  const stockOptions = stocks.map(stock => ({ value: stock.name, label: stock.name }));
  const cryptoOptions = cryptos.map(crypto => ({ value: crypto.name, label: crypto.name }));

  const confirmHandler = () => {
    const newPortfolio = props.mode === 'Stock' ? [...props.stocks] : [...props.cryptos];
    const index = newPortfolio.findIndex(data => data.name === selected.name);
    const newData = { ...newPortfolio[index] };
    const newPrice = Number(priceVal);
    newData.price = newPrice;
    newData.value = newPrice * newData.quantity;
    newPortfolio[index] = { ...newData };
    const updatedPortfolio = { ...props.portfolio };
    if (props.mode === 'Stock') {
      updatedPortfolio.stocks = [...newPortfolio];
      const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
      if (props.isDemo) {
        props.setNetWorthData(updatedNetWorth);
        props.changeStock(newPortfolio);
        props.addNotif('Stock price updated');
        return closeHandler();
      } else {
        axios.put('portfolio/changeStock', { ...newData }).then(res => {
          axios.put('netWorth', { netWorthData: updatedNetWorth }).then(resp => {
            props.setNetWorthData(resp.data.result.dataPoints);
            props.changeStock(newPortfolio);
            props.addNotif('Stock price updated');
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
    } else {
      updatedPortfolio.cryptos = [...newPortfolio];
      const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
      if (props.isDemo) {
        props.setNetWorthData(updatedNetWorth);
        props.changeCrypto(newPortfolio);
        props.addNotif('Crypto price updated');
        return closeHandler();
      }
      axios.put('portfolio/changeCrypto', { ...newData }).then(res => {
        axios.put('netWorth', { netWorthData: updatedNetWorth }).then(resp => {
          props.setNetWorthData(resp.data.result.dataPoints);
          props.changeCrypto(newPortfolio);
          props.addNotif('Crypto price updated');
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

  return (
    <div ref={panelRef} className={props.mode === 'Stock' ?
      (props.show ? classes.StockPanel : classes.StockPanelHide) :
      (props.show ? classes.CryptoPanel : classes.CryptoPanelHide)}>
      <div className={classes.BtnDiv}>
        <CloseBtn close={closeHandler} />
      </div>
      <p className={classes.Text}>
        {props.mode === 'Stock' ?
        'Change the price of a manually added stock' :
        'Change the price of a manually added cryptocurrency'}
      </p>
      <Select options={props.mode === 'Stock' ? stockOptions : cryptoOptions}
        className={classes.Dropdown} onChange={selectHandler} isSearchable
        value={selectedName} classNamePrefix="react-select" />
      <div className={showInput ? classes.ShowInput : classes.HideInput}>
        <input value={priceVal} onChange={setValHandler} />
        <BlueBtn clicked={confirmHandler}>Confirm</BlueBtn>
        <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      </div>
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
  setNetWorthData: (data) => dispatch(actions.setNetWorthData(data)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);
