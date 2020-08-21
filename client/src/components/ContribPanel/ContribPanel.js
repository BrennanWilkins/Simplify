import React, { useState, useEffect, useRef } from 'react';
import classes from './ContribPanel.module.css';
import { DateInput, NumInput } from '../UI/Inputs/Inputs';
import GreenBtn from '../UI/GreenBtn/GreenBtn';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import CloseBtn from '../UI/CloseBtn/CloseBtn';

const ContribPanel = props => {
  const panelRef = useRef();
  const [contribVal, setContribVal] = useState('');
  const [contribDate, setContribDate] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const handleClick = e => {
      // close panel on click outside
      if (panelRef.current.contains(e.target)) { return; }
      props.close();
    };

    if (props.show) {
      document.addEventListener('mousedown', handleClick);

      let date = new Date();
      let y = date.getFullYear();
      let m = '' + (date.getMonth() + 1);
      if (m.length < 2) { m = '0' + m; }
      let d = '' + date.getDate();
      if (d.length < 2) { d = '0' + d; }
      date = [y, m, d].join('-');
      setContribDate(date);
    }

    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  const closeHandler = () => {
    setContribVal('');
    setContribDate('');
    setErr(false);
    setErrMsg('');
    props.close();
  };

  const addHelper = contrib => {
    props.addContrib(contrib, props.id);
    props.addNotif('Contribution added');
    closeHandler();
  };

  const addHandler = () => {
    // validate inputs
    if (contribVal === 0 || contribVal === '' || contribDate === '') { setErr(true); return setErrMsg('Please enter a valid value.'); }
    const contrib = { val: contribVal, date: contribDate };
    if (props.isDemo) { return addHelper(contrib); }
  };

  return (
    <div ref={panelRef} className={props.show ? classes.Panel : classes.Hide}>
      <CloseBtn close={closeHandler} />
      <div className={classes.Inputs}>
        <div>Value <NumInput val={contribVal} change={val => { setErr(false); setContribVal(val); }} /></div>
        <div className={classes.DateInput}>Date <DateInput val={contribDate} change={val => { setErr(false); setContribDate(val); }} /></div>
      </div>
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      <div className={classes.BtnDiv}><GreenBtn clicked={addHandler}>Add</GreenBtn></div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addNotif: msg => dispatch(actions.addNotif(msg)),
  addContrib: (contrib, id) => dispatch(actions.addContrib(contrib, id))
});

export default connect(null, mapDispatchToProps)(ContribPanel);
