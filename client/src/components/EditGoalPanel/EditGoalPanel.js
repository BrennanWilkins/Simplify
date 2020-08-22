import React, { useState, useRef, useEffect } from 'react';
import classes from './EditGoalPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import GreenBtn from '../UI/GreenBtn/GreenBtn';
import { NumInput, DateInput, Input } from '../UI/Inputs/Inputs';
import { instance as axios } from '../../axios';

const EditGoalPanel = props => {
  const [goalName, setGoalName] = useState('');
  const [goalVal, setGoalVal] = useState('');
  const [goalDate, setGoalDate] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const panelRef = useRef();

  const closeHandler = () => {
    setGoalName('');
    setGoalVal('');
    setGoalDate('');
    setErr(false);
    setErrMsg('');
    props.close();
  };

  useEffect(() => {
    const handleClick = e => {
      // close panel on click outside
      if (panelRef.current.contains(e.target)) { return; }
      closeHandler();
    };
    if (props.show) {
      document.addEventListener('mousedown', handleClick);
      // find goal by id and sync state
      const findGoal = props.otherGoals.find(goal => goal._id === props._id);
      setGoalName(findGoal.name);
      setGoalVal(findGoal.goal);
      setGoalDate(findGoal.date);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  const isValid = () => {
    // returns false if inputs not valid
    if (goalName === '') {
      setErr(true);
      setErrMsg('Please enter a valid name.');
      return false;
    }
    if (goalName.length > 70) {
      setErr(true);
      setErrMsg('The goal name must be less than 70 characters.');
      return false;
    }
    if (goalVal === '' || goalVal === 0 || goalVal > 999999999999) {
      setErr(true);
      setErrMsg('Please enter a valid goal value.');
      return false;
    }
    return true;
  };

  const editHelper = () => {
    props.addNotif('Goal updated');
    closeHandler();
  };

  const editHandler = () => {
    if (!isValid()) { return; }
    const goal = { name: goalName, val: goalVal, date: goalDate, _id: props._id };
    if (props.isDemo) {
      props.editGoal(goal);
      return editHelper();
    }
    axios.put('goals/otherGoals', { goal }).then(res => {
      props.setOtherGoals(res.data.goals);
      editHelper();
    }).catch(err => { setErr(true); setErrMsg('Error connecting to the server.'); });
  };

  return (
    <div ref={panelRef} className={props.show ? classes.Panel : classes.Hide}>
      <CloseBtn close={closeHandler} />
      <div className={classes.Inputs}>
        <div>Name<Input val={goalName} change={val => { setGoalName(val); setErr(false); }} /></div>
        <div>Amount<NumInput val={goalVal} change={val => { setGoalVal(val); setErr(false); }} /></div>
        <div className={classes.DateInput}>Target date<DateInput val={goalDate} change={val => { setGoalDate(val); setErr(false); }} /></div>
      </div>
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      <div className={classes.BtnDiv}><GreenBtn clicked={editHandler}>Change</GreenBtn></div>
    </div>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo,
  otherGoals: state.goals.otherGoals
});

const mapDispatchToProps = dispatch => ({
  addNotif: msg => dispatch(actions.addNotif(msg)),
  editGoal: goal => dispatch(actions.editGoal(goal)),
  setOtherGoals: goals => dispatch(actions.setOtherGoals(goals))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGoalPanel);
