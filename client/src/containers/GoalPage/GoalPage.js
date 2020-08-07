import React, { useState } from 'react';
import classes from './GoalPage.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { instance as axios } from '../../axios';
import EditGoalPanel from '../../components/EditGoalPanel/EditGoalPanel';
import GoalChart from '../../components/GoalChart/GoalChart';
import GreenBtn from '../../components/UI/GreenBtn/GreenBtn';
import { NumInput } from '../../components/UI/Inputs/Inputs';

const GoalPage = props => {
  const [goalValue, setGoalValue] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const goalValueHandler = val => {
    setErr(false);
    setErrMsg('');
    setGoalValue(val);
  };

  const createHandler = () => {
    if (goalValue === 0 || goalValue > 999999999999) { return; }
    if (props.isDemo) { props.addNotif('Goal created'); return props.setGoal(goalValue); }
    axios.post('goals', { goal: goalValue }).then(res => {
      props.addNotif('Goal created');
      props.setGoal(goalValue);
    }).catch(err => {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Content}>
        {props.goal ? (
          <div>
            <h1 className={classes.Title}>Net Worth Goal</h1>
            <h1 className={classes.Title2}>
              ${Number(Number(props.goal).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
            <GoalChart mode="Normal" />
            <div className={classes.Btns}>
              <GreenBtn big clicked={() => setShowEdit(true)}>Edit goal</GreenBtn>
              <GreenBtn big clicked={() => setShowDelete(true)}>Delete goal</GreenBtn>
              <EditGoalPanel show={showEdit} mode="Edit" close={() => setShowEdit(false)} goal={props.goal} />
              <EditGoalPanel show={showDelete} mode="Delete" close={() => { setShowDelete(false); setGoalValue(0); }} goal={props.goal} />
            </div>
          </div>
        ) : (
          <div className={classes.SetGoal}>
            <h1 className={classes.Title}>Create a new net worth goal</h1>
            <p className={classes.SubTitle}>
              ${Number(Number(goalValue).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className={classes.Input}><NumInput val={goalValue} change={goalValueHandler} /></div>
            <GreenBtn big clicked={createHandler}>Create</GreenBtn>
            <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  goal: state.goal.goal,
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setGoal: goal => dispatch(actions.setGoal(goal)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalPage);
