import React from 'react';
import classes from './GoalChart.module.css';
import CanvasJSReact from '../canvasjs/canvasjs.react';
import { connect } from 'react-redux';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GoalChart = props => {
  const netWorthVal = props.netWorthData.length === 0 ? '0.00' :
  (props.netWorthData[props.netWorthData.length - 1].value).toFixed(2);

  let percReached = ((netWorthVal / props.goal) * 100).toFixed(2);
  // stops tracking after 100% of goal reached
  if (percReached > 100) { percReached = 100.00; }

  const dataPoints = [{ name: 'Current Net Worth', y: netWorthVal, color: 'rgb(26, 171, 152)' }];
  if (percReached < 100) {
    dataPoints.push({ name: 'Remaining', y: props.goal - netWorthVal, color: 'rgb(15, 119, 147)' });
  }

  const options = {
		animationEnabled: true,
		data: [{ type: "doughnut", dataPoints: dataPoints }]
	};
  // chart size changed to fit home page card
  if (props.mode === 'Small') { options.height = 200; options.width = 200; }

  return (
    <div className={props.mode === 'Small' ? classes.SmallChartContainer : classes.ChartContainer}>
      <CanvasJSChart options={options} />
      <div className={classes.Block}></div>
      <h1>You've reached {percReached}% of your goal</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  netWorthData: state.netWorth.netWorthData,
  goal: state.goal.goal
});

export default connect(mapStateToProps)(GoalChart);
