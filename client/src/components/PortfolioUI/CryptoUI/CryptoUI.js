import React from 'react';
import classes from './CryptoUI.module.css';
import Icon from '../../CryptoSymbol/CryptoSymbol';
// import Spinner from '../../Spinner/Spinner';

const cryptoUI = (props) => {
  let rows = [];
  for (let key in props.cryptos) {
    let row = (
      <React.Fragment key={key}>
        <div><Icon symbol={key} altText={key}/></div>
        <div>{Number(props.cryptos[key].quantity).toFixed(3)}</div>
        <div>${Number(props.cryptos[key].quantity * props.cryptos[key].price).toFixed(2)}</div>
        <div>${Number(props.cryptos[key].price).toFixed(2)}</div>
        <div>
          <button className={classes.btnAdd} onClick={() => props.changeCoin('buy', key)}>+</button>
          <button onClick={() => props.changeCoin('sell', key)}>-</button>
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
        <div style={{padding: '10px'}}><strong>Quantity</strong></div>
        <div style={{padding: '10px'}}><strong>Value</strong></div>
        <div style={{padding: '10px'}}><strong>Price</strong></div>
        <div></div>
        {rows}
      </div>
    </div>
  );
};

export default cryptoUI;
