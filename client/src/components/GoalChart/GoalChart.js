import React from 'react';
import classes from './GoalChart.module.css';
import CanvasJSReact from '../canvasjs/canvasjs.react';
import { connect } from 'react-redux';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GoalChart = props => {
  const netWorthVal = props.netWorthData.length === 0 ? '0.00' :
  (props.netWorthData[props.netWorthData.length - 1].value).toFixed(2);

  let percReached = ((netWorthVal / props.netWorthGoal) * 100);
  if (percReached < 100 && percReached > 99.99) { percReached = 99.99; }
  // stops tracking after 100% of goal reached
  else if (percReached > 100) { percReached = 'over 100'; }
  else { percReached = percReached.toFixed(2); }

  const dataPoints = [{ name: 'Current Net Worth', y: netWorthVal, color: 'rgb(26, 171, 152)' }];
  if (percReached < 100) {
    dataPoints.push({ name: 'Remaining', y: props.netWorthGoal - netWorthVal, color: 'rgb(15, 119, 147)' });
  }

  const options = { animationEnabled: true, data: [{ type: "doughnut", dataPoints: dataPoints }] };

  // chart size changed to fit home page card
  if (props.small) { options.height = 200; options.width = 200; }
  else { options.backgroundColor = 'transparent'; options.height = 330; options.width = 330; }

  return (
    <div className={props.small ? classes.SmallChartContainer : classes.ChartContainer}>
      <CanvasJSChart options={options} />
      <div className={classes.Block}></div>
      <h1>You've reached {percReached}% of your goal</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  netWorthData: state.netWorth.netWorthData,
  netWorthGoal: state.goals.netWorthGoal
});

export default connect(mapStateToProps)(GoalChart);
