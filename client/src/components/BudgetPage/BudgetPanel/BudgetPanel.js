import React, { useState, useEffect } from 'react';
import classes from './BudgetPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { instance as axios } from '../../../axios';
import * as actions from '../../../store/actions/index';
import { Input, NumInput } from '../../UI/Inputs/Inputs';
import { v4 as uuid } from 'uuid';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';

const BudgetPanel = props => {
  const [budgets, setBudgets] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // sync state to props
    if (props.show) {
      setBudgets(props.budget.map(budget => ({ ...budget, id: uuid() })));
    }
  }, [props.show, props.budget]);

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
      if (budgets[i].budget >= 9999999999) {
        setErr(true);
        setErrMsg('One of your budgets is too high.');
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

  const addHandler = () => {
    setBudgets(budgets.concat({ category: '', budget: 0, transactions: [] }));
  };

  const deleteOneHandler = id => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.showUp ? (props.show ? classes.PanelUp : classes.HidePanelUp) : (props.show ? classes.PanelDown : classes.HidePanelDown)}>
        <div><CloseBtn close={closeHandler} /></div>
        <div className={classes.Budgets}>
          {budgets.map(budget => (
            <div key={budget.id}>
              <Input val={budget.category} change={val => categValHandler(val, budget.id)} />
              <NumInput val={budget.budget} change={val => budgetValHandler(val, budget.id)} />
              <CloseBtn close={() => deleteOneHandler(budget.id)} />
            </div>
          ))}
          <div className={classes.AddBtn}><button onClick={addHandler}>Add a new category</button></div>
        </div>
        <div className={classes.ConfirmBtn}><button onClick={confirmHandler}>Confirm</button></div>
        <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      </div>
    </PanelContainer>
  );
};

const mapStateToProps = state => ({
  budget: state.budget.budget,
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setNewBudget: budget => dispatch(actions.setNewBudget(budget)),
  setBudget: budget => dispatch(actions.setBudget(budget)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPanel);
