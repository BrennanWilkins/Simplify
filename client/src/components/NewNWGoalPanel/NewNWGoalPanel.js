import React, { useState, useRef, useEffect } from 'react';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import classes from './NewNWGoalPanel.module.css';
import { NumInput } from '../UI/Inputs/Inputs';
import GreenBtn from '../UI/GreenBtn/GreenBtn';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { instance as axios } from '../../axios';
import { formatNum } from '../../utils/formatNum';

const NewNWGoalPanel = props => {
  const panelRef = useRef();
  const [goalVal, setGoalVal] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // add event listener for click outside
    if (props.show) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  const handleClick = e => {
    if (panelRef.current.contains(e.target)) { return; }
    closeHandler();
  };

  const closeHandler = () => {
    setGoalVal('');
    setErr(false);
    setErrMsg('');
    props.close();
  };

  const goalValHandler = val => {
    setErr(false);
    setGoalVal(val);
  };

  const createHelper = () => {
    props.addNotif('Goal created');
    props.setNetWorthGoal(goalVal);
    closeHandler();
  };

  const createHandler = () => {
    // validate goal input value
    if (goalVal === 0 || goalVal === '' || goalVal > 9999999999) {
      setErr(true);
      return setErrMsg('Please enter a valid goal.');
    }
    if (props.isDemo) { return createHelper(); }
    axios.post('goals', { goal: goalVal }).then(res => {
      createHelper();
    }).catch(err => {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  return (
    <div className={props.show ? classes.Panel : classes.HidePanel} ref={panelRef}>
      <CloseBtn close={closeHandler} />
      <h2 className={classes.Title}>Create a new net worth goal</h2>
      <p className={classes.Title2}>This goal will be tracked based on the total value of your portfolio.</p>
      <h2 className={classes.Title3}>${formatNum(goalVal)}</h2>
      <div className={classes.Input}><NumInput val={goalVal} change={goalValHandler} /></div>
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      <GreenBtn big clicked={createHandler}>Create</GreenBtn>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addNotif: msg => dispatch(actions.addNotif(msg)),
  setNetWorthGoal: goal => dispatch(actions.setNetWorthGoal(goal))
});

export default connect(null, mapDispatchToProps)(NewNWGoalPanel);
