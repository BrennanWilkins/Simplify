import React from 'react';
import classes from './NetWorthChart.module.css';
import { connect } from 'react-redux';
import CanvasJSReact from '../../UI/canvasjs/canvasjs.react';
import { formatNum } from '../../../utils/formatNum';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const NetWorthChart = props => {
  const netWorthVal = props.netWorthData.length === 0 ? '0.00' :
  formatNum(props.netWorthData[props.netWorthData.length - 1].value);

  const netWorthData = props.netWorthData.map(dataPt => ({ x: new Date(dataPt.date), y: Number((dataPt.value).toFixed(2)) }));

  const options = {
    animationEnabled: true,
    theme: 'light2',
    exportEnabled: false,
    axisY: { valueFormatString: "'$'0" },
    axisX: { valueFormatString: 'MM/DD/YY', labelAngle: -20 },
    toolTip: { content: '{x}: ${y}' },
    data: [{
      type: 'area',
      indexLabelFontColor: '#5A5757',
      indexLabelPlacement: 'outside',
      color: 'rgb(26, 171, 152)',
      fillOpacity: '1',
      dataPoints: netWorthData
    }]
  };

  // props.small used for chart on home page
  return (
    props.small ? (
      <div className={classes.Chart}>
        <div className={classes.NetWorthTitleSmall}>
          <h1 className={classes.NetWorthTextSmall}>Net Worth</h1>
          <h1 className={classes.NetWorthValueSmall}>${netWorthVal}</h1>
        </div>
        <div className={classes.NetWorthChartSmall}>
          <CanvasJSChart options={{ ...options, height: 200 }} />
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
          <CanvasJSChart options={options} />
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
