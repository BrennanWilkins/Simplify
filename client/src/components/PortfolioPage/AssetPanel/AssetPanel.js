import React, { useState, useEffect, useRef } from 'react';
import classes from './AssetPanel.module.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { instance as axios } from '../../../axios';
import { calcNetWorth } from '../../../utils/valueCalcs';
import Select from '../../UI/Select/Select';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import { Input, NumInput } from '../../UI/Inputs/Inputs';
import PortPanelContainer from '../PortPanelContainer/PortPanelContainer';

const AssetPanel = props => {
  const [titleText, setTitleText] = useState('');
  const [panelLeft, setPanelLeft] = useState('135px');
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
  const nameRef = useRef();
  const valRef = useRef();

  useEffect(() => {
    // set options/titleText/panel position based on curr mode
    switch(props.mode) {
      case 'AddAsset':
        setTitleText('Add a new asset');
        setPanelLeft('-68px');
        break;
      case 'RemoveAsset':
        setTitleText('Select an asset to remove it from your portfolio');
        setPanelLeft('112px');
        setOptions(props.otherAssets.map(asset => ({ value: asset.desc, label: asset.desc })));
        break;
      case 'AddDebt':
        setTitleText('Add a new liability');
        setPanelLeft('-68px');
        break;
      case 'RemoveDebt':
        setTitleText('Select a liability to remove it from your portfolio');
        setPanelLeft('112px');
        setOptions(props.liabilities.map(debt => ({ value: debt.desc, label: debt.desc })));
        break;
      case 'SettingsAsset':
        setTitleText('Select an asset to change its value');
        setPanelLeft('220px');
        setOptions(props.otherAssets.map(asset => ({ value: asset.desc, label: asset.desc })));
        break;
      default:
        setTitleText('Select a liability to change its value');
        setPanelLeft('220px');
        setOptions(props.liabilities.map(debt => ({ value: debt.desc, label: debt.desc })));
        break;
    }
  }, [props.mode, props.show]);

  useEffect(() => {
    // focus category input on show
    if (props.show && props.mode.includes('Add')) { setTimeout(() => nameRef.current.focus(), 400); }
  }, [props.mode, props.show]);

  useEffect(() => btnClassHandler(), [inputName, inputDesc, inputValue]);

  useEffect(() => {
    // focus input if asset/liability is selected
    if ((props.mode === 'SettingsAsset' || props.mode === 'SettingsDebt') && selectedName !== '') {
      valRef.current.focus();
    }
  }, [props.mode, selectedName]);

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
      const assetMatch = props.otherAssets.find(asset => asset.desc === option.value);
      setSelected({ ...assetMatch });
      setNewValue(assetMatch.value);
    } else if (props.mode === 'SettingsDebt' || props.mode === 'RemoveDebt') {
      const debtMatch = props.liabilities.find(debt => debt.desc === option.value);
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
        if (asset.desc === data.desc) {
          setErr(true);
          setErrMsg(`You already have ${data.desc.length < 15 ? data.desc : 'that asset'} in your portfolio.`);
          return false;
        }
      }
    }
    if (props.mode === 'AddDebt') {
      for (let debt of props.liabilities) {
        if (debt.desc === data.desc) {
          setErr(true);
          setErrMsg(`You already have ${data.desc.length < 15 ? data.desc : 'that liability'} in your portfolio.`);
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
        updatedPortfolio.otherAssets = curr.filter(asset => asset.desc !== selected.desc);
        msg = 'Asset removed from portfolio';
      }
      if (props.mode === 'AddDebt') {
        curr.unshift({ ...data });
        updatedPortfolio.liabilities = curr;
        msg = 'Liability added to portfolio';
      }
      if (props.mode === 'RemoveDebt') {
        updatedPortfolio.liabilities = curr.filter(debt => debt.desc !== selected.desc);
        msg = 'Liability removed from portfolio';
      }
      if (props.mode === 'SettingsAsset') {
        const index = curr.findIndex(asset => asset.desc === data.desc);
        curr[index].value = data.value;
        updatedPortfolio.otherAssets = curr;
        msg = 'Asset updated in portfolio';
      }
      if (props.mode === 'SettingsDebt') {
        const index = curr.findIndex(debt => debt.desc === data.desc);
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
        const res = await axios.put('portfolio/removeAsset', { desc: selected.desc });
        updatedPortfolio.otherAssets = res.data.assets;
        msg = 'Asset removed from portfolio';
      } else if (props.mode === 'AddDebt') {
        // add liability to portfolio
        const res = await axios.put('portfolio/addDebt', { ...data });
        updatedPortfolio.liabilities = res.data.debts;
        msg = 'Liability added to portfolio';
      } else if (props.mode === 'RemoveDebt') {
        // remove liability from portfolio
        const res = await axios.put('portfolio/removeDebt', { desc: selected.desc });
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

  const inputHandler = (val, field) => {
    if (val.length > 70) { setErr(true); return setErrMsg(`Please enter a valid ${field}.`); }
    field === 'category' ? setInputName(val) : setInputDesc(val);
    setErr(false);
  };

  return (
    <PortPanelContainer show={props.show} close={closeHandler} left={panelLeft} down={props.down} small={props.small}>
      <p className={(props.mode === 'AddAsset' || props.mode === 'AddDebt') ? classes.Text2 : classes.Text}
      style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>{titleText}</p>
      {props.mode !== 'AddAsset' && props.mode !== 'AddDebt' ?
        <div style={{marginBottom: (props.mode === 'SettingsAsset' || props.mode === 'SettingsDebt') ? '0' : '15px'}}>
          <Select options={options} change={selectHandler} val={selectedName} /></div>
        :
        <div className={classes.Inputs} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>
          <div>
            <p>Category</p>
            <Input val={inputName} change={val => inputHandler(val, 'category')} ref={nameRef} dark2={props.dark} />
          </div>
          <div>
            <p>Description</p>
            <Input val={inputDesc} change={val => inputHandler(val, 'description')} dark2={props.dark} />
          </div>
          <div>
            <p>Value</p>
            <NumInput val={inputValue} change={val => { setInputValue(val); setErr(false); }} dark2={props.dark} />
          </div>
        </div>
      }
      {(props.mode === 'SettingsAsset' || props.mode === 'SettingsDebt') && selectedName !== '' ?
        <div className={classes.NewValueInput}>
          <NumInput val={newValue} change={newValueHandler} ref={valRef} dark2={props.dark} />
        </div>
      : null}
      <div className={confirmClass} style={(props.mode === 'SettingsAsset' || props.mode === 'SettingsDebt') ? {marginTop: '20px'} : null}>
        <BlueBtn clicked={confirmHandler}>Confirm</BlueBtn></div>
      <p className={err ? classes.ShowErr : classes.HideErr} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>{errMsg}</p>
    </PortPanelContainer>
  );
};

const mapStateToProps = state => ({
  otherAssets: state.portfolio.otherAssets,
  liabilities: state.portfolio.liabilities,
  portfolio: state.portfolio,
  netWorthData: state.netWorth.netWorthData,
  isDemo: state.auth.isDemo,
  dark: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  setNetWorthData: data => dispatch(actions.setNetWorthData(data)),
  updateAssets: assets => dispatch(actions.updateAssets(assets)),
  updateDebts: debts => dispatch(actions.updateDebts(debts)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetPanel);
