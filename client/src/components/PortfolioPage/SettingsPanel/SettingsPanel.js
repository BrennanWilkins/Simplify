import React, { useState, useRef, useEffect } from 'react';
import classes from './SettingsPanel.module.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Select from '../../UI/Select/Select';
import { instance as axios } from '../../../axios';
import { calcNetWorth } from '../../../utils/valueCalcs';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import { NumInput } from '../../UI/Inputs/Inputs';
import PortPanelContainer from '../PortPanelContainer/PortPanelContainer';

const SettingsPanel = props => {
  const [selectedName, setSelectedName] = useState('');
  const [selected, setSelected] = useState({
    name: '', symbol: '', quantity: 0, price: 0, value: 0, identifier: 'Manual'
  });
  const [priceVal, setPriceVal] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [options, setOptions] = useState([]);
  const priceRef = useRef();
  const isStock = props.mode === 'Stock';

  useEffect(() => {
    // set options based on mode & if panel shown
    if (props.show) {
      if (props.mode === 'Stock') {
        setOptions(props.stocks.filter(stock => stock.identifier === 'Manual').map(stock => ({ value: stock.name, label: stock.name }))); }
      else { setOptions(props.cryptos.filter(crypto => crypto.identifier === 'Manual').map(crypto => ({ value: crypto.name, label: crypto.name }))); }
    }
  }, [props.mode, props.show, props.stocks, props.cryptos]);

  const closeHandler = () => {
    setSelected({ name: '', symbol: '', quantity: 0, price: 0, value: 0, identifier: 'Manual' });
    setPriceVal(0);
    setSelectedName('');
    setErr(false);
    setErrMsg('');
    setOptions([]);
    props.close();
  };

  const setValHandler = val => {
    setErr(false);
    setErrMsg('');
    setPriceVal(val);
  };

  const selectHandler = selectedOption => {
    if (!selectedOption) {
      setSelectedName('');
      return setSelected({ name: '', symbol: '', quantity: 0, price: 0, value: 0, identifier: 'Manual' });
    }
    setSelectedName(selectedOption);
    setErr(false);
    setErrMsg('');
    // find stock/crypto from the selected value & update price val
    const curr = isStock ? props.stocks.filter(stock => stock.identifier === 'Manual') :
    props.cryptos.filter(crypto => crypto.identifier === 'Manual');
    const match = curr.find(inv => inv.name === selectedOption.value);
    setSelected({ ...match });
    setPriceVal(match.price);
    priceRef.current.focus();
  };

  const confirmHandler = async () => {
    const newPortfolio = isStock ? [...props.stocks] : [...props.cryptos];
    const index = newPortfolio.findIndex(data => data.name === selected.name);
    const newData = { ...newPortfolio[index] };
    const newPrice = Number(priceVal);
    newData.price = newPrice;
    newData.value = newPrice * newData.quantity;
    newPortfolio[index] = { ...newData };
    const updatedPortfolio = { ...props.portfolio };
    if (isStock) { updatedPortfolio.stocks = [...newPortfolio]; }
    else { updatedPortfolio.cryptos = [...newPortfolio]; }
    const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
    if (props.isDemo) {
      props.setNetWorthData(updatedNetWorth);
      isStock ? props.changeStock(newPortfolio) : props.changeCrypto(newPortfolio);
      props.addNotif(`${props.mode} price updated`);
      return closeHandler();
    }
    try {
      isStock ? await axios.put('portfolio/changeStock', { ...newData }) :
      await axios.put('portfolio/changeCrypto', { ...newData });
      const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
      props.setNetWorthData(resp.data.result.dataPoints);
      isStock ? props.changeStock(newPortfolio) : props.changeCrypto(newPortfolio);
      props.addNotif(`${props.mode} price updated`);
      closeHandler();
    } catch(e) { setErr(true); setErrMsg('Error connecting to the server.'); }
  };

  return (
    <PortPanelContainer show={props.show} close={closeHandler} down={props.down}
    left={isStock ? (props.small ? '165px' : '258px') : (props.small ? '177px' : '200px')}>
      <p className={classes.Text} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>
        {isStock ?
        'Change the price of a manually added stock' :
        'Change the price of a manually added cryptocurrency'}
      </p>
      <Select options={options} change={selectHandler} val={selectedName} />
      <div className={selectedName !== '' ? classes.ShowInput : classes.HideInput} style={props.dark ? { background: 'var(--panelBack)'} : null}>
        <NumInput val={priceVal} change={setValHandler} ref={priceRef} dark2={props.dark} />
        <BlueBtn clicked={confirmHandler}>Confirm</BlueBtn>
        <p className={err ? classes.ShowErr : classes.HideErr} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>{errMsg}</p>
      </div>
    </PortPanelContainer>
  );
};

const mapStateToProps = state => ({
  cryptos: state.portfolio.cryptos,
  stocks: state.portfolio.stocks,
  portfolio: state.portfolio,
  netWorthData: state.netWorth.netWorthData,
  isDemo: state.auth.isDemo,
  dark: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  changeCrypto: cryptos => dispatch(actions.changeCrypto(cryptos)),
  changeStock: stocks => dispatch(actions.changeStock(stocks)),
  setNetWorthData: data => dispatch(actions.setNetWorthData(data)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);
