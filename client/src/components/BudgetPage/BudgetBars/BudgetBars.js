import React from 'react';
import classes from './BudgetBars.module.css';
import { formatNum } from '../../../utils/formatNum';

const BudgetBars = props => {
  let budgetWidth = ((props.budget.budget - props.budget.remaining) / props.budget.budget) * 304;
  // prevent budget bar from overflowing max width
  if (budgetWidth > 304) { budgetWidth = 304; }
  if (props.small) {
    // adjust budget bars for home screen
    budgetWidth = ((props.budget.budget - props.budget.remaining) / props.budget.budget) * 152;
    if (budgetWidth > 152) { budgetWidth = 152; }
  }
  let budgetSpent = '$' + formatNum((props.budget.budget - props.budget.remaining));
  // doesn't show budget spent if over $1,000,000
  if (budgetSpent > 1000000) { budgetSpent = ''; }
  return (
    <React.Fragment>
      <span className={props.small ? classes.SmallCategory : classes.Category}>{props.budget.category}</span>
      <div className={props.small ? classes.SmallBudgetOval : classes.BudgetOval}>
        <div className={props.small ? classes.SmallBudgetOverlay : classes.BudgetOverlay} style={{ width: `${budgetWidth}px` }}>
          <span className={props.small ? (budgetWidth < 70 ? classes.SmallShowRight : classes.SmallOverlaySpan)
            : budgetWidth < 140 ? classes.ShowRight : classes.OverlaySpan}>
            {budgetSpent}
          </span>
        </div>
      </div>
      <span className={props.small ? classes.SmallBudgetVal : classes.BudgetVal}>
        ${formatNum(props.budget.budget)}
      </span>
    </React.Fragment>
  );
};

export default BudgetBars;
