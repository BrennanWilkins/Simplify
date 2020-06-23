import React from 'react';
import classes from './StockUI.module.css';

const stockUI = (props) => {
  let rows = [];
  for (let key in props.stocks) {
    let row = (
      <React.Fragment key={key}>
        <div style={{padding: '10px'}}><strong>{key}</strong></div>
        <div>{Number(props.stocks[key].shares).toFixed(3)}</div>
        <div>${Number(props.stocks[key].shares * props.stocks[key].price).toFixed(2)}</div>
        <div>${Number(props.stocks[key].price).toFixed(2)}</div>
        <div>
          <button className={classes.btnAdd} onClick={() => props.changeStock('buy', key)}>+</button>
          <button onClick={() => props.changeStock('sell', key)}>-</button>
        </div>
      </React.Fragment>
    );
    rows.push(row);
  }
  return (
    <div className={classes.container}>
      <h2>${props.totalValue.toFixed(2)}</h2>
      <div className={classes.gridDiv}>
        <div></div>
        <div style={{padding: '10px'}}><strong>Shares</strong></div>
        <div style={{padding: '10px'}}><strong>Value</strong></div>
        <div style={{padding: '10px'}}><strong>Price</strong></div>
        <div></div>
        {rows}
      </div>
    </div>
  );
};

export default stockUI;
