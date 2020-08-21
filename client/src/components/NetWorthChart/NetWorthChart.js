import React from 'react';
import classes from './NetWorthChart.module.css';
import { connect } from 'react-redux';
import CanvasJSReact from '../canvasjs/canvasjs.react';
import { createNetWorthOptions } from '../../utils/chartFuncs';
import { formatNum } from '../../utils/formatNum';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const NetWorthChart = props => {
  const netWorthVal = props.netWorthData.length === 0 ? '0.00' :
  formatNum(props.netWorthData[props.netWorthData.length - 1].value);

  // props.small used for chart on home page
  return (
    props.small ? (
      <div className={classes.Chart}>
        <div className={classes.NetWorthTitleSmall}>
          <h1 className={classes.NetWorthTextSmall}>Net Worth</h1>
          <h1 className={classes.NetWorthValueSmall}>${netWorthVal}</h1>
        </div>
        <div className={classes.NetWorthChartSmall}>
          <CanvasJSChart options={{ ...createNetWorthOptions(props.netWorthData), height: 200 }} />
          <div className={classes.Block}></div>
        </div>
      </div>
    ) : (
      <div>
        <div className={classes.NetWorthTitle}>
          <h1 className={classes.NetWorthText}>Net Worth</h1>
          <h1 className={classes.NetWorthValue}>${netWorthVal}</h1>
        </div>
        <div className={classes.NetWorthChart}>
          <CanvasJSChart options={{ ...createNetWorthOptions(props.netWorthData) }} />
          <div className={classes.Block}></div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  netWorthData: state.netWorth.netWorthData
});

export default connect(mapStateToProps)(NetWorthChart);
