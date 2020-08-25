import React, { useState } from 'react';
import classes from './NewBudgetPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { instance as axios } from '../../../axios';
import * as actions from '../../../store/actions/index';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import { Input, NumInput } from '../../UI/Inputs/Inputs';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';

const BudgetPage = props => {
  const [categVal, setCategVal] = useState('');
  const [budgetVal, setBudgetVal] = useState(0);
  const [budgets, setBudgets] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const closeHandler = () => {
    setCategVal('');
    setBudgetVal(0);
    setBudgets([]);
    setErr(false);
    setErrMsg('');
    props.close();
  };

  const budgetValHandler = val => {
    setErr(false);
    setBudgetVal(val);
  };

  const categValHandler = val => {
    if (val.length > 100) { return; }
    setErr(false);
    setCategVal(val);
  };

  const addHandler = () => {
    // validate inputs
    if (categVal === '') {
      setErr(true);
      return setErrMsg('The category name cannot be empty.');
    }
    if (budgetVal === 0 || budgetVal >= 9999999999) {
      setErr(true);
      return setErrMsg('Please enter a valid budget value.');
    }
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
      props.addNotif('Budget created');
      return closeHandler();
    }
    axios.post('budgets', { budgets }).then(res => {
      props.setNewBudget(budgets);
      props.addNotif('Budget created');
      closeHandler();
    }).catch(err => {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.show ? classes.Panel : classes.HidePanel}>
        <div className={classes.BtnDiv}><CloseBtn close={closeHandler} /></div>
        <div className={classes.InputDiv}>
          <div className={classes.Field}>
            <p className={classes.Text}>Category</p>
            <Input val={categVal} change={categValHandler} />
          </div>
          <div className={classes.Field}>
            <p className={classes.Text}>Monthly budget</p>
            <NumInput val={budgetVal} change={budgetValHandler} />
          </div>
        </div>
        <div className={classes.BtnDiv2}>
          <BlueBtn clicked={addHandler}>Add category</BlueBtn>
        </div>
        <div className={classes.Entries}>
          {budgets.map((budget, i) => (
            <div key={i}>
              <span>{budget.category}</span>
              <span>{budget.budget}</span>
            </div>
          ))}
        </div>
        <div className={classes.BtnDiv3}>
          <button onClick={createHandler} className={budgets.length > 0 ? classes.CreateBtn : classes.HideCreateBtn}>
            Create budget
          </button>
        </div>
        <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      </div>
    </PanelContainer>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setNewBudget: budget => dispatch(actions.setNewBudget(budget)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
