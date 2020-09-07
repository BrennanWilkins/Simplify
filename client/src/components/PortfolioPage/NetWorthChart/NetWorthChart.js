import React from 'react';
import classes from './NetWorthChart.module.css';
import { connect } from 'react-redux';
import Chart from '../../UI/Chart/Chart';
import { formatNum } from '../../../utils/formatNum';

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
    <div className={props.small ? undefined : classes.Container}>
      <h1 className={props.small ? classes.TitleSmall : classes.Title}>
        <span>Net Worth</span>
        <span className={classes.Value}>${netWorthVal}</span>
      </h1>
      <div className={props.small ? classes.ChartSmall : classes.Chart}>
        <Chart options={props.small ? { ...options, height: 200 } : options} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  netWorthData: state.netWorth.netWorthData
});

export default connect(mapStateToProps)(NetWorthChart);
