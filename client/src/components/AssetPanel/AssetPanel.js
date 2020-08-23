import React, { useState, useEffect } from 'react';
import classes from './AssetPanel.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { instance as axios } from '../../axios';
import { calcNetWorth } from '../../utils/valueCalcs';
import Select from 'react-select';
import '../UI/ReactSelectStyles.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { Input, NumInput } from '../UI/Inputs/Inputs';
import PanelContainer from '../PanelContainer/PanelContainer';

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
  }, [props.mode, props.show]);

  useEffect(() => btnClassHandler(), [inputName, inputDesc, inputValue]);

  const closeHandler = () => {
    setTitleText('');
    setConfirmClass(classes.HideConfirm);
    setOptions(null);
    setSelectedName('');
    setSelected(null);
    setInputName('');
    setInputDesc('');
    setInputValue('');
    errHandler(false);
    setNewValue('');
    props.close();
  };

  const selectHandler = option => {
    if (!option) {
      setSelectedName('');
      setConfirmClass(classes.HideConfirm);
      return setSelected(null);
    }
    setSelectedName(option);
    errHandler(false);
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

  const btnClassHandler = () => {
    errHandler(false);
    // show confirm btn if all fields arent empty
    if (inputName.length > 0 && inputDesc.length > 0 && inputValue.length > 0) {
      setConfirmClass(classes.Confirm);
    } else { setConfirmClass(classes.HideConfirm); }
  };

  const newValueHandler = val => {
    setNewValue(val);
    errHandler(false);
  };

  const errHandler = bool => {
    if (bool) {setErr(true); return setErrMsg('Error connecting to the server.'); }
    setErr(false); setErrMsg('');
  };

  const confirmValid = data => {
    if (props.mode === 'AddAsset') {
      for (let asset of props.otherAssets) {
        // must have diff names
        if (asset.name === data.name) {
          setErr(true);
          setErrMsg(`You already have ${data.name} in your portfolio`);
          return false;
        }
      }
    }
    if (props.mode === 'AddDebt') {
      for (let debt of props.liabilities) {
        if (debt.name === data.name) {
          setErr(true);
          setErrMsg(`You already have ${data.name} in your portfolio`);
          return false;
        }
      }
    }
    return true;
  };

  const confirmHandler = async () => {
    const updatedPortfolio = { ...props.portfolio };
    const data = props.mode.includes('Settings') ? { value: newValue, name: selected.name, desc: selected.desc } :
    { name: inputName, desc: inputDesc, value: inputValue };
    // return if fields not valid
    if (!confirmValid(data)) { return; }
    const curr = props.mode.includes('Asset') ? [...updatedPortfolio.otherAssets] :
    [...updatedPortfolio.liabilities];
    if (props.isDemo) {
      let msg = '';
      if (props.mode === 'AddAsset') {
        curr.unshift({ ...data });
        updatedPortfolio.otherAssets = curr;
        msg = 'Asset added to portfolio';
      }
      if (props.mode === 'RemoveAsset') {
        updatedPortfolio.otherAssets = curr.filter(asset => asset.name !== selected.name);
        msg = 'Asset removed from portfolio';
      }
      if (props.mode === 'AddDebt') {
        curr.unshift({ ...data });
        updatedPortfolio.liabilities = curr;
        msg = 'Liability added to portfolio';
      }
      if (props.mode === 'RemoveDebt') {
        updatedPortfolio.liabilities = curr.filter(debt => debt.name !== selected.name);
        msg = 'Liability removed from portfolio';
      }
      if (props.mode === 'SettingsAsset') {
        const index = curr.findIndex(asset => asset.name === data.name);
        curr[index].value = data.value;
        updatedPortfolio.otherAssets = curr;
        msg = 'Asset updated in portfolio';
      }
      if (props.mode === 'SettingsDebt') {
        const index = curr.findIndex(debt => debt.name === data.name);
        curr[index].value = data.value;
        updatedPortfolio.liabilities = curr;
        msg = 'Liability updated in portfolio';
      }
      // update net worth
      const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
      if (props.mode.includes('Asset')) { props.updateAssets(updatedPortfolio.otherAssets); }
      else { props.updateDebts(updatedPortfolio.liabilities); }
      props.setNetWorthData(updatedNetWorth);
      props.addNotif(msg);
      return closeHandler();
    }
    try {
      let msg = '';
      if (props.mode === 'AddAsset') {
        // add asset to portfolio
        const res = await axios.put('portfolio/addAsset', { ...data });
        updatedPortfolio.otherAssets = res.data.assets;
        msg = 'Asset added to portfolio';
      } else if (props.mode === 'RemoveAsset') {
        // remove asset from portfolio
        const res = await axios.put('portfolio/removeAsset', { name: selected.name });
        updatedPortfolio.otherAssets = res.data.assets;
        msg = 'Asset removed from portfolio';
      } else if (props.mode === 'AddDebt') {
        // add liability to portfolio
        const res = await axios.put('portfolio/addDebt', { ...data });
        updatedPortfolio.liabilities = res.data.debts;
        msg = 'Liability added to portfolio';
      } else if (props.mode === 'RemoveDebt') {
        // remove liability from portfolio
        const res = await axios.put('portfolio/removeDebt', { name: selected.name });
        updatedPortfolio.liabilities = res.data.debts;
        msg = 'Liability removed from portfolio';
      } else if (props.mode === 'SettingsAsset') {
        // update price of asset in portfolio
        const res = await axios.put('portfolio/updateAsset', { ...data });
        updatedPortfolio.otherAssets = res.data.assets;
        msg = 'Asset updated in portfolio';
      } else {
        // update value of liability in portfolio
        const res = await axios.put('portfolio/updateDebt', { ...data });
        updatedPortfolio.liabilities = res.data.debts;
        msg = 'Liability updated in portfolio';
      }
      // update net worth
      const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
      const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
      props.setNetWorthData(resp.data.result.dataPoints);
      if (props.mode.includes('Asset')) { props.updateAssets(updatedPortfolio.otherAssets); }
      if (props.mode.includes('Debt')) { props.updateDebts(updatedPortfolio.liabilities); }
      props.addNotif(msg);
      return closeHandler();
    } catch(e) { return errHandler(true); }
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={panelClass}>
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
              <Input val={inputName} change={val => setInputName(val)} />
            </div>
            <div>
              <p>Description</p>
              <Input val={inputDesc} change={val => setInputDesc(val)} />
            </div>
            <div>
              <p>Value</p>
              <NumInput val={inputValue} change={val => setInputValue(val)} />
            </div>
          </div>
        }
        {(props.mode === 'SettingsAsset' || props.mode === 'SettingsDebt') && selectedName !== '' ?
          <div className={classes.NewValueInput}>
            <NumInput val={newValue} change={newValueHandler} />
          </div>
        : null}
        <button onClick={confirmHandler} className={confirmClass}>Confirm</button>
        <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      </div>
    </PanelContainer>
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
  setNetWorthData: data => dispatch(actions.setNetWorthData(data)),
  updateAssets: assets => dispatch(actions.updateAssets(assets)),
  updateDebts: debts => dispatch(actions.updateDebts(debts)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetPanel);
