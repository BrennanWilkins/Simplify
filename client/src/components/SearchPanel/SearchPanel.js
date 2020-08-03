import React, { useState, useEffect, useRef } from 'react';
import classes from './SearchPanel.module.css';
import { instance as axios } from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { calcNetWorth } from '../../utils/valueCalcs';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import BackBtn from '../UI/BackBtn/BackBtn';
import Spinner from '../UI/Spinner/Spinner';
import BlueBtn from '../UI/BlueBtn/BlueBtn';

let typingTimeout;

const SearchPanel = props => {
  const [val, setVal] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [inputValName, setInputValName] = useState('');
  const [inputValTicker, setInputValTicker] = useState('');
  const [inputValShares, setInputValShares] = useState(0);
  const [inputValPrice, setInputValPrice] = useState(0);
  const [selectedRes, setSelectedRes] = useState(null);
  const [selectedTicker, setSelectedTicker] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const panelRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    if (props.show) { inputRef.current.focus(); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.mode, props.show]);

  useEffect(() => {
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClick = (e) => {
    // close panel if clicked outside
    if (panelRef.current.contains(e.target)) { return; }
    closeHandler();
  };

  const setSearchVal = (e) => {
    // searches for stock/crypto 600ms after user stops typing
    const value = e.target.value;
    setVal(value);
    clearTimeout(typingTimeout);
    typingTimeout = props.mode === 'Stock' ?
    setTimeout(() => searchStock(value), 600) :
    setTimeout(() => searchCrypto(value), 600);
  };

  const searchStock = (stock) => {
    if (stock === '') { return setSearchRes([]); }
    setLoading(true);
    axios.get('portfolio/searchStock/' + stock).then(res => {
      setSearchRes(res.data.result);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.log(err);
    });
  };

  const searchCrypto = (crypto) => {
    if (crypto === '') { return setSearchRes([]); }
    setLoading(true);
    axios.get('portfolio/searchCrypto/' + crypto).then(res => {
      setSearchRes(res.data.result);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  };

  const closeHandler = () => {
    props.close();
    setVal('');
    setSearchRes([]);
    resetInputsHandler();
  };

  const resetInputsHandler = () => {
    setShowInput(false);
    setShowManual(false);
    setInputValName('');
    setInputValShares(0);
    setInputValPrice(0);
    setInputValTicker('');
    setSelectedRes(null);
    setSelectedTicker('');
    setErr(false);
    setErrMsg('');
    setLoading(false);
  };

  const selectedHandler = (stock) => {
    setShowInput(true);
    setSelectedRes(stock);
    props.mode === 'Stock' ?
    setSelectedTicker(stock.ticker) :
    setSelectedTicker(stock.item.symbol);
  };

  const inputValPriceHandler = (e) => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = '0'; }
    setInputValPrice(val);
  };

  const inputValSharesHandler = (e) => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    setInputValShares(val);
  };

  const addHandler = async (manual) => {
    if (inputValShares === 0 || inputValShares === '') { return; }
    if (manual && (inputValName === '' || inputValTicker === '' || inputValPrice === '')) { return; }
    // identifier is Manual if stock/crypto added manually, else is Normal
    const data = manual ?
    {
      name: inputValName,
      symbol: inputValTicker.toUpperCase(),
      price: Number(inputValPrice).toFixed(2),
      quantity: inputValShares,
      value: (inputValPrice * inputValShares).toFixed(2),
      identifier: 'Manual'
    } :
    props.mode === 'Stock' ?
    {
      name: selectedRes.name,
      symbol: selectedRes.ticker,
      price: (selectedRes.price).toFixed(2),
      quantity: inputValShares,
      value: (inputValShares * selectedRes.price).toFixed(2),
      identifier: 'Normal'
    } :
    {
      name: selectedRes.item.name,
      symbol: selectedRes.item.symbol,
      price: (selectedRes.item.price).toFixed(2),
      quantity: inputValShares,
      value: (inputValShares * selectedRes.item.price).toFixed(2),
      identifier: 'Normal'
    };
    if (props.mode === 'Stock') {
      for (let stock of props.stocks) {
        if (stock.symbol === data.symbol) {
          setErr(true);
          return setErrMsg(`You already have ${stock.symbol} in your portfolio.`);
        }
      }
      const updatedStocks = [...props.stocks];
      updatedStocks.unshift({ ...data });
      const updatedPortfolio = { ...props.portfolio, stocks: updatedStocks };
      const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
      if (props.isDemo) {
        props.setNetWorthData(updatedNetWorth);
        props.addStock(data);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/updateStocks', { data });
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.addStock(data);
        closeHandler();
      } catch(e) {
        setErr(true);
        return setErrMsg('Error connecting to the server.');
      }
    } else {
      for (let crypto of props.cryptos) {
        if (crypto.symbol === data.symbol) {
          setErr(true);
          return setErrMsg(`You already have ${crypto.symbol} in your portfolio.`);
        }
      }
      const updatedCryptos = [...props.cryptos];
      updatedCryptos.unshift({ ...data });
      const updatedPortfolio = { ...props.portfolio, cryptos: updatedCryptos };
      const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
      if (props.isDemo) {
        props.setNetWorthData(updatedNetWorth);
        props.addCrypto(data);
        return closeHandler();
      }
      try {
        const res = await axios.put('portfolio/updateCryptos', { data });
        const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
        props.setNetWorthData(resp.data.result.dataPoints);
        props.addCrypto(data);
        closeHandler();
      } catch(e) {
        setErr(true);
        return setErrMsg('Error connecting to the server.');
      }
    }
  };

  return (
    <div ref={panelRef} className={props.mode === 'Stock' ?
      (props.show ? classes.StockPanel : classes.StockPanelHide) :
      (props.show ? classes.CryptoPanel : classes.CryptoPanelHide)}>
      <div className={classes.BtnDiv}>
        <CloseBtn close={closeHandler} />
        <BackBtn back={resetInputsHandler} mode={!showInput && !showManual ? 'Hide' : 'Show'} />
      </div>
      <p className={classes.Text}>
        {props.mode === 'Stock' ?
        'Search for a stock by entering its ticker or the company name' :
        'Search for a cryptocurrency by entering its symbol or name'}
      </p>
      <input className={classes.SearchInput}
        value={val} onChange={setSearchVal} ref={inputRef}
        placeholder={props.mode === 'Stock' ? 'AAPL, Apple, ...' : 'BTC, Bitcoin, ...'} />
      {loading && <Spinner mode="Search" />}
      <div className={classes.Results}>
        {searchRes.map((stock, i) => (
          <div className={classes.Result} key={i} onClick={() => selectedHandler(stock)}>
            <div className={classes.SearchSymbol}>{props.mode === 'Stock' ? stock.ticker: stock.item.symbol}</div>
            <div className={classes.SearchName}>{props.mode === 'Stock' ? stock.name : stock.item.name}</div>
          </div>
        ))}
        <div className={classes.BtnDiv2}>
          <BlueBtn clicked={() => setShowManual(true)}>
            {`${props.mode === 'Stock' ? 'Stock' : 'Crypto'} not found? Add it manually`}
          </BlueBtn>
        </div>
      </div>
      <div className={showInput ? classes.ShowInput : classes.HideInput}>
        <p className={classes.InputText}>
          {props.mode === 'Stock' ?
          `How many shares of ${selectedTicker} do you own?` :
          `How much ${selectedTicker} do you own?`}
        </p>
        <input value={inputValShares} onChange={inputValSharesHandler} />
        <BlueBtn clicked={() => addHandler(false)}>Add</BlueBtn>
        <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      </div>
      <div className={showManual ? classes.ShowInput: classes.HideInput}>
        <div>
          <p>{props.mode === 'Stock' ? 'Ticker:' : 'Symbol:'}</p>
          <input placeholder={props.mode === 'Stock' ? 'eg AAPL' : 'eg BTC'} value={inputValTicker}
          onChange={e => setInputValTicker(e.target.value)} />
        </div>
        <div>
          <p>{props.mode === 'Stock' ? 'Company name:' : 'Name:'}</p>
          <input placeholder={props.mode === 'Stock' ? 'eg Apple' : 'eg Bitcoin'} value={inputValName}
          onChange={e => setInputValName(e.target.value)} />
        </div>
        <div>
          <p>Current price:</p>
          <input value={inputValPrice} onChange={inputValPriceHandler} />
        </div>
        <div>
          <p>{props.mode === 'Stock' ? 'Number of shares:' : 'Quantity:'}</p>
          <input value={inputValShares} onChange={inputValSharesHandler} />
        </div>
        <BlueBtn clicked={() => addHandler(true)}>Add</BlueBtn>
        <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos,
  portfolio: state.portfolio,
  netWorthData: state.netWorth.netWorthData,
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  addStock: (stock) => dispatch(actions.addStock(stock)),
  addCrypto: (crypto) => dispatch(actions.addCrypto(crypto)),
  setNetWorthData: (data) => dispatch(actions.setNetWorthData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
