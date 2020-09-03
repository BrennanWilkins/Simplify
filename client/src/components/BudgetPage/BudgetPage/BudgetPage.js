import React, { useState, useEffect } from 'react';
import classes from './BudgetPage.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import NewBudgetPanel from '../NewBudgetPanel/NewBudgetPanel';
import BudgetChart from '../BudgetChart/BudgetChart';
import { caretIcon } from '../../UI/UIIcons';
import BudgetPanel from '../BudgetPanel/BudgetPanel';
import { instance as axios } from '../../../axios';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import BudgetBars from '../BudgetBars/BudgetBars';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import { Input, NumInput } from '../../UI/Inputs/Inputs';
import BudgetByCateg from '../BudgetByCateg/BudgetByCateg';
import DeletePanel from '../../UI/DeletePanel/DeletePanel';
import { formatNum } from '../../../utils/formatNum';

const BudgetPage = props => {
  const [showCreate, setShowCreate] = useState(false);
  const [showBudgetPanel, setShowBudgetPanel] = useState(false);
  const [showDeletePanel, setShowDeletePanel] = useState(false);
  const [showCategs, setShowCategs] = useState([]);
  const [addTransCateg, setAddTransCateg] = useState('');
  const [transDesc, setTransDesc] = useState('');
  const [transCost, setTransCost] = useState('');
  const [showCharts, setShowCharts] = useState(true);

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

  useEffect(() => {
    // add enter key submit listener if add transaction shown
    const enterHandler = e => { if (e.key === 'Enter') { confirmAddTransHandler(); } }

    if (addTransCateg !== '') { document.addEventListener('keypress', enterHandler); }
    return () => document.removeEventListener('keypress', enterHandler);
  }, [addTransCateg, confirmAddTransHandler]);

  const deleteHelper = () => {
    props.deleteBudget();
    props.addNotif('Budget deleted');
    setShowDeletePanel(false);
  };

  const deleteHandler = () => {
    if (props.isDemo) { return deleteHelper(); }
    axios.delete('budgets').then(res => { deleteHelper(); }).catch(err => { return; });
  };

  // get total budget to display
  let totBudget = 0;
  for (let budg of props.budget) { totBudget += Number(budg.budget); }

  return (
    <div className={classes.Container}>
      <div className={classes.OuterContent}>
        <h1 className={classes.Title}>Budgeting</h1>
        {props.budget.length ? (
          <div className={classes.Content}>
            <div className={showCharts ? classes.Charts : classes.HideCharts}>
              <div className={classes.Chart}><BudgetChart mode="Normal" /></div>
              <div className={classes.Chart}><BudgetByCateg budget={props.budget} /></div>
              <div className={classes.ChartBtn}>
                <button onClick={() => setShowCharts(prev => !prev)}>
                  {showCharts ? 'Hide Charts' : 'Show Charts'}
                  <span className={showCharts ? classes.CaretDown : classes.CaretRight}>{caretIcon}</span>
                </button>
              </div>
            </div>
            <div className={classes.Budget}>
              <h1 className={classes.TotalBudget}>Total monthly budget: ${formatNum(totBudget)}</h1>
              <div className={classes.Options}>
                <div className={classes.Btn}><BlueBtn big clicked={() => setShowBudgetPanel(true)}>Edit Budget</BlueBtn></div>
                <div className={classes.Btn}><BlueBtn big clicked={() => setShowDeletePanel(true)}>Delete Budget</BlueBtn></div>
                <BudgetPanel showUp={showCharts} show={showBudgetPanel} close={() => setShowBudgetPanel(false)} />
                <DeletePanel showUp={showCharts} show={showDeletePanel} mode="budget" close={() => setShowDeletePanel(false)} delete={deleteHandler} />
              </div>
              {props.budget.map((budget, i) => {
                return (
                  <div className={classes.BudgetDiv} key={i}>
                    <div className={classes.InnerBudgetDiv}>
                      <BudgetBars budget={budget} />
                      <div>
                        <button className={classes.ShowBtn} onClick={() => showTransHandler(budget.category)}>
                          Transactions<span className={showCategs.includes(budget.category) ? classes.CaretDown : classes.CaretRight}>{caretIcon}</span>
                        </button>
                        <span className={classes.AddBtn}><GreenBtn big clicked={() => addTransHandler(budget.category)}>Add Transaction</GreenBtn></span>
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
                      <div className={classes.CostInput}><NumInput val={transCost} change={val => setTransCost(val)} ph="Cost" /></div>
                      <div className={classes.ConfirmBtn}><BlueBtn big clicked={confirmAddTransHandler}>Add</BlueBtn></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={classes.NewDiv}>
            <BlueBtn big clicked={() => setShowCreate(true)}>Create a new budget</BlueBtn>
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
  addNotif: notif => dispatch(actions.addNotif(notif)),
  deleteBudget: () => dispatch(actions.deleteBudget())
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
