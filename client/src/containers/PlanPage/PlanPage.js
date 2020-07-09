import React, { useState } from 'react';
import classes from './PlanPage.module.css';
import Compound from 'compound-interest-calc';
import CanvasJSReact from '../../components/canvasjs/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PlanPage = props => {
  const [inputVals, setInputVals] = useState({
    principal: '',
    contrib: '',
    years: '',
    interest: ''
  });
  const [showChart, setShowChart] = useState(false);
  const [dataPoints, setDataPoints] = useState([]);
  const [finalVal, setFinalVal] = useState('');

  const setInputsHandler = (e) => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    setInputVals({ ...inputVals, [e.target.name]: val });
  };

  const resetHandler = () => {
    const updatedVals = { ...inputVals };
    for (let key in updatedVals) { updatedVals[key] = ''; }
    setInputVals(updatedVals);
    setFinalVal('');
    setDataPoints([]);
    setShowChart(false);
  };

  const calcHandler = () => {
    for (let key in inputVals) { if (inputVals[key] === '') { return; } }
    const res = Compound(inputVals.principal, inputVals.contrib, inputVals.years, (inputVals.interest / 100), 12);
    setFinalVal(res.result);
    const newData = res.total.map((pt, i) => ({ x: i, y: pt }));
    setDataPoints(newData);
    setShowChart(true);
  };

  const options = {
    animationEnabled: true,
    theme: 'light2',
    exportEnabled: false,
    axisY: { valueFormatString: "'$'0" },
    axisX: { valueFormatString: "'Year '0", minimum: 0 },
    toolTip: { content: 'Year {x}: ${y}' },
    data: [{
      type: 'area',
      indexLabelFontColor: '#5A5757',
      indexLabelPlacement: 'outside',
      color: 'rgb(26, 171, 152)',
      fillOpacity: '1',
      dataPoints
    }]
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Content}>
        <h1 className={classes.Title}>Compound Interest Visualizer</h1>
        <div className={classes.Inputs}>
          <div className={classes.InputRow}>
            <div className={classes.InputField}>
              <p>Principal Investment</p>
              <input value={inputVals.principal} name="principal" onChange={setInputsHandler} />
            </div>
            <div className={classes.InputField}>
              <p>Monthly Contribution</p>
              <input value={inputVals.contrib} name="contrib" onChange={setInputsHandler} />
            </div>
            </div>
          <div className={classes.InputRow}>
            <div className={classes.InputField}>
              <p>Years Compounded</p>
              <input value={inputVals.years} name="years" onChange={setInputsHandler} />
            </div>
            <div className={classes.InputField}>
              <p>Yearly return in %</p>
              <input value={inputVals.interest} name="interest" onChange={setInputsHandler} />
            </div>
          </div>
        </div>
        <div className={classes.Btns}>
          <button onClick={calcHandler}>Calculate</button>
          <button onClick={resetHandler}>Reset</button>
        </div>
        <div className={showChart ? classes.Chart : classes.HideChart}>
          <h1 className={classes.Title2}>${String(Number(finalVal).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</h1>
          <CanvasJSChart options={options} />
          <div className={classes.Block}></div>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
