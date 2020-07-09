import React, { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
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
    setCategVal('');
    setBudgetVal(0);
    setBudgets([]);
    setErr(false);
    setErrMsg('');
    props.close();
  };

  const budgetValHandler = (e) => {
    setErr(false);
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    setBudgetVal(val);
  };

  const categValHandler = (e) => {
    if (e.target.value.length > 100) { return; }
    setErr(false);
    setCategVal(e.target.value);
  };

  const addHandler = () => {
    if (categVal === '' || budgetVal === 0) { return; }
    for (let budget of budgets) {
      if (budget.category === categVal) {
        setErr(true);
        return setErrMsg('You already have a category with that name.');
      }
    }
    setBudgets([ ...budgets, { category: categVal, budget: budgetVal }]);
    setCategVal('');
    setBudgetVal(0);
  };

  const createHandler = () => {
    if (props.isDemo) {
      props.setNewBudget(budgets);
      return closeHandler();
    }
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
        <div className={classes.Field}>
          <p className={classes.Text}>Category</p>
          <input className={classes.Input} value={categVal} onChange={categValHandler} />
        </div>
        <div className={classes.Field}>
          <p className={classes.Text}>Monthly budget</p>
          <input className={classes.Input} value={budgetVal} onChange={budgetValHandler} />
        </div>
      </div>
      <button className={classes.Btn} onClick={addHandler}>Add category</button>
      <div className={classes.Entries}>
        {budgets.map((budget, i) => (
          <div key={i}>
            <span>{budget.category}</span>
            <span>{budget.budget}</span>
          </div>
        ))}
      </div>
      <button onClick={createHandler} className={budgets.length > 0 ? classes.CreateBtn : classes.HideCreateBtn}>
        Create budget
      </button>
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setNewBudget: (budget) => dispatch(actions.setNewBudget(budget))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
