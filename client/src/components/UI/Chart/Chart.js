import React from 'react';
import classes from './Chart.module.css';
import CanvasJSChart from '../../UI/canvasjs/canvasjs.react';
import CanvasJSStockChart from '../../UI/canvasjs/canvasjs.stock.react';

const Chart = props => (
  <div className={classes.Chart}>
    <CanvasJSChart options={{ ...props.options, animationEnabled: true, exportEnabled: false }} />
    <div className={classes.Block} style={props.lightblue ?
      { background: 'rgb(234, 247, 251)' } :
      props.blue ? { background: 'rgb(224, 244, 249)' } :
      props.darkMode5 ? { background: 'rgb(31, 65, 84)' } :
      props.darkMode4 ? { background: 'rgb(31, 65, 84)' } :
      props.darkMode3 ? { background: 'rgb(15, 37, 55)' } :
      props.darkMode2 ? { background: 'rgb(21, 59, 77)' } :
      props.darkMode ? { background: 'var(--chartBack)' } :
      undefined}></div>
  </div>
);

export const StockChart = props => (
  <div className={classes.StockChart}>
    <CanvasJSStockChart options={{ ...props.options, animationEnabled: true, exportEnabled: false }} />
    <div className={`${classes.Block} ${classes.StockBlock1}`}></div>
    <div className={`${classes.Block} ${classes.StockBlock2}`}></div>
  </div>
);

export default Chart;
