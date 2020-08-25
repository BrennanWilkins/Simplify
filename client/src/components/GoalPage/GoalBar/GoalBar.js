import React, { useState, useEffect } from 'react';
import classes from './GoalBar.module.css';
import { formatNum } from '../../../utils/formatNum';

const GoalBar = props => {
  const [widthPx, setWidthPx] = useState(0);
  const [rem, setRem] = useState(0);
  const [remPx, setRemPx] = useState(114.5);

  useEffect(() => {
    let width = props.curr === 0 ? 0 : (props.curr / props.goal) * 304;
    // prevent goal bar from overflowing max width
    if (width > 304 || width < 0) { width = 304; }
    let remaining = formatNum(props.goal - props.curr);
    // get position for remaining popup
    let remPos = width === 0 ? 114.5 : (304 - width) / 2 + width - 47.5;
    setWidthPx(width);
    setRem(remaining);
    setRemPx(remPos);
  }, [props.curr, props.goal]);

  return (
    <div className={classes.Bar}>
      <div className={classes.Oval}>
        <div className={classes.Overlay} style={{ width: `${widthPx}px` }}>
          <div className={props.curr > props.goal ? classes.Hide : classes.Remaining} style={{ left: `${remPx}px` }}>
            ${rem} remaining
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalBar;
