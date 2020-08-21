import React, { useState, useRef, useEffect } from 'react';
import classes from './EditNWGoalPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { connect } from 'react-redux';
import { instance as axios } from '../../axios';
import * as actions from '../../store/actions/index';
import GreenBtn from '../UI/GreenBtn/GreenBtn';
import { NumInput } from '../UI/Inputs/Inputs';

const EditNWGoalPanel = props => {
  const panelRef = useRef();
  const [inputVal, setInputVal] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const handleClick = e => {
      // close panel on click outside
      if (panelRef.current.contains(e.target)) { return; }
      closeHandler();
    };

    if (props.show) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  useEffect(() => {
    setInputVal(props.goal);
  }, [props.goal, props.show]);

  const closeHandler = () => {
    setInputVal(props.goal);
    errHandler(false);
    props.close();
  };

  const errHandler = bool => {
    if (bool) {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    } else {
      setErr(false);
      setErrMsg('');
    }
  };

  const editHelper = () => {
    props.setNetWorthGoal(inputVal);
    props.addNotif('Goal updated');
    closeHandler();
  };

  const editHandler = () => {
    // validate input
    if (inputVal === 0 || inputVal === '' || inputVal > 999999999999) {
      setErr(true);
      return setErrMsg('Please enter a valid goal.');
    }
    if (props.isDemo) { return editHelper(); }
    axios.put('goals', { goal: inputVal }).then(res => { editHelper(); })
    .catch(err => { errHandler(true); });
  };

  return (
    <div ref={panelRef} className={props.show ? classes.Panel : classes.Hide}>
      <CloseBtn close={closeHandler} />
      <div className={classes.Input}><NumInput val={inputVal} change={val => { setErr(false); setInputVal(val); }} /></div>
      <div className={classes.BtnDiv}>
        <GreenBtn clicked={editHandler}>Change</GreenBtn>
      </div>
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setNetWorthGoal: goal => dispatch(actions.setNetWorthGoal(goal)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNWGoalPanel);
