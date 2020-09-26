import React, { useState, useEffect } from 'react';
import classes from './EditBudgetPanel.module.css';
import { connect } from 'react-redux';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { instance as axios } from '../../../axios';
import * as actions from '../../../store/actions/index';
import { Input, NumInput } from '../../UI/Inputs/Inputs';
import { v4 as uuid } from 'uuid';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import TrashBtn from '../../UI/Btns/TrashBtn/TrashBtn';
import { plusIcon } from '../../UI/UIIcons';

const EditBudgetPanel = props => {
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
    // validate budgets & categories
    if (!budgets.length) {
      return 'You need to have at least one category.';
    }
    for (let i = 0; i < budgets.length; i++) {
      if (budgets[i].budget === 0) {
        return 'Budget values cannot be zero.';
      }
      if (budgets[i].budget > 999999999) {
        return 'One of your budgets is too high.';
      }
      if (budgets[i].category === '') {
        return 'Category names cannot be empty.';
      }
      if (budgets[i].category.length > 70) {
        return 'One of your category names is too long.';
      }
    }
    // can't have two budget categories w the same name
    if (new Set(budgets.map(budg => budg.category)).size !== budgets.length) {
      return 'You cannot have categories with the same names.';
    }
    return '';
  };

  const confirmHelper = updatedBudgets => {
    props.setBudget([...updatedBudgets]);
    props.addNotif('Budget updated');
    closeHandler();
  };

  const confirmHandler = () => {
    setErr(false);
    const validate = confirmValidation();
    if (validate !== '') { setErr(true); return setErrMsg(validate); }
    const updatedBudgets = [...budgets];
    updatedBudgets.forEach(budget => delete budget.id);
    if (props.isDemo) { return confirmHelper(updatedBudgets); }
    axios.put('budgets', { budgets: updatedBudgets }).then(res => { confirmHelper(updatedBudgets); })
    .catch(err => { errHandler(true); });
  };

  const addHandler = () => {
    setBudgets(budgets.concat({ category: '', budget: 0, transactions: [], id: uuid() }));
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
            <div key={budget.id} className={!props.dark ? classes.Budget : null}>
              <Input val={budget.category} change={val => categValHandler(val, budget.id)} dark2={props.dark} />
              <NumInput val={budget.budget} change={val => budgetValHandler(val, budget.id)} dark2={props.dark} />
              <TrashBtn clicked={() => deleteOneHandler(budget.id)} dark={props.dark} />
            </div>
          ))}
          <div className={classes.AddBtn}><BlueBtn clicked={addHandler}>{plusIcon}Add a new category</BlueBtn></div>
        </div>
        <div className={classes.ConfirmBtn}><GreenBtn big clicked={confirmHandler}>Confirm</GreenBtn></div>
        <p className={err ? classes.ShowErr : classes.HideErr} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>{errMsg}</p>
      </div>
    </PanelContainer>
  );
};

const mapStateToProps = state => ({
  budget: state.budget.budget,
  isDemo: state.auth.isDemo,
  dark: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  setNewBudget: budget => dispatch(actions.setNewBudget(budget)),
  setBudget: budget => dispatch(actions.setBudget(budget)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBudgetPanel);
