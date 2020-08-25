import React, { useState } from 'react';
import classes from './SettingsPanel.module.css';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import '../../UI/ReactSelectStyles.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Select from 'react-select';
import { instance as axios } from '../../../axios';
import { calcNetWorth } from '../../../utils/valueCalcs';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import { NumInput } from '../../UI/Inputs/Inputs';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';

const originalSelected = { name: '', symbol: '', quantity: 0, price: 0, value: 0, identifier: 'Manual' };

const SettingsPanel = props => {
  const [selectedName, setSelectedName] = useState('');
  const [selected, setSelected] = useState({ ...originalSelected });
  const [priceVal, setPriceVal] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showInput, setShowInput] = useState(false);

  const closeHandler = () => {
    setSelected({ ...originalSelected });
    setPriceVal(0);
    setSelectedName('');
    setErr(false);
    setErrMsg('');
    setShowInput(false);
    props.close();
  };

  const setValHandler = val => {
    setErr(false);
    setErrMsg('');
    setPriceVal(val);
  };

  const stocks = props.stocks.filter(stock => stock.identifier === 'Manual');
  const cryptos = props.cryptos.filter(crypto => crypto.identifier === 'Manual');

  const selectHandler = selectedOption => {
    if (!selectedOption) {
      setSelectedName('');
      setShowInput(false);
      return setSelected({ ...originalSelected });
    }
    setShowInput(true);
    setSelectedName(selectedOption);
    setErr(false);
    setErrMsg('');
    // find stock/crypto from the selected value & update price val
    const curr = props.mode === 'Stock' ? stocks : cryptos;
    const match = curr.find(inv => inv.name === selectedOption.value);
    setSelected({ ...match });
    setPriceVal(match.price);
  };

  const confirmHandler = async () => {
    const newPortfolio = props.mode === 'Stock' ? [...props.stocks] : [...props.cryptos];
    const index = newPortfolio.findIndex(data => data.name === selected.name);
    const newData = { ...newPortfolio[index] };
    const newPrice = Number(priceVal);
    newData.price = newPrice;
    newData.value = newPrice * newData.quantity;
    newPortfolio[index] = { ...newData };
    const updatedPortfolio = { ...props.portfolio };
    if (props.mode === 'Stock') { updatedPortfolio.stocks = [...newPortfolio]; }
    else { updatedPortfolio.cryptos = [...newPortfolio]; }
    const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
    if (props.isDemo) {
      props.setNetWorthData(updatedNetWorth);
      props.mode === 'Stock' ? props.changeStock(newPortfolio) : props.changeCrypto(newPortfolio);
      props.addNotif(`${props.mode} price updated`);
      return closeHandler();
    }
    try {
      const res = props.mode === 'Stock' ? await axios.put('portfolio/changeStock', { ...newData }) :
      await axios.put('portfolio/changeCrypto', { ...newData });
      const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
      props.setNetWorthData(resp.data.result.dataPoints);
      props.mode === 'Stock' ? props.changeStock(newPortfolio) : props.changeCrypto(newPortfolio);
      props.addNotif(`${props.mode} price updated`);
      closeHandler();
    } catch(e) { setErr(true); setErrMsg('Error connecting to the server.'); }
  };

  // options used for the select element
  const stockOptions = stocks.map(stock => ({ value: stock.name, label: stock.name }));
  const cryptoOptions = cryptos.map(crypto => ({ value: crypto.name, label: crypto.name }));

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.mode === 'Stock' ?
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
          <NumInput val={priceVal} change={setValHandler} />
          <BlueBtn clicked={confirmHandler}>Confirm</BlueBtn>
          <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
        </div>
      </div>
    </PanelContainer>
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
