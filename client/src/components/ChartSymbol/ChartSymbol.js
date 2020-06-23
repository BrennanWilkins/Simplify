import React from 'react';
import chartSymbol from '../../assets/chart.jpg';
import classes from './ChartSymbol.module.css';

const chart = (props) => {
  return (
    <div className={classes.chartDiv}>
      <img src={chartSymbol} alt="Home" />
    </div>
  );
};

export default chart;
