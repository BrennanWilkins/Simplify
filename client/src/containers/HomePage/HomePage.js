import React from 'react';
import classes from './HomePage.module.css';
import HomeCard from '../../components/HomeCard/HomeCard';
import NetWorthChart from '../../components/NetWorthChart/NetWorthChart';
import InvestmentTable from '../../components/InvestmentTable/InvestmentTable';
import GoalChart from '../../components/GoalChart/GoalChart';
import { connect } from 'react-redux';
import BudgetBars from '../../components/BudgetBars/BudgetBars';

const HomePage = props => {
  return (
    <div className={classes.Container}>
      <div className={classes.Content}>
        <div className={classes.Cards}>
          <HomeCard num="1">
            <NetWorthChart small />
          </HomeCard>
          <HomeCard num="2">
            <div className={classes.Card}>
              <h1 className={classes.Title}>Stocks</h1>
              <InvestmentTable mode="Stocks" />
            </div>
          </HomeCard>
          <HomeCard num="3">
            <div className={classes.Card}>
              <h1 className={classes.Title}>Cryptocurrencies</h1>
              <InvestmentTable mode="Cryptos" />
            </div>
          </HomeCard>
          <HomeCard num="4">
            <div className={classes.Card}>
              <h1 className={classes.Title2}>Assets</h1>
              <InvestmentTable mode="Assets" />
              <h1 className={classes.Title2}>Liabilities</h1>
              <InvestmentTable mode="Debts" />
            </div>
          </HomeCard>
          <HomeCard num="5">
            <div className={classes.Card}>
              <h1 className={classes.Title}>Budgeting</h1>
              {props.budget.length > 0 ? (
                <div className={classes.BudgetContainer}>
                  {props.budget.map((budget, i) => (
                    <div className={classes.BudgetDiv} key={i}>
                      <div className={classes.InnerBudgetDiv}>
                        <BudgetBars budget={budget} small />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={classes.ChartContainer}>
                  <p className={classes.SubTitle}>Create a new budget!</p>
                </div>
              )}
            </div>
          </HomeCard>
          <HomeCard num="6">
            <div className={classes.Card}>
              <h1 className={classes.Title}>Net Worth Goal</h1>
              <div className={classes.ChartContainer}>
                {props.goal ? <GoalChart mode="Small" /> : (
                  <p className={classes.SubTitle}>Create a new net worth goal!</p>
                )}
              </div>
            </div>
          </HomeCard>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  goal: state.goal.goal,
  budget: state.budget.budget
});

export default connect(mapStateToProps)(HomePage);
