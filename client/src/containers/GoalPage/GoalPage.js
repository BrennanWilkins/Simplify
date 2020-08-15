import React, { useState } from 'react';
import classes from './GoalPage.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { instance as axios } from '../../axios';
import EditGoalPanel from '../../components/EditGoalPanel/EditGoalPanel';
import GoalChart from '../../components/GoalChart/GoalChart';
import GreenBtn from '../../components/UI/GreenBtn/GreenBtn';
import { NumInput } from '../../components/UI/Inputs/Inputs';
import DeletePanel from '../../components/DeletePanel/DeletePanel';
import NewGoalPanel from '../../components/NewGoalPanel/NewGoalPanel';

const GoalPage = props => {
  const [netWorthGoalVal, setNetWorthGoalVal] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showNewGoal, setShowNewGoal] = useState(false);

  const netWorthGoalValHandler = val => {
    setErr(false);
    setErrMsg('');
    setNetWorthGoalVal(val);
  };

  const createHandler = () => {
    if (netWorthGoalVal === 0 || netWorthGoalVal > 999999999999) { return; }
    if (props.isDemo) { props.addNotif('Goal created'); return props.setNetWorthGoal(netWorthGoalVal); }
    axios.post('goals', { goal: netWorthGoalVal }).then(res => {
      props.addNotif('Goal created');
      props.setNetWorthGoal(netWorthGoalVal);
    }).catch(err => {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  const deleteHelper = () => {
    props.setNetWorthGoal(null);
    props.addNotif('Goal deleted');
    setShowDelete(false);
  };

  const deleteHandler = () => {
    if (props.isDemo) { return deleteHelper(); }
    axios.delete('goals').then(res => { deleteHelper(); }).catch(err => { return; });
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Content}>
        <div className={classes.NetWorthGoal}>
          {props.netWorthGoal ? (
            <div>
              <h1 className={classes.Title}>Net Worth Goal</h1>
              <h1 className={classes.Title2}>
                ${Number(Number(props.netWorthGoal).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
              <GoalChart mode="Normal" />
              <div className={classes.Btns}>
                <GreenBtn big clicked={() => setShowEdit(true)}>Edit goal</GreenBtn>
                <GreenBtn big clicked={() => setShowDelete(true)}>Delete goal</GreenBtn>
                <EditGoalPanel show={showEdit} close={() => setShowEdit(false)} goal={props.netWorthGoal} />
                <DeletePanel showUp={true} show={showDelete} mode="goal" close={() => setShowDelete(false)} delete={deleteHandler} />
              </div>
            </div>
          ) : (
            <div className={classes.SetGoal}>
              <h1 className={classes.Title}>Create a new net worth goal</h1>
              <p className={classes.SubTitle}>
                ${Number(Number(netWorthGoalVal).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className={classes.Input}><NumInput val={netWorthGoalVal} change={netWorthGoalValHandler} /></div>
              <GreenBtn big clicked={createHandler}>Create</GreenBtn>
              <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
            </div>
          )}
        </div>
        <div className={classes.OtherGoals}>
          {props.otherGoals.length ? (
            <div>
            </div>
          ) : (
            <div className={classes.SetOtherGoal}>
              <h2 className={classes.NewTitle}>Create a new custom goal</h2>
              <GreenBtn big clicked={() => setShowNewGoal(true)}>Create</GreenBtn>
              <NewGoalPanel show={showNewGoal} close={() => setShowNewGoal(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  netWorthGoal: state.goals.netWorthGoal,
  otherGoals: state.goals.otherGoals,
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setNetWorthGoal: goal => dispatch(actions.setNetWorthGoal(goal)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalPage);
