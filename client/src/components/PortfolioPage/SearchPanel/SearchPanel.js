import React, { useState, useEffect, useRef } from 'react';
import classes from './SearchPanel.module.css';
import { instance as axios } from '../../../axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { calcNetWorth } from '../../../utils/valueCalcs';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import BackBtn from '../../UI/Btns/BackBtn/BackBtn';
import Spinner from '../../UI/Spinner/Spinner';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import { NumInput, Input } from '../../UI/Inputs/Inputs';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';

const SearchPanel = props => {
  const [query, setQuery] = useState('');
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
  const [searchErr, setSearchErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState();
  const inputRef = useRef();
  const sharesRef = useRef();
  const isStock = props.mode === 'Stock';

  useEffect(() => {
    if (props.show) { inputRef.current.focus(); }
  }, [props.show]);

  const setSearchQuery = val => {
    // searches for stock/crypto 600ms after user stops typing
    setSearchErr(false);
    setQuery(val);
    clearTimeout(typingTimeout);
    isStock ?
    setTypingTimeout(setTimeout(() => searchStock(val), 600)) :
    setTypingTimeout(setTimeout(() => searchCrypto(val), 600));
  };

  const errHandler = () => {
    setLoading(false);
    setSearchErr(true);
    setSearchRes([]);
  };

  const searchStock = stock => {
    if (stock === '') { return setSearchRes([]); }
    setLoading(true);
    axios.get('portfolio/searchStock/' + stock).then(res => {
      setSearchRes(res.data.result);
      setLoading(false);
    }).catch(err => { errHandler(); });
  };

  const searchCrypto = crypto => {
    if (crypto === '') { return setSearchRes([]); }
    setLoading(true);
    axios.get('portfolio/searchCrypto/' + crypto).then(res => {
      setSearchRes(res.data.result);
      setLoading(false);
    }).catch(err => { errHandler(); });
  };

  const closeHandler = () => {
    props.close();
    setQuery('');
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
    setSearchErr(false);
  };

  const selectedHandler = stock => {
    setShowInput(true);
    setSelectedRes(stock);
    isStock ? setSelectedTicker(stock.ticker) : setSelectedTicker(stock.item.symbol);
    setTimeout(() => sharesRef.current.focus(), 400);
  };

  const addHandler = async manual => {
    if (inputValShares === 0 || inputValShares === '') { return; }
    if (manual && (inputValName === '' || inputValTicker === '' || inputValPrice === '')) { return; }
    // identifier is Manual if stock/crypto added manually, else is Normal
    const data = { name: '', symbol: '', price: 0, quantity: '', value: 0, identifier: '' };
    data.name = manual ? inputValName : isStock ? selectedRes.name : selectedRes.item.name;
    data.symbol = manual ? inputValTicker.toUpperCase() : isStock ? selectedRes.ticker : selectedRes.item.symbol;
    data.price = manual ? Number(inputValPrice).toFixed(2) : isStock ? (selectedRes.price).toFixed(2) : (selectedRes.item.price).toFixed(2);
    data.quantity = inputValShares;
    data.value = (data.quantity * data.price).toFixed(2);
    data.identifier = manual ? 'Manual' : 'Normal';
    // check if user has the stock/crypto already in portfolio
    const curr = isStock ? [...props.stocks] : [...props.cryptos];
    // check if stock/cypto already in portfolio
    const check = curr.filter(inv => inv.symbol === data.symbol || (inv.name === data.name && manual));
    if (check.length) { setErr(true); return setErrMsg(`You already have ${data.symbol} in your portfolio.`); }
    // add stock/crypto to portfolio
    curr.unshift({ ...data });
    const updatedPortfolio = { ...props.portfolio };
    if (isStock) { updatedPortfolio.stocks = curr; }
    else { updatedPortfolio.cryptos = curr; }
    const updatedNetWorth = calcNetWorth(props.netWorthData, updatedPortfolio);
    if (props.isDemo) {
      props.setNetWorthData(updatedNetWorth);
      isStock ? props.addStock(data) : props.addCrypto(data);
      props.addNotif(`${data.symbol} added to portfolio`);
      // update todays highlights data
      props.setUpdateHighlights();
      return closeHandler();
    }
    try {
      isStock ? await axios.put('portfolio/updateStocks', { data }) :
      await axios.put('portfolio/updateCryptos', { data });
      const resp = await axios.put('netWorth', { netWorthData: updatedNetWorth });
      props.setNetWorthData(resp.data.result.dataPoints);
      isStock ? props.addStock(data) : props.addCrypto(data);
      props.addNotif(`${data.symbol} added to portfolio`);
      // update todays highlights data
      props.setUpdateHighlights();
      closeHandler();
    } catch(e) { setErr(true); return setErrMsg('Error connecting to the server.'); }
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={isStock ?
        (props.show ? classes.StockPanel : classes.StockPanelHide) :
        (props.show ? classes.CryptoPanel : classes.CryptoPanelHide)}>
        <div className={classes.BtnDiv}>
          <CloseBtn close={closeHandler} />
          <BackBtn back={resetInputsHandler} mode={!showInput && !showManual ? 'Hide' : 'Show'} />
        </div>
        <p className={classes.Text}>
          {isStock ?
          'Search for a stock by entering its ticker or the company name' :
          'Search for a cryptocurrency by entering its symbol or name'}
        </p>
        <div className={classes.SearchInput}>
          <Input val={query} change={setSearchQuery} ref={inputRef} ph={isStock ? 'AAPL, Apple, ...' : 'BTC, Bitcoin, ...'} />
        </div>
        {loading && <Spinner mode="Search" />}
        <div className={classes.Results}>
          {searchRes.map((stock, i) => (
            <div className={classes.Result} key={i} onClick={() => selectedHandler(stock)}>
              <div className={classes.SearchSymbol}>{isStock ? stock.ticker: stock.item.symbol}</div>
              <div className={classes.SearchName}>{isStock ? stock.name : stock.item.name}</div>
            </div>
          ))}
          <div className={classes.BtnDiv2}>
            <BlueBtn clicked={() => setShowManual(true)}>
              {`${isStock ? 'Stock' : 'Crypto'} not found? Add it manually`}
            </BlueBtn>
          </div>
        </div>
        <div className={searchErr ? classes.ShowErr : classes.HideErr}>There was an error connecting to the server.</div>
        <div className={showInput ? classes.ShowInput : classes.HideInput}>
          <p className={classes.InputText}>
            {isStock ?
            `How many shares of ${selectedTicker} do you own?` :
            `How much ${selectedTicker} do you own?`}
          </p>
          <div className={classes.AddInput}>
            <NumInput val={inputValShares} change={val => setInputValShares(val)} ref={sharesRef} />
          </div>
          <BlueBtn clicked={() => addHandler(false)}>Add</BlueBtn>
          <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
        </div>
        <div className={showManual ? classes.ShowInput: classes.HideInput}>
          <div>
            <p>{isStock ? 'Ticker:' : 'Symbol:'}</p>
            <Input ph={isStock ? 'eg AAPL' : 'eg BTC'} val={inputValTicker} change={val => { setInputValTicker(val); setErr(false); }} />
          </div>
          <div>
            <p>{isStock ? 'Company name:' : 'Name:'}</p>
            <Input ph={isStock ? 'eg Apple' : 'eg Bitcoin'} val={inputValName} change={val => { setInputValName(val); setErr(false); }} />
          </div>
          <div>
            <p>Current price:</p>
            <NumInput val={inputValPrice} change={val => { setInputValPrice(val); setErr(false); }} />
          </div>
          <div>
            <p>{isStock ? 'Number of shares:' : 'Quantity:'}</p>
            <NumInput val={inputValShares} change={val => { setInputValShares(val); setErr(false); }} />
          </div>
          <BlueBtn clicked={() => addHandler(true)}>Add</BlueBtn>
          <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
        </div>
      </div>
    </PanelContainer>
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
  addStock: stock => dispatch(actions.addStock(stock)),
  addCrypto: crypto => dispatch(actions.addCrypto(crypto)),
  setNetWorthData: data => dispatch(actions.setNetWorthData(data)),
  addNotif: msg => dispatch(actions.addNotif(msg)),
  setUpdateHighlights: () => dispatch(actions.setUpdateHighlights(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
