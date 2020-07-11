import React, { useState, useRef, useEffect } from 'react';
import classes from './AssetPanel.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { instance as axios } from '../../axios';
import { calcNetWorth } from '../../utils/valueCalcs';
import Select from 'react-select';
import '../UI/ReactSelectStyles.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';

const AssetPanel = props => {
  const [titleText, setTitleText] = useState('');
  const [panelClass, setPanelClass] = useState(classes.Hide);
  const [confirmClass, setConfirmClass] = useState(classes.HideConfirm);
  const [options, setOptions] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [selected, setSelected] = useState(null);
  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [newValue, setNewValue] = useState('');
  const panelRef = useRef();

  useEffect(() => {
    switch(props.mode) {
      case 'AddAsset':
        setTitleText('Add a new asset');
        if (props.show) { setPanelClass(classes.AddAsset); }
        else { setPanelClass(classes.HideAddAsset); }
        break;
      case 'RemoveAsset':
        setTitleText('Select an asset to remove it from your portfolio');
        if (props.show) { setPanelClass(classes.RemoveAsset); }
        else { setPanelClass(classes.HideRemoveAsset); }
        setOptions(props.otherAssets.map(asset => ({ value: asset.name, label: asset.name })));
        break;
      case 'AddDebt':
        setTitleText('Add a new liability');
        if (props.show) { setPanelClass(classes.AddDebt); }
        else { setPanelClass(classes.HideAddDebt); }
        break;
      case 'RemoveDebt':
        setTitleText('Select a liability to remove it from your portfolio');
        if (props.show) { setPanelClass(classes.RemoveDebt); }
        else { setPanelClass(classes.HideRemoveDebt); }
        setOptions(props.liabilities.map(debt => ({ value: debt.name, label: debt.name })));
        break;
      case 'SettingsAsset':
        setTitleText('Select an asset to change its value');
        if (props.show) { setPanelClass(classes.SettingsAsset); }
        else { setPanelClass(classes.HideSettingsAsset); }
        setOptions(props.otherAssets.map(asset => ({ value: asset.name, label: asset.name })));
        break;
      default:
        setTitleText('Select a liability to change its value');
        if (props.show) { setPanelClass(classes.SettingsDebt); }
        else { setPanelClass(classes.HideSettingsDebt); }
        setOptions(props.liabilities.map(debt => ({ value: debt.name, label: debt.name })));
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
    setTitleText('');
    setConfirmClass(classes.HideConfirm);
    setOptions(null);
    setSelectedName('');
    setSelected(null);
    setInputName('');
    setInputDesc('');
    setInputValue('');
    setErr(false);
    setErrMsg('');
    setNewValue('');
    props.close();
  };

  const selectHandler = (option) => {
    if (!option) {
      setSelectedName('');
      setConfirmClass(classes.HideConfirm);
      return setSelected(null);
    }
    setSelectedName(option);
    setErr(false);
    setErrMsg('');
    setConfirmClass(classes.Confirm);
    if (props.mode === 'SettingsAsset' || props.mode === 'RemoveAsset') {
      const assetMatch = props.otherAssets.find(asset => asset.name === option.value);
      setSelected({ ...assetMatch });
      setNewValue(assetMatch.value);
    } else if (props.mode === 'SettingsDebt' || props.mode === 'RemoveDebt') {
      const debtMatch = props.liabilities.find(debt => debt.name === option.value);
      setSelected({ ...debtMatch });
      setNewValue(debtMatch.value);
    }
  };

  const inputNameHandler = (e) => {
    setInputName(e.target.value);
    setErr(false);
    setErrMsg('');
    if (e.target.value.length > 0 && inputDesc.length > 0 && inputValue.length > 0) {
      setConfirmClass(classes.Confirm);
    } else { setConfirmClass(classes.HideConfirm); }
  };

  const inputDescHandler = (e) => {
    setInputDesc(e.target.value);
    setErr(false);
    setErrMsg('');
    if (e.target.value.length > 0 && inputName.length > 0 && inputValue.length > 0) {
      setConfirmClass(classes.Confirm);
    } else { setConfirmClass(classes.HideConfirm); }
  };

  const inputValueHandler = (e) => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    setInputValue(val);
    setErr(false);
    setErrMsg('');
    if (val.length > 0 && inputDesc.length > 0 && inputName.length > 0) {
      setConfirmClass(classes.Confirm);
    } else { setConfirmClass(classes.HideConfirm); }
  };

  const newValueHandler = (e) => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    setNewValue(val);
    setErr(false);
    setErrMsg('');
  };

  const errHandler = () => {
    setErr(true);
    setErrMsg('Error connecting to the server.');
  };

  const confirmHandler = async () => {
    const updatedPortfolio = { ...props.portfolio };
    if (props.mode === 'AddAsset') {
      const data = { name: inputName, desc: inputDesc, value: inputValue };
      for (let asset of props.otherAssets) {
        if (asset.name === data.name) {
          setErr(true);
          return setErrMsg(`You already have ${data.name} in your portfolio`);
        }
      }
      if (props.isDemo) {
        const otherAssets = [...updatedPortfolio.otherAssets];
        otherAssets.unshift({ ...data });
        updatedPortfolio.otherAssets = otherAssets;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        props.setNetWorthData(updatedNetWorth);
        props.updateAssets(otherAssets);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/addAsset', { ...data });
        updatedPortfolio.otherAssets = res.data.assets;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.updateAssets(res.data.assets);
        return closeHandler();
      } catch(e) { return errHandler(); }
    } else if (props.mode === 'RemoveAsset') {
      if (props.isDemo) {
        const otherAssets = [...updatedPortfolio.otherAssets];
        const index = otherAssets.findIndex(asset => asset.name === selected.name);
        otherAssets.splice(index, 1);
        updatedPortfolio.otherAssets = otherAssets;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        props.setNetWorthData(updatedNetWorth);
        props.updateAssets(otherAssets);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/removeAsset', { name: selected.name });
        updatedPortfolio.otherAssets = res.data.assets;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.updateAssets(res.data.assets);
        return closeHandler();
      } catch(e) { return errHandler(); }
    } else if (props.mode === 'AddDebt') {
      const data = { name: inputName, desc: inputDesc, value: inputValue };
      for (let debt of props.liabilities) {
        if (debt.name === data.name) {
          setErr(true);
          return setErrMsg(`You already have ${data.name} in your portfolio`);
        }
      }
      if (props.isDemo) {
        const liabilities = [...updatedPortfolio.liabilities];
        liabilities.unshift({ ...data });
        updatedPortfolio.liabilities = liabilities;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        props.setNetWorthData(updatedNetWorth);
        props.updateDebts(liabilities);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/addDebt', { ...data });
        updatedPortfolio.liabilities = res.data.debts;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.updateDebts(res.data.debts);
        return closeHandler();
      } catch(e) { return errHandler(); }
    } else if (props.mode === 'RemoveDebt') {
      if (props.isDemo) {
        const liabilities = [...updatedPortfolio.liabilities];
        const index = liabilities.findIndex(debt => debt.name === selected.name);
        liabilities.splice(index, 1);
        updatedPortfolio.liabilities = liabilities;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        props.setNetWorthData(updatedNetWorth);
        props.updateDebts(liabilities);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/removeDebt', { name: selected.name });
        updatedPortfolio.liabilities = res.data.debts;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.updateDebts(res.data.debts);
        return closeHandler();
      } catch(e) { return errHandler(); }
    } else if (props.mode === 'SettingsAsset') {
      const data = { name: selected.name, desc: selected.desc, value: newValue };
      if (props.isDemo) {
        const otherAssets = [...updatedPortfolio.otherAssets];
        const index = otherAssets.findIndex(asset => asset.name === data.name);
        otherAssets[index].value = data.value;
        updatedPortfolio.otherAssets = otherAssets;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        props.setNetWorthData(updatedNetWorth);
        props.updateAssets(otherAssets);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/updateAsset', { ...data });
        updatedPortfolio.otherAssets = res.data.assets;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.updateAssets(res.data.assets);
        return closeHandler();
      } catch(e) { return errHandler(); }
    } else {
      const data = { name: selected.name, desc: selected.desc, value: newValue };
      if (props.isDemo) {
        const liabilities = [...updatedPortfolio.liabilities];
        const index = liabilities.findIndex(debt => debt.name === data.name);
        liabilities[index].value = data.value;
        updatedPortfolio.liabilities = liabilities;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        props.setNetWorthData(updatedNetWorth);
        props.updateDebts(liabilities);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/updateDebt', { ...data });
        updatedPortfolio.liabilities = res.data.debts;
        const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.updateDebts(res.data.debts);
        return closeHandler();
      } catch(e) { return errHandler(); }
    }
  };

  return (
    <div ref={panelRef} className={panelClass}>
      <div className={classes.BtnDiv}>
        <CloseBtn close={closeHandler} />
      </div>
      <p className={classes.Text}>{titleText}</p>
      {options ?
        <Select options={options} className={classes.Dropdown} onChange={selectHandler}
          isSearchable value={selectedName} classNamePrefix="react-select" />
        :
        <div className={classes.Inputs}>
          <div>
            <p>Name</p>
            <input value={inputName} onChange={inputNameHandler} />
          </div>
          <div>
            <p>Description</p>
            <input value={inputDesc} onChange={inputDescHandler} />
          </div>
          <div>
            <p>Value</p>
            <input value={inputValue} onChange={inputValueHandler} />
          </div>
        </div>
      }
      {(props.mode === 'SettingsAsset' || props.mode === 'SettingsDebt') && selectedName !== '' ?
        <input className={classes.NewValueInput} value={newValue} onChange={newValueHandler} />
      : null}
      <button onClick={confirmHandler} className={confirmClass}>Confirm</button>
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  otherAssets: state.portfolio.otherAssets,
  liabilities: state.portfolio.liabilities,
  portfolio: state.portfolio,
  netWorthData: state.netWorth.netWorthData,
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setNetWorthData: (data) => dispatch(actions.setNetWorthData(data)),
  updateAssets: (assets) => dispatch(actions.updateAssets(assets)),
  updateDebts: (debts) => dispatch(actions.updateDebts(debts))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetPanel);
