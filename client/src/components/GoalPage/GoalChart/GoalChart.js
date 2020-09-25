import React, { useMemo } from 'react';
import classes from './GoalChart.module.css';
import Chart from '../../UI/Chart/Chart';

const GoalChart = props => {
  const dataPoints = useMemo(() => {
    // sort contributions & create goal value over time data
    const data = [...props.data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const newData = data.map((dataPt, i) => {
      let date = dataPt.date.split('-');
      let y = Number(data.slice(0, i + 1).reduce((acc, curr) => acc + Number(curr.val), 0).toFixed(2));
      return { x: new Date(date[0], Number(date[1] - 1), date[2]), y };
    });
    return newData;
  }, [props.data]);

  const options = {
    theme: props.darkMode ? 'dark2' : 'light2',
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
    backgroundColor: props.blue ? 'rgb(224, 244, 249)' : props.expandDark ? 'rgb(21, 59, 77)' : props.darkMode ? 'rgb(32, 84, 109)' : 'transparent',
  };

  return (
    <div>
      <div className={classes.Chart}>
        <Chart options={options} blue={props.blue} darkMode={props.darkMode} darkMode2={props.expandDark} />
        {props.data.length === 0 && <p className={props.darkMode ? classes.DarkText : classes.Text}>Add a contribution to see your goal progress here</p>}
      </div>
    </div>
  );
};

export default GoalChart;
