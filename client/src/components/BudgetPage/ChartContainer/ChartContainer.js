import React, { useState, useEffect } from 'react';
import classes from './ChartContainer.module.css';
import { caretIcon } from '../../UI/UIIcons';
import BudgetChart from '../BudgetChart/BudgetChart';
import CategChart from '../CategChart/CategChart';
import { usePrevious } from '../../../utils/customHooks';

const ChartContainer = props => {
  const prevShow = usePrevious(props.show);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    // if charts switched from hidden -> shown then reanimate charts using key
    if (!prevShow && props.show) { setShowChart(prev => !prev); }
  }, [props.show, prevShow]);

  return (
    <div className={props.show ? classes.Charts : classes.HideCharts}>
      <div className={classes.Chart}><BudgetChart key={showChart} /></div>
      <div className={classes.Chart}><CategChart key={showChart} /></div>
      <div className={classes.Btn}>
        <button onClick={props.change}>
          {props.show ? 'Hide Charts' : 'Show Charts'}
          <span className={props.show ? classes.CaretDown : classes.CaretRight}>{caretIcon}</span>
        </button>
      </div>
    </div>
  );
};

export default ChartContainer;
