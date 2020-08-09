import React, { useState, useRef, useEffect } from 'react';
import classes from './BudgetPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { instance as axios } from '../../axios';
import * as actions from '../../store/actions/index';
import { Input, NumInput } from '../UI/Inputs/Inputs';
import { v4 as uuid } from 'uuid';

const BudgetPanel = props => {
  const [budgets, setBudgets] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const panelRef = useRef();

  useEffect(() => {
    // sync state to props
    if (props.show) {
      setBudgets(props.budget.map(budget => ({ ...budget, id: uuid() })));
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show, props.budget]);

  const handleClick = e => {
    // closes panel if click outside
    if (panelRef.current.contains(e.target)) { return; }
    closeHandler();
  };

  const closeHandler = () => {
    errHandler(false);
    setBudgets([]);
    props.close();
  };

  const errHandler = bool => {
    if (bool) { setErr(true); return setErrMsg('Error connecting to the server.'); }
    setErr(false); setErrMsg('');
  }

  const budgetValHandler = (val, id) => {
    setErr(false);
    setBudgets(budgets.map(budg => {
      if (budg.id === id) { return { ...budg, budget: val }; }
      return budg;
    }));
  };

  const categValHandler = (val, id) => {
    setErr(false);
    setBudgets(budgets.map(budg => {
      if (budg.id === id) { return { ...budg, category: val }; }
      return budg;
    }));
  };

  const confirmValidation = () => {
    // cant have empty budget
    if (!budgets.length) {
      setErr(true);
      setErrMsg('You need to have at least one category.');
      return false;
    }
    // can't have two budget categories w the same name
    if (new Set(budgets.map(budg => budg.category)).size !== budgets.length) {
      setErr(true);
      setErrMsg('You cannot have categories with the same names.');
      return false;
    }
    for (let i = 0; i < budgets.length; i++) {
      if (budgets[i].budget === 0) {
        setErr(true);
        setErrMsg('Budget values cannot be zero.');
        return false;
      }
      if (budgets[i].category === '') {
        setErr(true);
        setErrMsg('Category names cannot be empty.');
        return false;
      }
    }
    return true;
  };

  const confirmHelper = () => {
    props.setBudget([...budgets]);
    props.addNotif('Budget updated');
    closeHandler();
  };

  const confirmHandler = () => {
    setErr(false);
    // error in budget fields, return
    if (!confirmValidation()) { return; }
    if (props.isDemo) { return confirmHelper(); }
    axios.put('budgets', { budgets }).then(res => { confirmHelper(); })
    .catch(err => { errHandler(true); });
  };

  const deleteHelper = () => {
    props.deleteBudget();
    props.addNotif('Budget deleted');
    closeHandler();
  };

  const deleteHandler = () => {
    setErr(false);
    if (props.isDemo) { return deleteHelper(); }
    axios.delete('budgets').then(res => { deleteHelper(); })
    .catch(err => { errHandler(true); });
  };

  const addHandler = () => {
    setBudgets(budgets.concat({ category: '', budget: 0, transactions: [] }));
  };

  const deleteOneHandler = id => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  return (
    <div className={props.show ? classes.Panel : classes.HidePanel} ref={panelRef}>
      <div className={classes.BtnDiv}><CloseBtn close={closeHandler} /></div>
      <div className={classes.Budgets}>
        {budgets.map(budget => (
          <div key={budget.id}>
            <Input val={budget.category} change={val => categValHandler(val, budget.id)} />
            <NumInput val={budget.budget} change={val => budgetValHandler(val, budget.id)} />
            <CloseBtn close={() => deleteOneHandler(budget.id)} />
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
