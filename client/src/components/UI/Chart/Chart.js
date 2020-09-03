import React from 'react';
import classes from './Chart.module.css';
import CanvasJSChart from '../../UI/canvasjs/canvasjs.react';

const Chart = props => (
  <div className={classes.Chart}>
    <CanvasJSChart options={props.options} />
    <div className={classes.Block}
    style={props.lightblue ? { background: 'rgb(234, 247, 251)' } :
    props.blue ? { background: 'rgb(224, 244, 249)'} : undefined}></div>
  </div>
);

export default Chart;
