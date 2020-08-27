import React, { useState, useEffect } from 'react';
import classes from './BudgetBars.module.css';
import { formatNum } from '../../../utils/formatNum';

const BudgetBars = props => {
  const [width, setWidth] = useState(0);
  const [spent, setSpent] = useState('');
  const [remPx, setRemPx] = useState(319.5);

  useEffect(() => {
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
    // get position for remaining popup
    let remPos = budgetWidth === 0 ? 319.5 : (304 - budgetWidth) / 2 + budgetWidth + 157.5;
    setWidth(budgetWidth);
    setSpent(budgetSpent);
    setRemPx(remPos);
  }, [props.budget, props.small]);

  return (
    <React.Fragment>
      <span className={props.small ? classes.SmallCategory : classes.Category}>{props.budget.category}</span>
      <div className={props.small ? classes.SmallOval : classes.Oval}>
        <div className={props.small ? classes.SmallOverlay : classes.Overlay} style={{ width: `${width}px` }}>
          <span className={props.small ? (width < 70 ? classes.SmallShowRight : classes.SmallOverlaySpan)
            : width < 140 ? classes.ShowRight : classes.OverlaySpan}>{spent}</span>
          {!props.small && <div className={props.budget.remaining <= 0 ? classes.Hide : classes.Remaining} style={{ left: `${remPx}px` }}>
            ${formatNum(props.budget.remaining)} remaining
          </div>}
        </div>
      </div>
      {!props.small && <div className={classes.Overlay2} style={{ width: `${width}px` }}></div>}
      <span className={props.small ? classes.SmallBudgetVal : classes.BudgetVal}>
        ${formatNum(props.budget.budget)}
      </span>
    </React.Fragment>
  );
};

export default BudgetBars;
