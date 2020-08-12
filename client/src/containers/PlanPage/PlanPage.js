import React, { useState } from 'react';
import classes from './PlanPage.module.css';
import CanvasJSReact from '../../components/canvasjs/canvasjs.react';
import BlueBtn from '../../components/UI/BlueBtn/BlueBtn';
import { NumInput } from '../../components/UI/Inputs/Inputs';
import { calcCapGains, calcRetire, calcCompound } from '../../utils/planPageCalcs';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
  const [taxVals, setTaxVals] = useState({
    stocks: [],
    income: '',
    filingStatus: 'Single',
    purchasePrice: '',
    salePrice: '',
    held: 'More',
    results: { shortRate: 0, longRate: 0, shortTax: 0, longTax: 0, shortProfit: 0,
      longProfit: 0, totEffectiveRate: 0, shortEffective: 0, longEffective: 0, totalTax: 0 },
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
    } else if (currMode === 'Retire') {
      setRetireVals({
        goal: '',
        interest: '',
        age: '',
        shownAge: '',
        dataPoints: [],
        showChart: false
      });
    } else {
      setTaxVals({
        stocks: [],
        income: '',
        filingStatus: 'Single',
        purchasePrice: '',
        salePrice: '',
        held: 'More',
        results: { shortRate: 0, longRate: 0, shortTax: 0, longTax: 0, shortProfit: 0,
          longProfit: 0, totEffectiveRate: 0, shortEffective: 0, longEffective: 0, totalTax: 0 },
        showChart: false
      });
    }
  };

  const calcIsValid = () => {
    // validate input fields
    if (currMode === 'Compound') {
      if (compoundVals.years === '0' || compoundVals.interest === '0' || compoundVals.years === ''
      || compoundVals.interest === '' || compoundVals.principal === '' || compoundVals.contrib === '') { return false; }
    } else if (currMode === 'Retire') {
      if (retireVals.goal === '' || retireVals.goal === '0' || retireVals.interest === '' ||
      retireVals.interest === '0' || retireVals.age === '' || retireVals.age < 25) { return false; }
    } else {
      if (taxVals.income === '' || taxVals.stocks.length === 0) { return false; }
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

  const capitalGainsHandler = () => {
    setTaxVals({ ...taxVals, results: calcCapGains(taxVals), showChart: true });
  };

  const addStockHandler = () => {
    // check for invalid input fields
    if (taxVals.purchasePrice === '0' || taxVals.purchasePrice === '' ||
    taxVals.salePrice === '') { return; }
    setTaxVals(prev => ({
      ...prev,
      stocks: prev.stocks.concat([{ purchasePrice: prev.purchasePrice, salePrice: prev.salePrice, held: prev.held }]),
      purchasePrice: '',
      salePrice: ''
    }));
  };

  const calcHandler = () => {
    // if invalid input fields return
    if (!calcIsValid()) { return; }
    if (currMode === 'Compound') { compoundHandler(); }
    else if (currMode === 'Retire') { retireHandler(); }
    else { capitalGainsHandler(); }
  };

  const compoundOptions = {
    animationEnabled: true,
    theme: 'light1',
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
      dataPoints: compoundVals.dataPoints
    }]
  };

  const retireOptions = {
    animationEnabled: true,
    theme: 'light2',
    exportEnabled: false,
    axisY: { valueFormatString: "'$'0" },
    toolTip: { content: 'Age {label}: ${y}' },
    data: [{
      type: 'column',
      dataPoints: retireVals.dataPoints
    }]
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Content}>
        <div className={classes.SelectBar}>
          <button onClick={() => setCurrMode('Compound')} className={currMode === 'Compound' ? classes.ActiveBtn : classes.Btn}>Compount Interest Visualizer</button>
          <button onClick={() => setCurrMode('Retire')} className={currMode === 'Retire' ? classes.ActiveBtn : classes.Btn}>Retirement Visualizer</button>
          <button onClick={() => setCurrMode('Tax')} className={currMode === 'Tax' ? classes.ActiveBtn : classes.Btn}>Capital Gains Calculator</button>
        </div>
        <div className={currMode === 'Compound' ? undefined : classes.Hide}>
          <h1 className={classes.Title}>Compound Interest Visualizer</h1>
          <div className={classes.Inputs}>
            <div className={classes.InputRow}>
              <div className={classes.InputField}>
                <p>Principal Investment</p>
                <NumInput val={compoundVals.principal} change={val => setCompoundVals({ ...compoundVals, principal: val })} />
              </div>
              <div className={classes.InputField}>
                <p>Monthly Contribution</p>
                <NumInput val={compoundVals.contrib} change={val => setCompoundVals({ ...compoundVals, contrib: val })} />
              </div>
              </div>
            <div className={classes.InputRow}>
              <div className={classes.InputField}>
                <p>Years Compounded</p>
                <NumInput val={compoundVals.years} change={val => setCompoundVals({ ...compoundVals, years: val })} />
              </div>
              <div className={classes.InputField}>
                <p>Yearly return in %</p>
                <NumInput val={compoundVals.interest} change={val => setCompoundVals({ ...compoundVals, interest: val })} />
              </div>
            </div>
          </div>
        </div>
        <div className={currMode === 'Retire' ? undefined : classes.Hide}>
          <h1 className={classes.Title}>Retirement Goal Visualizer</h1>
          <div className={classes.Inputs}>
            <div className={classes.InputRow2}>
              <div className={classes.InputField}>
                <p>Retirement Goal</p>
                <NumInput val={retireVals.goal} change={val => setRetireVals({ ...retireVals, goal: val })} />
              </div>
              <div className={classes.InputField}>
                <p>Yearly return in %</p>
                <NumInput val={retireVals.interest} change={val => setRetireVals({ ...retireVals, interest: val })} />
              </div>
              <div className={classes.InputField}>
                <p>Retirement Age</p>
                <NumInput val={retireVals.age} change={val => setRetireVals({ ...retireVals, age: Math.floor(val) })} />
              </div>
            </div>
          </div>
        </div>
        <div className={currMode === 'Tax' ? undefined : classes.Hide}>
          <h1 className={classes.Title}>Capital Gains Tax Calculator</h1>
          <div className={classes.Inputs}>
            <div className={classes.TaxRow}>
              <div className={classes.TaxField}>
                <p>Annual Income</p>
                <NumInput val={taxVals.income} change={val => setTaxVals({ ...taxVals, income: val })} />
              </div>
              <div className={classes.TaxField}>
                <p>Filing Status</p>
                <select value={taxVals.filingStatus} onChange={e => setTaxVals({ ...taxVals, filingStatus: e.target.value })}>
                  <option value="Single">Single</option>
                  <option value="Jointly">Married filing jointly</option>
                  <option value="Separately">Married filing separately</option>
                  <option value="Head">Head of household</option>
                </select>
              </div>
            </div>
            <div className={classes.TaxRow}>
              <div className={classes.TaxField}>
                <p>Purchase price</p>
                <NumInput val={taxVals.purchasePrice} change={val => setTaxVals({ ...taxVals, purchasePrice: val })} />
              </div>
              <div className={classes.TaxField}>
                <p>Sale price</p>
                <NumInput val={taxVals.salePrice} change={val => setTaxVals({ ...taxVals, salePrice: val })} />
              </div>
              <div className={classes.TaxField}>
                <p>Length of ownership</p>
                <select value={taxVals.held} onChange={e => setTaxVals({ ...taxVals, held: e.target.value })}>
                  <option value="More">More than a year</option>
                  <option value="Less">Less than a year</option>
                </select>
              </div>
              <div className={classes.TaxField}>
                <BlueBtn clicked={addStockHandler}>Add</BlueBtn>
              </div>
            </div>
          </div>
          <h3 className={classes.TaxStocksTitle}>Transactions</h3>
          <div className={classes.TaxStocks}>
            <div className={classes.TaxStocksHeader}>
              <span style={{ width: '18%' }}>Stock</span>
              <span style={{ width: '25%' }}>Purchase price</span>
              <span style={{ width: '25%' }}>Sale price</span>
              <span style={{ width: '32%' }}>Length of ownership</span>
            </div>
            {taxVals.stocks.map((stock, i) => (
              <div key={i} className={classes.TaxStocksField}>
                <span style={{ width: '18%' }}>Stock {i + 1}</span>
                <span style={{ width: '25%' }}>${Number(stock.purchasePrice).toFixed(2)}</span>
                <span style={{ width: '25%' }}>${Number(stock.salePrice).toFixed(2)}</span>
                <span style={{ width: '32%' }}>{stock.held === 'More' ? 'More than a year' : 'Less than a year'}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.Btns}>
          <BlueBtn clicked={calcHandler}>Calculate</BlueBtn>
          <BlueBtn clicked={resetHandler}>Reset</BlueBtn>
        </div>
        <div className={compoundVals.showChart && currMode === 'Compound' ? classes.Chart : classes.HideChart}>
          <h1 className={classes.Title2}>
            ${Number(Number(compoundVals.finalVal).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <CanvasJSChart options={compoundOptions} />
          <div className={classes.Block}></div>
        </div>
        <div className={retireVals.showChart && currMode === 'Retire' ? classes.Chart : classes.HideChart}>
          <h2 className={classes.Title3}>Monthly savings to reach goal by age {retireVals.shownAge}</h2>
          <CanvasJSChart options={retireOptions} />
          <div className={classes.Block}></div>
          <p className={classes.SubTitle}>Starting age</p>
        </div>
        <div className={taxVals.showChart && currMode === 'Tax' ? classes.TaxChart: classes.HideChart}>
          <p>Estimated capital gains tax based on the Tax Cuts and Jobs Act and 2020 federal income tax brackets</p>
          <div>
            <p>Short term capital gains marginal rate: {taxVals.results.shortRate}%</p>
            <p>Short term capital gains effective rate: {taxVals.results.shortEffective}%</p>
            <p>Total short term capital gains: ${taxVals.results.shortProfit}</p>
            <p>Long term capital gains marginal rate: {taxVals.results.longRate}%</p>
            <p>Long term capital gains effective rate: {taxVals.results.longEffective}%</p>
            <p>Total long term capital gains: ${taxVals.results.longProfit}</p>
            <p>Total short term capital gains taxes: ${taxVals.results.shortTax}</p>
            <p>Total long term capital gains taxes: ${taxVals.results.longTax}</p>
            <p>Total effective capital gains rate: {taxVals.results.totEffectiveRate}%</p>
            <p>Total capital gains taxes: ${taxVals.results.totalTax}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
