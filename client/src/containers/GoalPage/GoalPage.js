import React, { useState } from 'react';
import classes from './GoalPage.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { instance as axios } from '../../axios';
import EditGoalPanel from '../../components/EditGoalPanel/EditGoalPanel';
import GoalChart from '../../components/GoalChart/GoalChart';

const GoalPage = props => {
  const [goalValue, setGoalValue] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const goalValueHandler = (e) => {
    setErr(false);
    setErrMsg('');
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    setGoalValue(val);
  };

  const createHandler = () => {
    if (goalValue === 0) { return; }
    axios.post('goals', { goal: goalValue }).then(res => {
      props.setGoal(goalValue);
    }).catch(err => {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  return (
    <div className={classes.Container}>
      {props.goal ? (
        <div>
          <h1 className={classes.Title}>Net Worth Goal</h1>
          <h1 className={classes.Title2}>${String(Number(props.goal).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</h1>
          <GoalChart mode="Normal" />
          <div className={classes.Btns}>
            <button className={classes.Btn} onClick={() => setShowEdit(true)}>Edit goal</button>
            <button className={classes.Btn} onClick={() => setShowDelete(true)}>Delete goal</button>
            <EditGoalPanel show={showEdit} mode="Edit" close={() => setShowEdit(false)} goal={props.goal} />
            <EditGoalPanel show={showDelete} mode="Delete" close={() => setShowDelete(false)} goal={props.goal} />
          </div>
        </div>
      ) : (
        <div className={classes.SetGoal}>
          <h1 className={classes.Title}>Create a new net worth goal</h1>
          <p className={classes.SubTitle}>${String(Number(goalValue).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</p>
          <input className={classes.Input} value={goalValue} onChange={goalValueHandler} />
          <button className={classes.Btn} onClick={createHandler}>Create</button>
          <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  goal: state.goal.goal
});

const mapDispatchToProps = dispatch => ({
  setGoal: (goal) => dispatch(actions.setGoal(goal))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalPage);
