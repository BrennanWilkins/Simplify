import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classes from './BudgetBars.module.css';
import { formatNum } from '../../../utils/formatNum';

const BudgetBars = props => {
  const [width, setWidth] = useState(0);
  const [spent, setSpent] = useState('');
  const [remLeft, setRemLeft] = useState(88);

  useEffect(() => {
    let budgetWidth = ((props.budget.budget - props.budget.remaining) / props.budget.budget) * 304;
    // prevent budget bar from overflowing max width
    if (budgetWidth > 304) { budgetWidth = 304; }
    if (props.small) {
      // adjust budget bars for home screen
      budgetWidth = ((props.budget.budget - props.budget.remaining) / props.budget.budget) * 152;
      if (budgetWidth > 152) { budgetWidth = 152; }
    }
    let budgetSpent = props.budget.budget - props.budget.remaining;
    // doesn't show budget spent if over $999,999,999
    if (budgetSpent > 999999999) { budgetSpent = ''; }
    else { budgetSpent = '$' + formatNum(budgetSpent); }
    // get position for remaining popup
    let remPos = (304 - budgetWidth) / 2 + budgetWidth - 64;
    setWidth(budgetWidth);
    setSpent(budgetSpent);
    setRemLeft(remPos);
  }, [props.budget, props.small]);

  return (
    <div className={props.small ? classes.SmallBar : props.darkMode ? `${classes.Bar} ${classes.Dark}` : classes.Bar}>
      <span className={props.small ? classes.SmallCategory : classes.Category}>{props.budget.category}</span>
      <div className={classes.OvalContainer}>
        <div className={props.small ? classes.SmallOval : classes.Oval}>
          <div className={props.small ? classes.SmallOverlay : classes.Overlay} style={{ width: `${width}px` }}>
            <span className={props.small ? (width < 70 ? classes.SmallShowRight : classes.SmallOverlaySpan)
              : width < 140 ? classes.ShowRight : classes.OverlaySpan}>{spent}</span>
            {!props.small && <div className={props.budget.remaining <= 0 ? classes.Hide : classes.Remaining} style={{ left: `${remLeft}px` }}>
              ${formatNum(props.budget.remaining)} remaining
            </div>}
          </div>
        </div>
        {!props.small && <div className={classes.Overlay2} style={{ width: `${width}px` }}></div>}
      </div>
      <span className={props.small ? classes.SmallBudgetVal : classes.BudgetVal}>
        ${formatNum(props.budget.budget)}
      </span>
    </div>
  );
};

export default BudgetBars;
