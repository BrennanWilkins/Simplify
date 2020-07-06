import React, { useState, useRef } from 'react';
import classes from './NewBudgetPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { instance as axios } from '../../axios';
import * as actions from '../../store/actions/index';

const BudgetPage = props => {
  const [categVal, setCategVal] = useState('');
  const [budgetVal, setBudgetVal] = useState(0);
  const [budgets, setBudgets] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const panelRef = useRef();

  const closeHandler = () => {
    setCategVal('');
    setBudgetVal('');
    setBudgets([]);
    props.close();
  };

  const budgetValHandler = (e) => {
    setErr(false);
    setErrMsg('');
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    setBudgetVal(val);
  };

  const addHandler = () => {
    setBudgets([ ...budgets, { category: categVal, budget: budgetVal }]);
    setCategVal('');
    setBudgetVal(0);
  };

  const createHandler = () => {
    axios.post('budgets', { budgets }).then(res => {
      props.setNewBudget(budgets);
      closeHandler();
    }).catch(err => {
      console.log(err);
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  return (
    <div className={props.show ? classes.Panel : classes.HidePanel} ref={panelRef}>
      <div className={classes.BtnDiv}><CloseBtn close={closeHandler} /></div>
      <div className={classes.InputDiv}>
        <div>
          <p>Category</p>
          <input className={classes.Input} value={categVal} onChange={e => setCategVal(e.target.value)} />
        </div>
        <div>
          <p>Monthly budget</p>
          <input className={classes.Input} value={budgetVal} onChange={budgetValHandler} />
        </div>
        <button onClick={addHandler}>Add category</button>
      </div>
      <div className={classes.Entries}>
        {budgets.map(budget => (
          <div>
            <span>{budget.category}</span>
            <span>{budget.budget}</span>
          </div>
        ))}
      </div>
      <button onClick={createHandler}
        className={budgets.length > 0 ? classes.ShowCreateBtn : classes.HideCreateBtn}>
        Create budget
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setNewBudget: (budget) => dispatch(actions.setNewBudget(budget))
});

export default connect(null, mapDispatchToProps)(BudgetPage);
