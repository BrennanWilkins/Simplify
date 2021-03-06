import React, { useState, useEffect, useRef } from 'react';
import classes from './EditGoalPanel.module.css';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import { NumInput, DateInput, Input } from '../../UI/Inputs/Inputs';
import { instance as axios } from '../../../axios';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import Form from '../../UI/Form/Form';

const EditGoalPanel = props => {
  const [goalName, setGoalName] = useState('');
  const [goalVal, setGoalVal] = useState('');
  const [goalDate, setGoalDate] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const nameRef = useRef();

  const closeHandler = () => {
    setGoalName('');
    setGoalVal('');
    setGoalDate('');
    setErr(false);
    setErrMsg('');
    props.close();
  };

  useEffect(() => {
    if (props.show) {
      // find goal by id and sync state
      const findGoal = props.otherGoals.find(goal => goal._id === props._id);
      setGoalName(findGoal.name);
      setGoalVal(findGoal.goal);
      setGoalDate(findGoal.date);
      nameRef.current.focus();
    }
  }, [props.show]);

  const isValid = () => {
    // returns false if inputs not valid
    if (goalName === '' || goalName.length > 70) {
      setErr(true);
      setErrMsg('Please enter a valid name.');
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
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.show ? classes.Panel : classes.Hide}>
        <CloseBtn close={closeHandler} />
        <Form allow={props.show} submit={editHandler}>
          <div className={classes.Inputs} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>
            <div>Name<Input val={goalName} change={val => { setGoalName(val); setErr(false); }} ref={nameRef} dark2={props.dark} /></div>
            <div>Amount<NumInput val={goalVal} change={val => { setGoalVal(val); setErr(false); }} dark2={props.dark} /></div>
            <div className={classes.DateInput}>Target date<DateInput val={goalDate} change={val => { setGoalDate(val); setErr(false); }} dark2={props.dark} /></div>
          </div>
          <div className={classes.BtnDiv}><GreenBtn isSubmit>Change</GreenBtn></div>
        </Form>
        <p className={err ? classes.ShowErr : classes.HideErr} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>{errMsg}</p>
      </div>
    </PanelContainer>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo,
  otherGoals: state.goals.otherGoals,
  dark: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  addNotif: msg => dispatch(actions.addNotif(msg)),
  editGoal: goal => dispatch(actions.editGoal(goal)),
  setOtherGoals: goals => dispatch(actions.setOtherGoals(goals))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGoalPanel);
