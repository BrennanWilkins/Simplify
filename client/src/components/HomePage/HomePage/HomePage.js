import React from 'react';
import classes from './HomePage.module.css';
import HomeCard from '../HomeCard/HomeCard';
import NetWorthChart from '../../PortfolioPage/NetWorthChart/NetWorthChart';
import InvestmentTable from '../../PortfolioPage/InvestmentTable/InvestmentTable';
import GoalChart from '../../GoalPage/GoalChart/GoalChart';
import { connect } from 'react-redux';
import BudgetBars from '../../BudgetPage/BudgetBars/BudgetBars';

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
                {props.netWorthGoal ? <GoalChart small /> : (
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
  netWorthGoal: state.goals.netWorthGoal,
  budget: state.budget.budget
});

export default connect(mapStateToProps)(HomePage);
