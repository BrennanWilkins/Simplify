import React from 'react';
import classes from './GoalChart.module.css';
import Chart from '../../UI/Chart/Chart';

const GoalChart = props => {
  // sort contributions & create goal value over time data
  const data = [...props.data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const dataPoints = data.map((dataPt, i) => {
    let date = dataPt.date.split('-');
    let y = Number(data.slice(0, i + 1).reduce((acc, curr) => acc + Number(curr.val), 0).toFixed(2));
    return { x: new Date(date[0], Number(date[1] - 1), date[2]), y };
  });

  const options = {
    animationEnabled: true,
    theme: 'light2',
    exportEnabled: false,
    axisY: { valueFormatString: "'$'0" },
    axisX: { valueFormatString: 'MM/DD/YY' },
    toolTip: { content: '{x}: ${y}' },
    data: [{
      type: 'area',
      indexLabelFontColor: '#5A5757',
      indexLabelPlacement: 'outside',
      color: 'rgb(26, 171, 152)',
      fillOpacity: '1',
      dataPoints
    }],
    height: 300,
    backgroundColor: props.blue ? 'rgb(224, 244, 249)' : 'transparent'
  };

  return (
    <div>
      <div className={classes.Chart}>
        <Chart options={options} blue={props.blue} />
      </div>
    </div>
  );
};

export default GoalChart;
