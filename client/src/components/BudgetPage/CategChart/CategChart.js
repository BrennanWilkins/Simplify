import React from 'react';
import classes from './CategChart.module.css';
import Chart from '../../UI/Chart/Chart';
import { connect } from 'react-redux';

const CategChart = props => {
  // shows category percentage of total, cycles through colors
  const colors = ['#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'];
  let totBudget = 0;
  for (let budg of props.budget) { totBudget += Number(budg.budget); }
  const dataPoints = props.budget.map((budg, i) => {
    return {
      label: budg.category,
      y: ((budg.budget / totBudget) * 100).toFixed(2),
      val: Number(budg.budget).toFixed(2),
      color: colors[i % 6]
    };
  });

  const options = {
    animationEnabled: true,
    data: [{
      type: "pie",
			toolTipContent: "{label}: {y}% (${val})",
			indexLabel: "{y}%",
      indexLabelFontWeight: "bold",
			indexLabelPlacement: "inside",
      dataPoints
    }]
  };

  return (
    <div className={classes.ChartContainer}>
      <Chart options={options} />
    </div>
  );
};

const mapStateToProps = state => ({
  budget: state.budget.budget
});

export default connect(mapStateToProps)(CategChart);
