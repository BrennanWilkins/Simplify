import React, { useState } from 'react';
import classes from './BudgetPage.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import NewBudgetPanel from '../../components/NewBudgetPanel/NewBudgetPanel';
import BudgetChart from '../../components/BudgetChart/BudgetChart';
import { caretIcon } from '../../components/UI/UIIcons';
import BudgetPanel from '../../components/BudgetPanel/BudgetPanel';
import { instance as axios } from '../../axios';
import CloseBtn from '../../components/UI/CloseBtn/CloseBtn';
import BudgetBars from '../../components/BudgetBars/BudgetBars';
import BlueBtn from '../../components/UI/BlueBtn/BlueBtn';
import { Input, NumInput } from '../../components/UI/Inputs/Inputs';
import BudgetByCateg from '../../components/BudgetByCateg/BudgetByCateg';

const BudgetPage = props => {
  const [showCreate, setShowCreate] = useState(false);
  const [showBudgetPanel, setShowBudgetPanel] = useState(false);
  const [showCategs, setShowCategs] = useState([]);
  const [addTransCateg, setAddTransCateg] = useState('');
  const [transDesc, setTransDesc] = useState('');
  const [transCost, setTransCost] = useState('');

  const showTransHandler = categ => {
    const i = showCategs.findIndex(val => val === categ);
    if (i === -1) { return setShowCategs(showCategs.concat([categ])); }
    setShowCategs(showCategs.filter(val => val !== categ));
  };

  const addTransHandler = categ => {
    setTransDesc('');
    setTransCost('');
    setAddTransCateg(categ);
  };

  const confirmAddTransHandler = () => {
    if (transCost === '' || transCost === 0 || transDesc === '') { return; }
    const budgets = props.budget.map((budg, i) => {
      if (budg.category === addTransCateg) {
        const transactions = [...budg.transactions];
        if (transactions.length === 20) { transactions.pop(); }
        transactions.unshift({ desc: transDesc, val: transCost, date: String(new Date()) });
        return { ...budg, transactions };
      } else { return budg; }
    });
    if (props.isDemo) {
      setAddTransCateg('');
      props.addNotif('Transaction Added');
      return props.setBudget(budgets);
    }
    axios.put('budgets', { budgets }).then(res => {
      setAddTransCateg('');
      props.addNotif('Transaction Added');
      props.setBudget(budgets);
    }).catch(err => {
      console.log(err);
    });
  };

  // get total budget to display
  let totBudget = 0;
  for (let budg of props.budget) { totBudget += budg.budget; }

  return (
    <div className={classes.Container}>
      <div className={classes.OuterContent}>
        <h1 className={classes.Title}>Budgeting</h1>
        {props.budget.length > 0 ? (
          <div className={classes.Content}>
            <div className={classes.LeftContent}>
              <div className={classes.Charts}>
                <BudgetChart mode="Normal" />
                <BudgetByCateg budget={props.budget} />
              </div>
              <div className={classes.Btns}>
                <BlueBtn big noMargin clicked={() => setShowBudgetPanel(true)}>Edit Budget</BlueBtn>
                <BudgetPanel show={showBudgetPanel} close={() => setShowBudgetPanel(false)} />
              </div>
            </div>
            <div className={classes.Budget}>
              <h1 className={classes.TotalBudget}>Total monthly budget: ${totBudget.toFixed(2)}</h1>
              {props.budget.map((budget, i) => {
                return (
                  <div className={classes.BudgetDiv} key={i}>
                    <div className={classes.InnerBudgetDiv}>
                      <BudgetBars budget={budget} />
                      <div>
                        <button className={classes.ShowBtn} onClick={() => showTransHandler(budget.category)}>
                          Transactions<span className={showCategs.includes(budget.category) ? classes.CaretDown : classes.CaretRight}>{caretIcon}</span>
                        </button>
                        <button className={classes.AddBtn} onClick={() => addTransHandler(budget.category)}>Add Transaction</button>
                      </div>
                    </div>
                    <div className={showCategs.includes(budget.category) ? classes.Transactions : classes.HideTransactions}>
                      {budget.transactions.map((transaction, i) => {
                        const date = new Date(transaction.date).toJSON().slice(0,10).split('-');
                        const dateFormatted = [date[1], date[2], date[0].slice(2)].join('/');
                        return (
                          <div className={classes.Transaction} key={i}>
                            <div>{transaction.desc}</div>
                            <div>${Number(transaction.val).toFixed(2)}</div>
                            <div>{dateFormatted}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className={addTransCateg === budget.category ? classes.ShowAddTrans : classes.HideAddTrans}>
                      <Input val={transDesc} change={val => setTransDesc(val)} ph="Transaction Description" />
                      <NumInput val={transCost} change={val => setTransCost(val)} ph="Cost" />
                      <div className={classes.BtnDiv}>
                        <BlueBtn big noMargin clicked={confirmAddTransHandler}>Add</BlueBtn>
                        <CloseBtn budget close={() => setAddTransCateg('')} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={classes.NewDiv}>
            <BlueBtn big noMargin clicked={() => setShowCreate(true)}>Create a new budget</BlueBtn>
            <NewBudgetPanel show={showCreate} close={() => setShowCreate(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  budget: state.budget.budget,
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setBudget: budget => dispatch(actions.setBudget(budget)),
  addNotif: notif => dispatch(actions.addNotif(notif))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
