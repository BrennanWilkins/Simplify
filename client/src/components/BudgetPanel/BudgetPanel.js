import React, { useState, useRef, useEffect } from 'react';
import classes from './BudgetPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { instance as axios } from '../../axios';
import * as actions from '../../store/actions/index';

const BudgetPanel = props => {
  const [categVals, setCategVals] = useState([]);
  const [budgetVals, setBudgetVals] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [hiddenInd, setHiddenInd] = useState([]);
  const panelRef = useRef();

  useEffect(() => {
    if (props.show) {
      setCategVals(props.budget.map(budget => budget.category));
      setBudgetVals(props.budget.map(budget => budget.budget));
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  useEffect(() => {
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClick = (e) => {
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

  const budgetValHandler = (i, e) => {
    setErr(false);
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    const newVals = [...budgetVals];
    newVals[i] = val;
    setBudgetVals(newVals);
  };

  const categValHandler = (i, e) => {
    setErr(false);
    const newVals = [...categVals];
    newVals[i] = e.target.value;
    setCategVals(newVals);
  };

  const confirmHandler = () => {
    setErr(false);
    const budgets = [...props.budget];
    for (let i = 0; i < budgetVals.length; i++) {
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
    axios.put('budgets', { budgets: newBudget }).then(res => {
      props.setBudget(newBudget);
      closeHandler();
    }).catch(err => {
      console.log(err);
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  const deleteHandler = () => {
    setErr(false);
    axios.delete('budgets').then(res => {
      props.deleteBudget();
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

  const deleteOneHandler = (i) => {
    setHiddenInd(hiddenInd.concat([i]));
  };

  return (
    <div className={props.show ? classes.Panel : classes.HidePanel} ref={panelRef}>
      <div className={classes.BtnDiv}><CloseBtn close={closeHandler} /></div>
      <div className={classes.Budgets}>
        {budgetVals.map((val, i) => (
          <div key={i} className={hiddenInd.includes(i) ? classes.Hidden : undefined}>
            <input value={categVals[i]} onChange={e => categValHandler(i, e)} />
            <input value={val} onChange={e => budgetValHandler(i, e)} />
            <CloseBtn close={() => deleteOneHandler(i)} />
          </div>
        ))}
        <button className={classes.AddBtn} onClick={addHandler}>Add a new category</button>
      </div>
      <button onClick={confirmHandler} className={classes.ConfirmBtn}>Confirm</button>
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      <button className={classes.DeleteBtn} onClick={deleteHandler}>Delete Budget</button>
    </div>
  );
};

const mapStateToProps = state => ({
  budget: state.budget.budget
});

const mapDispatchToProps = dispatch => ({
  setNewBudget: (budget) => dispatch(actions.setNewBudget(budget)),
  setBudget: (budget) => dispatch(actions.setBudget(budget)),
  deleteBudget: () => dispatch(actions.deleteBudget())
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPanel);
