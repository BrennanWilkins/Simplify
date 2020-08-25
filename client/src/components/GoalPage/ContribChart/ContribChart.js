import React from 'react';
import classes from './ContribChart.module.css';
import CanvasJSReact from '../../UI/canvasjs/canvasjs.react';

const ContribChart = props => {
  const dataPoints = props.data.map(dataPt => {
    let date = dataPt.date.split('-');
    return { x: new Date(date[0], Number(date[1] - 1), date[2]), y: Number(Number(dataPt.val).toFixed(2)) };
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
    backgroundColor: props.blue ? 'rgb(231, 247, 251)' : 'transparent'
  };

  return (
    <div>
      <h3 className={classes.Title}>My Contributions</h3>
      <div className={classes.Chart}>
        <CanvasJSReact.CanvasJSChart options={options} />
        <div className={classes.Block} style={props.blue ? { background: 'rgb(231, 247, 251)' } : undefined}></div>
      </div>
    </div>
  );
};

export default ContribChart;
