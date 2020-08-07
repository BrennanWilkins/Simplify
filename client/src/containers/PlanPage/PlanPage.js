import React, { useState } from 'react';
import classes from './PlanPage.module.css';
import Compound from 'compound-interest-calc';
import CanvasJSReact from '../../components/canvasjs/canvasjs.react';
import BlueBtn from '../../components/UI/BlueBtn/BlueBtn';
import { NumInput } from '../../components/UI/Inputs/Inputs';
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

  const setInputsHandler = (val, field) => setInputVals({ ...inputVals, [field]: val });

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
    if (inputVals.years === '0' || inputVals.interest === '0') { return; }
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
              <NumInput val={inputVals.principal} change={val => setInputsHandler(val, 'principal')} />
            </div>
            <div className={classes.InputField}>
              <p>Monthly Contribution</p>
              <NumInput val={inputVals.contrib} change={val => setInputsHandler(val, 'contrib')} />
            </div>
            </div>
          <div className={classes.InputRow}>
            <div className={classes.InputField}>
              <p>Years Compounded</p>
              <NumInput val={inputVals.years} change={val => setInputsHandler(val, 'years')} />
            </div>
            <div className={classes.InputField}>
              <p>Yearly return in %</p>
              <NumInput val={inputVals.interest} change={val => setInputsHandler(val, 'interest')} />
            </div>
          </div>
        </div>
        <div className={classes.Btns}>
          <BlueBtn clicked={calcHandler}>Calculate</BlueBtn>
          <BlueBtn clicked={resetHandler}>Reset</BlueBtn>
        </div>
        <div className={showChart ? classes.Chart : classes.HideChart}>
          <h1 className={classes.Title2}>
            ${Number(Number(finalVal).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <CanvasJSChart options={options} />
          <div className={classes.Block}></div>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
