import React, { useState } from 'react';
import classes from './PlanPage.module.css';
import Chart from '../../UI/Chart/Chart';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import { NumInput } from '../../UI/Inputs/Inputs';
import { calcRetire, calcCompound } from '../../../utils/planPageCalcs';
import TaxCalculator from '../TaxCalculator/TaxCalculator';
import Container from '../PlanPageContainer/PlanPageContainer';
import { formatNum } from '../../../utils/formatNum';
import { connect } from 'react-redux';

const PlanPage = props => {
  const [compoundVals, setCompoundVals] = useState({
    principal: '',
    contrib: '',
    years: '',
    interest: '',
    finalVal: '',
    dataPoints: [],
    showChart: false
  });
  const [retireVals, setRetireVals] = useState({
    goal: '',
    interest: '',
    age: '',
    shownAge: '',
    dataPoints: [],
    showChart: false
  });
  const [currMode, setCurrMode] = useState('Compound');

  const resetHandler = () => {
    if (currMode === 'Compound') {
      setCompoundVals({
        principal: '',
        contrib: '',
        years: '',
        interest: '',
        finalVal: '',
        dataPoints: [],
        showChart: false
      });
    } else {
      setRetireVals({
        goal: '',
        interest: '',
        age: '',
        shownAge: '',
        dataPoints: [],
        showChart: false
      });
    }
  };

  const calcIsValid = () => {
    // validate input fields
    if (currMode === 'Compound') {
      if (compoundVals.years === '0' || compoundVals.interest === '0' || compoundVals.years === ''
      || compoundVals.interest === '' || compoundVals.principal === '' || compoundVals.contrib === '') { return false; }
    } else {
      if (retireVals.goal === '' || retireVals.goal === '0' || retireVals.interest === '' ||
      retireVals.interest === '0' || retireVals.age === '' || retireVals.age < 25) { return false; }
    }
    return true;
  };

  const compoundHandler = () => {
    const dataPoints = calcCompound(compoundVals);
    setCompoundVals({ ...compoundVals, finalVal: dataPoints[compoundVals.years].y, dataPoints, showChart: true });
  };

  const retireHandler = () => {
    setRetireVals({ ...retireVals, dataPoints: calcRetire(retireVals), showChart: true, shownAge: retireVals.age });
  };

  const calcHandler = () => {
    // if invalid input fields return
    if (!calcIsValid()) { return; }
    if (currMode === 'Compound') { compoundHandler(); }
    else { retireHandler(); }
  };

  const compoundOptions = {
    theme: props.darkMode ? 'dark2' : 'light2',
    axisY: { valueFormatString: "'$'0" },
    axisX: { valueFormatString: "'Year '0", minimum: 0 },
    toolTip: { content: 'Year {x}: ${y}' },
    backgroundColor: props.darkMode ? 'rgb(32, 84, 109)' : 'white',
    data: [{
      type: 'area',
      indexLabelFontColor: '#5A5757',
      indexLabelPlacement: 'outside',
      color: 'rgb(26, 171, 152)',
      fillOpacity: '1',
      dataPoints: compoundVals.dataPoints
    }]
  };

  const retireOptions = {
    theme: props.darkMode ? 'dark2' : 'light2',
    axisY: { valueFormatString: "'$'0" },
    toolTip: { content: 'Age {label}: ${y}' },
    backgroundColor: props.darkMode ? 'rgb(32, 84, 109)' : 'white',
    data: [{
      type: 'column',
      dataPoints: retireVals.dataPoints
    }]
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Content}>
        <div className={classes.SelectBar}>
          <span className={currMode === 'Compound' ? classes.ActiveBtn : classes.Btn}>
            <BlueBtn clicked={() => setCurrMode('Compound')}>Compound Interest Visualizer</BlueBtn></span>
          <span className={currMode === 'Retire' ? classes.ActiveBtn : classes.Btn}>
            <BlueBtn clicked={() => setCurrMode('Retire')}>Retirement Visualizer</BlueBtn></span>
          <span className={currMode === 'Tax' ? classes.ActiveBtn : classes.Btn}>
            <BlueBtn clicked={() => setCurrMode('Tax')}>Capital Gains Calculator</BlueBtn></span>
        </div>
        <Container show={currMode === 'Compound'} currMode="Compound" darkMode={props.darkMode}>
          <div className={props.darkMode ? `${classes.Inputs} ${classes.DarkInputs}` : classes.Inputs}>
            <div className={classes.InputRow}>
              <div className={classes.InputField}>
                <p>Principal Investment</p>
                <NumInput val={compoundVals.principal} change={val => setCompoundVals({ ...compoundVals, principal: val })} dark={props.darkMode} />
              </div>
              <div className={classes.InputField}>
                <p>Monthly Contribution</p>
                <NumInput val={compoundVals.contrib} change={val => setCompoundVals({ ...compoundVals, contrib: val })} dark={props.darkMode} />
              </div>
              </div>
            <div className={classes.InputRow}>
              <div className={classes.InputField}>
                <p>Years Compounded</p>
                <NumInput val={compoundVals.years} change={val => setCompoundVals({ ...compoundVals, years: val })} dark={props.darkMode} />
              </div>
              <div className={classes.InputField}>
                <p>Yearly return in %</p>
                <NumInput val={compoundVals.interest} change={val => setCompoundVals({ ...compoundVals, interest: val })} dark={props.darkMode} />
              </div>
            </div>
          </div>
        </Container>
        <Container show={currMode === 'Retire'} currMode="Retire" darkMode={props.darkMode}>
          <div className={props.darkMode ? `${classes.Inputs} ${classes.DarkInputs}` : classes.Inputs}>
            <div className={classes.InputRow2}>
              <div className={classes.InputField}>
                <p>Retirement Goal</p>
                <NumInput val={retireVals.goal} change={val => setRetireVals({ ...retireVals, goal: val })} dark={props.darkMode} />
              </div>
              <div className={classes.InputField}>
                <p>Yearly return in %</p>
                <NumInput val={retireVals.interest} change={val => setRetireVals({ ...retireVals, interest: val })} dark={props.darkMode} />
              </div>
              <div className={classes.InputField}>
                <p>Retirement Age</p>
                <NumInput val={retireVals.age} change={val => setRetireVals({ ...retireVals, age: Math.floor(val) })} dark={props.darkMode} />
              </div>
            </div>
          </div>
        </Container>
        <div className={currMode !== 'Tax' ? classes.Btns : classes.Hide}>
          <BlueBtn clicked={calcHandler}>Calculate</BlueBtn>
          <BlueBtn clicked={resetHandler}>Reset</BlueBtn>
        </div>
        {(compoundVals.showChart && currMode === 'Compound') &&
          <div className={props.darkMode ? `${classes.Chart} ${classes.DarkChart}` : classes.Chart}>
            <h1 className={classes.Title}>${formatNum(compoundVals.finalVal)}</h1>
            <Chart options={compoundOptions} darkMode={props.darkMode} />
          </div>}
        {(retireVals.showChart && currMode === 'Retire') &&
          <div className={props.darkMode ? `${classes.Chart} ${classes.DarkChart}` : classes.Chart}>
            <h2 className={classes.Title2}>Monthly savings to reach goal by age {retireVals.shownAge}</h2>
            <Chart options={retireOptions} darkMode={props.darkMode} />
            <p className={classes.SubTitle}>Starting age</p>
          </div>}
        <TaxCalculator show={currMode === 'Tax'} darkMode={props.darkMode} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  darkMode: state.theme.darkMode
});

export default connect(mapStateToProps)(PlanPage);
