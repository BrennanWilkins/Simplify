import React, { useState } from 'react';
import classes from './TaxCalculator.module.css';
import { calcCapGains } from '../../../utils/planPageCalcs';
import { NumInput } from '../../UI/Inputs/Inputs';
import Container from '../PlanPageContainer/PlanPageContainer';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import { plusIcon } from '../../UI/UIIcons';

const TaxCalculator = props => {
  const [taxVals, setTaxVals] = useState({
    stocks: [],
    income: '',
    filingStatus: 'Single',
    purchasePrice: '',
    salePrice: '',
    held: 'More',
    results: { shortRate: 0, longRate: 0, shortTax: 0, longTax: 0, shortProfit: 0,
      longProfit: 0, totEffectiveRate: 0, shortEffective: 0, longEffective: 0, totalTax: 0, totalProfit: 0 },
    showChart: false
  });

  const resetHandler = () => {
    setTaxVals({
      stocks: [],
      income: '',
      filingStatus: 'Single',
      purchasePrice: '',
      salePrice: '',
      held: 'More',
      results: { shortRate: 0, longRate: 0, shortTax: 0, longTax: 0, shortProfit: 0,
        longProfit: 0, totEffectiveRate: 0, shortEffective: 0, longEffective: 0, totalTax: 0, totalProfit: 0 },
      showChart: false
    });
  };

  const addStockHandler = () => {
    // check for invalid input fields
    if (taxVals.purchasePrice === '0' || taxVals.purchasePrice === '' ||
    taxVals.salePrice === '') { return; }
    // concat the input fields to stock array
    setTaxVals(prev => ({
      ...prev,
      stocks: prev.stocks.concat([{ purchasePrice: prev.purchasePrice, salePrice: prev.salePrice, held: prev.held }]),
      purchasePrice: '',
      salePrice: ''
    }));
  };

  const calcHandler = () => {
    // if invalid inputs then return
    if (taxVals.income === '' || taxVals.stocks.length === 0) { return; }
    // uses calcCapGains helper function to get values
    setTaxVals({ ...taxVals, results: calcCapGains(taxVals), showChart: true });
  };

  return (
    <Container show={props.show} currMode="Tax" darkMode={props.darkMode}>
      <div className={props.darkMode ? `${classes.Boxes} ${classes.DarkBoxes}` : classes.Boxes}>
        <div className={classes.InputBox}>
          <div className={classes.Row}>
            <div className={classes.Field}>
              <p>Annual Income</p>
              <NumInput val={taxVals.income} change={val => setTaxVals({ ...taxVals, income: val })} dark={props.darkMode} />
            </div>
            <div className={classes.Field}>
              <p>Filing Status</p>
              <select value={taxVals.filingStatus} onChange={e => setTaxVals({ ...taxVals, filingStatus: e.target.value })}>
                <option value="Single">Single</option>
                <option value="Jointly">Married filing jointly</option>
                <option value="Separately">Married filing separately</option>
                <option value="Head">Head of household</option>
              </select>
            </div>
          </div>
          <h3>Add a transaction</h3>
          <div className={classes.Row}>
            <div className={classes.Field}>
              <p>Purchase price</p>
              <NumInput val={taxVals.purchasePrice} change={val => setTaxVals({ ...taxVals, purchasePrice: val })} dark={props.darkMode} />
            </div>
            <div className={classes.Field}>
              <p>Sale price</p>
              <NumInput val={taxVals.salePrice} change={val => setTaxVals({ ...taxVals, salePrice: val })} dark={props.darkMode} />
            </div>
          </div>
          <div className={classes.Row}>
            <div className={classes.Field}>
              <p>Length of ownership</p>
              <select value={taxVals.held} onChange={e => setTaxVals({ ...taxVals, held: e.target.value })}>
                <option value="More">More than a year</option>
                <option value="Less">Less than a year</option>
              </select>
            </div>
            <div className={classes.Field}>
              <span className={classes.AddBtn}>
                <BlueBtn clicked={addStockHandler}>{plusIcon}Add transaction</BlueBtn>
              </span>
            </div>
          </div>
          <div className={classes.Btns}>
            <div className={classes.CalcBtn}><BlueBtn clicked={calcHandler}>Calculate</BlueBtn></div>
            <div className={classes.ResetBtn}><BlueBtn clicked={resetHandler}>Reset</BlueBtn></div>
          </div>
        </div>
        <div className={classes.TransBox}>
          <h2>Transactions</h2>
          <div className={classes.Transactions}>
            <div className={classes.TransHeader}>
              <span style={{ width: '10%' }}></span>
              <span style={{ width: '25%' }}>Purchase price</span>
              <span style={{ width: '25%' }}>Sale price</span>
              <span style={{ width: '40%' }}>Length of ownership</span>
            </div>
            {taxVals.stocks.map((stock, i) => (
              <div key={i} className={classes.TransField}>
                <span style={{ width: '10%' }}>{i + 1}</span>
                <span style={{ width: '25%' }}>${Number(stock.purchasePrice).toFixed(2)}</span>
                <span style={{ width: '25%' }}>${Number(stock.salePrice).toFixed(2)}</span>
                <span style={{ width: '40%' }}>{stock.held === 'More' ? 'More than a year' : 'Less than a year'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <table className={classes.Table}>
        <thead>
          <tr>
            <th></th>
            <th>Marginal Tax Rate</th>
            <th>Effective Tax Rate</th>
            <th>Profit</th>
            <th>Tax Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Short Term Transactions</th>
            <td>{taxVals.results.shortRate}%</td>
            <td>{taxVals.results.shortEffective}%</td>
            <td>${taxVals.results.shortProfit}</td>
            <td>${taxVals.results.shortTax}</td>
          </tr>
          <tr>
            <th>Long Term Transactions</th>
            <td>{taxVals.results.longRate}%</td>
            <td>{taxVals.results.longEffective}%</td>
            <td>${taxVals.results.longProfit}</td>
            <td>${taxVals.results.longTax}</td>
          </tr>
          <tr className={classes.TableTotals}>
            <th>Total</th>
            <td></td>
            <td>{taxVals.results.totEffectiveRate}%</td>
            <td>${taxVals.results.totalProfit}</td>
            <td>${taxVals.results.totalTax}</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default TaxCalculator;
