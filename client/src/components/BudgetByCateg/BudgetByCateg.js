import React from 'react';
import classes from './BudgetByCateg.module.css';
import CanvasJSReact from '../canvasjs/canvasjs.react';

const colors = ['rgb(18, 152, 189)', 'rgb(13, 112, 139)', 'rgb(0, 162, 208)', 'rgb(74, 165, 190)', 'rgb(63, 190, 224)'];

const Chart = props => {
  let totBudget = 0;
  for (let budg of props.budget) { totBudget += budg.budget; }
  const dataPoints = props.budget.map((budg, i) => {
    return {
      label: budg.category,
      y: ((budg.budget / totBudget) * 100).toFixed(2),
      val: Number(budg.budget).toFixed(2),
      color: colors[i % 4]
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
