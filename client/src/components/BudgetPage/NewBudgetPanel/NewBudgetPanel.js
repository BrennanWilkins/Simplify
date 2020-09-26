import React, { useState } from 'react';
import classes from './NewBudgetPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { instance as axios } from '../../../axios';
import * as actions from '../../../store/actions/index';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import { Input, NumInput } from '../../UI/Inputs/Inputs';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import { formatNum } from '../../../utils/formatNum';

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

  const validateAdd = () => {
    // validate inputs
    if (categVal === '') {
      return 'The category name cannot be empty.';
    }
    if (categVal.length > 70) {
      return 'Your category name is too long.';
    }
    if (budgetVal === 0 || budgetVal > 999999999) {
      return 'Please enter a valid budget value.';
    }
    for (let budget of budgets) {
      if (budget.category === categVal) {
        return 'You already have a category with that name.';
      }
    }
    return '';
  };

  const addHandler = () => {
    const validate = validateAdd();
    if (validate !== '') { setErr(true); return setErrMsg(validate); }
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
        <CloseBtn close={closeHandler} />
        <div className={classes.InputDiv} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>
          <div className={classes.Field}>
            <p className={classes.Text}>Category</p>
            <Input val={categVal} change={categValHandler} dark2={props.dark} />
          </div>
          <div className={classes.Field}>
            <p className={classes.Text}>Monthly budget</p>
            <NumInput val={budgetVal} change={budgetValHandler} dark2={props.dark} />
          </div>
        </div>
        <div className={classes.AddBtn}>
          <BlueBtn clicked={addHandler}>Add category</BlueBtn>
        </div>
        <div className={classes.Entries}>
          {budgets.map((budget, i) => (
            <div key={i} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>
              <span>{budget.category}</span>
              <span>${formatNum(budget.budget)}</span>
            </div>
          ))}
        </div>
        <div className={budgets.length ? classes.CreateBtn : classes.HideCreateBtn}>
          <GreenBtn clicked={createHandler}>Create budget</GreenBtn>
        </div>
        <p className={err ? classes.ShowErr : classes.HideErr} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>{errMsg}</p>
      </div>
    </PanelContainer>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo,
  dark: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  setNewBudget: budget => dispatch(actions.setNewBudget(budget)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
