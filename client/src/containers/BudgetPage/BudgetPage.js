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

const BudgetPage = props => {
  const [showCreate, setShowCreate] = useState(false);
  const [showBudgetPanel, setShowBudgetPanel] = useState(false);
  const [showCategs, setShowCategs] = useState([]);
  const [addTransCateg, setAddTransCateg] = useState('');
  const [transDesc, setTransDesc] = useState('');
  const [transCost, setTransCost] = useState('');

  const showTransHandler = (categ) => {
    const i = showCategs.findIndex(val => val === categ);
    if (i === -1) { return setShowCategs(showCategs.concat([categ])); }
    setShowCategs(showCategs.filter(val => val !== categ));
  };

  const addTransHandler = (categ) => {
    setTransDesc('');
    setTransCost('');
    setAddTransCateg(categ);
  };

  const transCostHandler = (e) => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    setTransCost(val);
  };

  const confirmAddTransHandler = () => {
    if (transCost === '' || transCost === 0 || transDesc === '') { return; }
    const budgets = props.budget.map((budg, i) => {
      if (budg.category === addTransCateg) {
        const transactions = [...budg.transactions];
        if (transactions.length === 5) { transactions.splice(4, 1); }
        transactions.unshift({ desc: transDesc, value: transCost, date: new Date() });
        return { ...budg, transactions };
      }
      return budg;
    });
    if (props.isDemo) { setAddTransCateg(''); return props.setBudget(budgets); }
    axios.put('budgets', { budgets }).then(res => {
      setAddTransCateg('');
      props.setBudget(budgets);
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className={classes.Container}>
      <div className={classes.OuterContent}>
        <h1 className={classes.Title}>Budgeting</h1>
        {props.budget.length > 0 ? (
          <div className={classes.Content}>
            <BudgetChart mode="Normal" />
            <div className={classes.Btns}>
              <button className={classes.Btn} onClick={() => setShowBudgetPanel(true)}>Edit Budget</button>
              <BudgetPanel show={showBudgetPanel} close={() => setShowBudgetPanel(false)} />
            </div>
            <div className={classes.Budget}>
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
                            <div>${Number(transaction.value).toFixed(2)}</div>
                            <div>{dateFormatted}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className={addTransCateg === budget.category ? classes.ShowAddTrans : classes.HideAddTrans}>
                      <input className={classes.Input1} value={transDesc}
                        onChange={e => setTransDesc(e.target.value)} placeholder="Transaction Description" />
                      <input className={classes.Input2} value={transCost} onChange={transCostHandler} placeholder="Cost" />
                      <button onClick={confirmAddTransHandler} className={classes.Btn}>Add</button>
                      <CloseBtn budget close={() => setAddTransCateg('')} />
                    </div>
                    <div className={addTransCateg === budget.category ? classes.SmallShowAddTrans : classes.SmallHideAddTrans}>
                      <input className={classes.Input1} value={transDesc}
                        onChange={e => setTransDesc(e.target.value)} placeholder="Transaction Description" />
                      <input className={classes.Input2} value={transCost} onChange={transCostHandler} placeholder="Cost" />
                      <div className={classes.BtnDiv}>
                        <button onClick={confirmAddTransHandler} className={classes.Btn}>Add</button>
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
            <button className={classes.CreateBtn} onClick={() => setShowCreate(true)}>Create a new budget</button>
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
  setBudget: (budget) => dispatch(actions.setBudget(budget))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
