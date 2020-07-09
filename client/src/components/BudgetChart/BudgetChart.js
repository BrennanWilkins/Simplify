import React from 'react';
import classes from './BudgetChart.module.css';
import CanvasJSReact from '../canvasjs/canvasjs.react';
import { connect } from 'react-redux';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BudgetChart = props => {
  let totBudget = 0;
  let totSpent = 0;
  props.budget.forEach(budget => {
    totBudget += Number(budget.budget);
    totSpent += Number(budget.budget - budget.remaining);
  });
  let percReached = (totSpent / totBudget * 100).toFixed(2);
  if (percReached > 1000) { percReached = 'over 1000'; }

  const dataPoints = [{ name: 'Total Spent', y: totSpent, color: 'rgb(18, 152, 189)' }];
  if (percReached !== 'over 1000') {
    dataPoints.push({ name: 'Remaining Budget', y: Number(totBudget - totSpent), color: 'rgb(26, 171, 152)' });
  }

  const options = { animationEnabled: true, data: [{ type: "doughnut", dataPoints: dataPoints }] };
  if (props.mode === 'Small') { options.height = 200; options.width = 200; }

  return (
    <div className={props.mode === 'Small' ? classes.SmallChartContainer : classes.ChartContainer}>
      <CanvasJSChart options={options} />
      <div className={classes.Block}></div>
      <h1>You've reached {percReached}% of your budget this month</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  budget: state.budget.budget
});

export default connect(mapStateToProps)(BudgetChart);
