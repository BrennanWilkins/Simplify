import React, { useState, useEffect } from 'react';
import classes from './BudgetPage.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import NewBudgetPanel from '../NewBudgetPanel/NewBudgetPanel';
import { caretIcon, pencilIcon, trashIcon, plusIcon } from '../../UI/UIIcons';
import EditBudgetPanel from '../EditBudgetPanel/EditBudgetPanel';
import { instance as axios } from '../../../axios';
import BudgetBars from '../BudgetBars/BudgetBars';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import DeletePanel from '../../UI/DeletePanel/DeletePanel';
import { formatNum } from '../../../utils/formatNum';
import { formatDate3 } from '../../../utils/formatDate';
import AddTrans from '../AddTrans/AddTrans';
import ChartContainer from '../ChartContainer/ChartContainer';

const BudgetPage = props => {
  const [showCreate, setShowCreate] = useState(false);
  const [showBudgetPanel, setShowBudgetPanel] = useState(false);
  const [showDeletePanel, setShowDeletePanel] = useState(false);
  const [showCategs, setShowCategs] = useState([]);
  const [addTransCateg, setAddTransCateg] = useState('');
  const [transDesc, setTransDesc] = useState('');
  const [transCost, setTransCost] = useState('');
  const [showCharts, setShowCharts] = useState(true);
  const [totBudget, setTotBudget] = useState(0);

  useEffect(() => {
    // get total budget to display
    let tot = 0;
    for (let budg of props.budget) { tot += Number(budg.budget); }
    setTotBudget(tot);
  }, [props.budget]);

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
    if (transCost === '' || transCost === 0 || transDesc === '' ||
     transCost > 999999999 || transDesc.length > 70) { return; }
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
    }).catch(err => { console.log(err); });
  };

  const deleteHelper = () => {
    props.deleteBudget();
    props.addNotif('Budget deleted');
    setShowDeletePanel(false);
  };

  const deleteHandler = () => {
    if (props.isDemo) { return deleteHelper(); }
    axios.delete('budgets').then(res => { deleteHelper(); }).catch(err => { return; });
  };

  return (
    <div className={props.darkMode ? `${classes.Container} ${classes.Dark}` : classes.Container}>
      <div className={classes.Content}>
        <h1 className={classes.Title}>Budgeting</h1>
        {props.budget.length ? (
          <React.Fragment>
            <ChartContainer show={showCharts} change={() => setShowCharts(prev => !prev)} darkMode={props.darkMode} />
            <div className={classes.Budget}>
              <h1 className={classes.TotalBudget}>Total monthly budget: ${formatNum(totBudget)}</h1>
              <div className={classes.Options}>
                <div className={classes.Btn}><BlueBtn big clicked={() => setShowBudgetPanel(true)}>{pencilIcon}Edit Budget</BlueBtn></div>
                <div className={classes.Btn}><BlueBtn big clicked={() => setShowDeletePanel(true)}>{trashIcon}Delete Budget</BlueBtn></div>
                <EditBudgetPanel showUp={showCharts} show={showBudgetPanel} close={() => setShowBudgetPanel(false)} />
                <DeletePanel showUp={showCharts} show={showDeletePanel} mode="budget" close={() => setShowDeletePanel(false)} delete={deleteHandler} />
              </div>
              {props.budget.map((budget, i) => {
                return (
                  <div className={classes.BudgetDiv} key={i}>
                    <BudgetBars budget={budget} darkMode={props.darkMode} />
                    <div className={classes.Btns}>
                      <button className={classes.ShowBtn} onClick={() => showTransHandler(budget.category)}>
                        Transactions<span className={showCategs.includes(budget.category) ? classes.CaretDown : classes.CaretRight}>{caretIcon}</span>
                      </button>
                      <span className={classes.AddBtn}><GreenBtn big clicked={() => addTransHandler(budget.category)}>{plusIcon}Add Transaction</GreenBtn></span>
                    </div>
                    <div className={showCategs.includes(budget.category) ? classes.Transactions : classes.HideTransactions}>
                      {budget.transactions.map((transaction, i) => (
                        <div className={classes.Transaction} style={i === 0 ? { marginTop: '15px' } : null} key={i}>
                          <div>{transaction.desc}</div>
                          <div>${formatNum(transaction.val)}</div>
                          <div>{formatDate3(new Date(transaction.date))}</div>
                        </div>
                      ))}
                    </div>
                    <AddTrans show={addTransCateg === budget.category} transDesc={transDesc} close={() => setAddTransCateg('')} darkMode={props.darkMode}
                      transCost={transCost} confirm={confirmAddTransHandler} changeDesc={val => setTransDesc(val)} changeCost={val => setTransCost(val)} />
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ) : (
          <div className={classes.NewDiv}>
            <div className={classes.CreateBtn}>
              <BlueBtn big clicked={() => setShowCreate(true)}>Create a new budget</BlueBtn>
            </div>
            <NewBudgetPanel show={showCreate} close={() => setShowCreate(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  budget: state.budget.budget,
  isDemo: state.auth.isDemo,
  darkMode: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  setBudget: budget => dispatch(actions.setBudget(budget)),
  addNotif: notif => dispatch(actions.addNotif(notif)),
  deleteBudget: () => dispatch(actions.deleteBudget())
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
