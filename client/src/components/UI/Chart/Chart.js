import React from 'react';
import classes from './Chart.module.css';
import CanvasJSChart from '../../UI/canvasjs/canvasjs.react';
import CanvasJSStockChart from '../../UI/canvasjs/canvasjs.stock.react';

const Chart = props => (
  <div className={classes.Chart}>
    <CanvasJSChart options={props.options} />
    <div className={props.darkMode ? `${classes.Block} ${classes.Dark}` : classes.Block}
    style={props.lightblue ? { background: 'rgb(234, 247, 251)' } :
    props.blue ? { background: 'rgb(224, 244, 249)'} : undefined}></div>
  </div>
);

export const StockChart = props => (
  <div className={classes.StockChart}>
    <CanvasJSStockChart options={props.options} />
    <div className={`${classes.Block} ${classes.StockBlock1}`}></div>
    <div className={`${classes.Block} ${classes.StockBlock2}`}></div>
  </div>
);

export default Chart;
