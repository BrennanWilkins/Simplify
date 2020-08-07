import React, { useState, useRef, useEffect } from 'react';
import classes from './BudgetPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { instance as axios } from '../../axios';
import * as actions from '../../store/actions/index';
import { Input, NumInput } from '../UI/Inputs/Inputs';

const BudgetPanel = props => {
  const [categVals, setCategVals] = useState([]);
  const [budgetVals, setBudgetVals] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [hiddenInd, setHiddenInd] = useState([]);
  const panelRef = useRef();

  useEffect(() => {
    // sync state to props
    if (props.show) {
      setCategVals(props.budget.map(budget => budget.category));
      setBudgetVals(props.budget.map(budget => budget.budget));
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  const handleClick = e => {
    // closes panel if click outside
    if (panelRef.current.contains(e.target)) { return; }
    closeHandler();
  };

  const closeHandler = () => {
    setErr(false);
    setErrMsg('');
    setCategVals([]);
    setBudgetVals([]);
    setHiddenInd([]);
    props.close();
  };

  const budgetValHandler = (i, val) => {
    setErr(false);
    const newVals = [...budgetVals];
    newVals[i] = val;
    setBudgetVals(newVals);
  };

  const categValHandler = (i, val) => {
    setErr(false);
    const newVals = [...categVals];
    newVals[i] = val;
    setCategVals(newVals);
  };

  const confirmHandler = () => {
    setErr(false);
    // cant have budget w no categories
    if (budgetVals.length === hiddenInd.length) {
      setErr(true);
      return setErrMsg('You need to have at least one category.');
    }
    const budgets = [...props.budget];
    for (let i = 0; i < budgetVals.length; i++) {
      // dont include deleted budget categories
      if (hiddenInd.includes(i)) { continue; }
      if (budgetVals[i] === 0) {
        setErr(true);
        return setErrMsg('Budget values cannot be zero.');
      }
      if (categVals[i] === '') {
        setErr(true);
        return setErrMsg('Category names cannot be empty.');
      }
      if (budgets[i]) {
        budgets[i].budget = budgetVals[i];
        budgets[i].category = categVals[i];
      }
    }
    for (let i = props.budget.length; i < budgetVals.length; i++) {
      if (hiddenInd.includes(i)) { continue; }
      budgets.push({ category: categVals[i], budget: Number(budgetVals[i]), transactions: [] });
    }
    const newBudget = budgets.map(budget => (
      { category: budget.category, budget: budget.budget, transactions: budget.transactions }
    )).filter((budget, i) => !hiddenInd.includes(i));
    if (props.isDemo) {
      // for demo mode only
      props.setBudget(newBudget);
      props.addNotif('Budget updated');
      return closeHandler();
    }
    axios.put('budgets', { budgets: newBudget }).then(res => {
      props.setBudget(newBudget);
      props.addNotif('Budget updated');
      closeHandler();
    }).catch(err => {
      console.log(err);
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  const deleteHandler = () => {
    setErr(false);
    if (props.isDemo) {
      // for demo mode only
      props.deleteBudget();
      props.addNotif('Budget deleted');
      return closeHandler();
    }
    axios.delete('budgets').then(res => {
      props.deleteBudget();
      props.addNotif('Budget deleted');
      closeHandler();
    }).catch(err => {
      console.log(err);
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  const addHandler = () => {
    setCategVals(categVals.concat(['']));
    setBudgetVals(budgetVals.concat([0]));
  };

  const deleteOneHandler = i => {
    // hiddenInd used to keep track of deleted categories
    setHiddenInd(hiddenInd.concat([i]));
  };

  return (
    <div className={props.show ? classes.Panel : classes.HidePanel} ref={panelRef}>
      <div className={classes.BtnDiv}><CloseBtn close={closeHandler} /></div>
      <div className={classes.Budgets}>
        {budgetVals.map((val, i) => (
          <div key={i} className={hiddenInd.includes(i) ? classes.Hidden : undefined}>
            <Input val={categVals[i]} change={val => categValHandler(i, val)} />
            <NumInput val={val} change={val => budgetValHandler(i, val)} />
            <CloseBtn close={() => deleteOneHandler(i)} />
          </div>
        ))}
        <div className={classes.BtnDiv2}>
          <button className={classes.AddBtn} onClick={addHandler}>Add a new category</button>
        </div>
      </div>
      <button onClick={confirmHandler} className={classes.ConfirmBtn}>Confirm</button>
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      <button className={classes.DeleteBtn} onClick={deleteHandler}>Delete Budget</button>
    </div>
  );
};

const mapStateToProps = state => ({
  budget: state.budget.budget,
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setNewBudget: budget => dispatch(actions.setNewBudget(budget)),
  setBudget: budget => dispatch(actions.setBudget(budget)),
  deleteBudget: () => dispatch(actions.deleteBudget()),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPanel);
