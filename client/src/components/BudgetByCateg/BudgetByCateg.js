import React from 'react';
import classes from './BudgetByCateg.module.css';
import CanvasJSReact from '../canvasjs/canvasjs.react';

const COLORS = ['#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'];

const Chart = props => {
  let totBudget = 0;
  for (let budg of props.budget) { totBudget += budg.budget; }
  const dataPoints = props.budget.map((budg, i) => {
    return {
      label: budg.category,
      y: ((budg.budget / totBudget) * 100).toFixed(2),
      val: Number(budg.budget).toFixed(2),
      color: COLORS[i % 6]
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
      <CanvasJSReact.CanvasJSChart options={options} />
      <div className={classes.Block}></div>
    </div>
  );
};

export default Chart;
