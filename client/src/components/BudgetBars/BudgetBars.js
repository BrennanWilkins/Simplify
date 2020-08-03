import React from 'react';
import classes from './BudgetBars.module.css';

const BudgetBars = props => {
  let budgetWidth = ((props.budget.budget - props.budget.remaining) / props.budget.budget) * 300;
  // prevent budget bar from overflowing max width
  if (budgetWidth > 300) { budgetWidth = 300; }
  if (props.small) {
    // adjust budget bars for home screen
    budgetWidth = ((props.budget.budget - props.budget.remaining) / props.budget.budget) * 150;
    if (budgetWidth > 150) { budgetWidth = 150; }
  }
  let budgetSpent = (props.budget.budget - props.budget.remaining).toFixed(2);
  // doesn't show budget spent if over $1,000,000
  if (budgetSpent > 1000000) { budgetSpent = ''; }
  return (
    <React.Fragment>
      <span className={props.small ? classes.SmallCategory : classes.Category}>{props.budget.category}</span>
      <div className={props.small ? classes.SmallBudgetOval : classes.BudgetOval}>
        <div className={props.small ? classes.SmallBudgetOverlay : classes.BudgetOverlay} style={{ width: `${budgetWidth}px` }}>
          <span className={props.small ? (budgetWidth < 70 ? classes.SmallShowRight : classes.SmallOverlaySpan)
            : budgetWidth < 140 ? classes.ShowRight : classes.OverlaySpan}>
            ${budgetSpent}
          </span>
        </div>
      </div>
      <span className={props.small ? classes.SmallBudgetVal : classes.BudgetVal}>
        ${Number(Number(props.budget.budget).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </React.Fragment>
  );
};

export default BudgetBars;
