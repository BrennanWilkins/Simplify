import React from 'react';
import btc from '../../assets/btcIcon.png';
import ltc from '../../assets/ltcIcon.png';
import eth from '../../assets/ethIcon.png';
import classes from './CryptoSymbol.module.css';

const cryptoSymbol = (props) => {
  let symbol = null;
  switch(props.symbol) {
    case 'btc': symbol = btc; break;
    case 'ltc': symbol = ltc; break;
    case 'eth': symbol = eth; break;
    default: break;
  }
  return (
    <div className={classes.Symbol} >
      <img src={symbol} alt={props.altText}/>
    </div>
  );
};

export default cryptoSymbol;
