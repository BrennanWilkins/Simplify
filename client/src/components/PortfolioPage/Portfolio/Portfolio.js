import React, { useState, useEffect, useRef } from 'react';
import classes from './Portfolio.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchPanel from '../SearchPanel/SearchPanel';
import BuySellPanel from '../BuySellPanel/BuySellPanel';
import { settingsIcon, plusIcon, trashIcon, analysisIcon } from '../../UI/UIIcons';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import AssetPanel from '../AssetPanel/AssetPanel';
import NetWorthChart from '../NetWorthChart/NetWorthChart';
import InvestmentTable from '../InvestmentTable/InvestmentTable';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import Highlights from '../Highlights/Highlights';
import NewsPanel from '../NewsPanel/NewsPanel';
import AnalysisPanel from '../AnalysisPanel/AnalysisPanel';
import PriceChartPanel from '../PriceChartPanel/PriceChartPanel';
import Breakdown from '../Breakdown/Breakdown';

const Portfolio = props => {
  const [showStockSearch, setShowStockSearch] = useState(false);
  const [showCryptoSearch, setShowCryptoSearch] = useState(false);
  const [showBuyStock, setShowBuyStock] = useState(false);
  const [showSellStock, setShowSellStock] = useState(false);
  const [showBuyCrypto, setShowBuyCrypto] = useState(false);
  const [showSellCrypto, setShowSellCrypto] = useState(false);
  const [showStockSettings, setShowStockSettings] = useState(false);
  const [showCryptoSettings, setShowCryptoSettings] = useState(false);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [showRemoveAsset, setShowRemoveAsset] = useState(false);
  const [showAddDebt, setShowAddDebt] = useState(false);
  const [showRemoveDebt, setShowRemoveDebt] = useState(false);
  const [showAssetSettings, setShowAssetSettings] = useState(false);
  const [showDebtSettings, setShowDebtSettings] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showStockPriceChart, setShowStockPriceChart] = useState(false);
  const [showCryptoPriceChart, setShowCryptoPriceChart] = useState(false);
  const [stockPriceChartSymbol, setStockPriceChartSymbol] = useState('');
  const [cryptoPriceChartSymbol, setCryptoPriceChartSymbol] = useState('');
  const stockRef = useRef();
  const cryptoRef = useRef();
  const assetRef = useRef();
  const debtRef = useRef();
  const btnRef = useRef();

  useEffect(() => {
    switch(props.location.search) {
      case '?pos=stocks': return stockRef.current.scrollIntoView();
      case '?pos=cryptos': return cryptoRef.current.scrollIntoView();
      case '?pos=assets': return assetRef.current.scrollIntoView();
      default: return;
    }
  }, [props.location.search]);

  const showBuySellHandler = mode => {
    if ((mode === 'BuyStock' || mode === 'SellStock') && props.stocks.length === 0) {
      return setShowStockSearch(true);
    }
    if ((mode === 'BuyCrypto' || mode === 'SellCrypto') && props.cryptos.length === 0) {
      return setShowCryptoSearch(true);
    }
    mode === 'BuyStock' ? setShowBuyStock(true) :
    mode === 'SellStock' ? setShowSellStock(true) :
    mode === 'BuyCrypto' ? setShowBuyCrypto(true) :
    setShowSellCrypto(true);
  };

  const showChartHandler = (symbol, mode) => {
    if (mode === 'Stock') {
      setStockPriceChartSymbol(symbol);
      setShowStockPriceChart(true);
    } else {
      setCryptoPriceChartSymbol(symbol);
      setShowCryptoPriceChart(true);
    }
  };

  let isSmall = btnRef.current && btnRef.current.getBoundingClientRect().width < 445;
  return (
    <div className={classes.Container}>
      <div className={classes.Content}>
        <div className={classes.ChartContainer}>
          <NetWorthChart />
          <Highlights openNews={() => setShowNews(true)}/>
        </div>
        <NewsPanel show={showNews} close={() => setShowNews(false)} />
        <div className={classes.Investments}>
          <div className={classes.Stocks} ref={stockRef}>
            <PriceChartPanel show={showStockPriceChart} close={() => setShowStockPriceChart(false)}
            mode="Stock" symbol={stockPriceChartSymbol} changeStock={symbol => setStockPriceChartSymbol(symbol)} />
            <h1>Stocks</h1>
            <div className={classes.Btns} ref={btnRef}>
              <div className={classes.AddBtn}>
                <BlueBtn big clicked={() => setShowStockSearch(true)}>{plusIcon}Add a new holding</BlueBtn>
              </div>
              <GreenBtn big clicked={() => showBuySellHandler('BuyStock')}>Buy</GreenBtn>
              <BuySellPanel mode="BuyStock" show={showBuyStock} close={() => setShowBuyStock(false)}
              down={stockRef.current && stockRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <GreenBtn big clicked={() => showBuySellHandler('SellStock')}>Sell</GreenBtn>
              <BuySellPanel mode="SellStock" show={showSellStock} close={() => setShowSellStock(false)}
              down={stockRef.current && stockRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <div className={classes.AnalysisBtn}>
                <BlueBtn big clicked={() => setShowAnalysis(true)}>{analysisIcon}Analysis</BlueBtn>
              </div>
              <button className={classes.SettingsBtn} onClick={() => setShowStockSettings(true)}>{settingsIcon}</button>
              <SettingsPanel mode="Stock" show={showStockSettings} close={() => setShowStockSettings(false)}
              down={stockRef.current && stockRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <SearchPanel mode="Stock" show={showStockSearch} close={() => setShowStockSearch(false)}
              down={stockRef.current && stockRef.current.getBoundingClientRect().top < 250} small={isSmall} />
            </div>
            <div className={`${classes.AnalysisBtn} ${classes.AnalysisBtnSmall}`}>
              <BlueBtn big clicked={() => setShowAnalysis(true)}>{analysisIcon}Analysis</BlueBtn>
            </div>
            <AnalysisPanel show={showAnalysis} close={() => setShowAnalysis(false)} />
            <InvestmentTable mode="Stocks" normal showChart={showChartHandler} />
          </div>
          <div className={classes.Cryptos} ref={cryptoRef}>
            <PriceChartPanel show={showCryptoPriceChart} close={() => setShowCryptoPriceChart(false)}
            mode="Crypto" symbol={cryptoPriceChartSymbol} changeCrypto={symbol => setCryptoPriceChartSymbol(symbol)} />
            <h1>Cryptocurrencies</h1>
            <div className={classes.Btns}>
              <div className={classes.AddBtn}>
                <BlueBtn big clicked={() => setShowCryptoSearch(true)}>{plusIcon}Add a new holding</BlueBtn>
              </div>
              <GreenBtn big clicked={() => showBuySellHandler('BuyCrypto')}>Buy</GreenBtn>
              <BuySellPanel mode="BuyCrypto" show={showBuyCrypto} close={() => setShowBuyCrypto(false)}
              down={cryptoRef.current && cryptoRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <GreenBtn big clicked={() => showBuySellHandler('SellCrypto')}>Sell</GreenBtn>
              <BuySellPanel mode="SellCrypto" show={showSellCrypto} close={() => setShowSellCrypto(false)}
              down={cryptoRef.current && cryptoRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <button className={classes.SettingsBtn} onClick={() => setShowCryptoSettings(true)}>{settingsIcon}</button>
              <SettingsPanel mode="Crypto" show={showCryptoSettings} close={() => setShowCryptoSettings(false)}
              down={cryptoRef.current && cryptoRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <SearchPanel mode="Crypto" show={showCryptoSearch} close={() => setShowCryptoSearch(false)}
              down={cryptoRef.current && cryptoRef.current.getBoundingClientRect().top < 250} small={isSmall} />
            </div>
            <InvestmentTable mode="Cryptos" normal showChart={showChartHandler} />
          </div>
        </div>
        <div className={classes.Investments}>
          <div className={classes.Stocks} ref={assetRef}>
            <h1>Assets</h1>
            <div className={classes.Btns}>
              <div className={classes.AddBtn}>
                <BlueBtn big clicked={() => setShowAddAsset(true)}>{plusIcon}Add a new asset</BlueBtn>
              </div>
              <AssetPanel mode="AddAsset" close={() => setShowAddAsset(false)} show={showAddAsset}
              down={assetRef.current && assetRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <div className={classes.RemoveBtn}>
                <BlueBtn big clicked={() => setShowRemoveAsset(true)}>{trashIcon}Remove an asset</BlueBtn>
              </div>
              <AssetPanel mode="RemoveAsset" close={() => setShowRemoveAsset(false)} show={showRemoveAsset}
              down={assetRef.current && assetRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <button className={classes.SettingsBtn} onClick={() => setShowAssetSettings(true)}>{settingsIcon}</button>
              <AssetPanel mode="SettingsAsset" close={() => setShowAssetSettings(false)} show={showAssetSettings}
              down={assetRef.current && assetRef.current.getBoundingClientRect().top < 310} small={isSmall} />
            </div>
            <InvestmentTable mode="Assets" normal />
          </div>
          <div className={classes.Cryptos} ref={debtRef}>
            <h1>Liabilities</h1>
            <div className={classes.Btns}>
              <div className={classes.AddBtn}>
                <BlueBtn big clicked={() => setShowAddDebt(true)}>{plusIcon}Add a new liability</BlueBtn>
              </div>
              <AssetPanel mode="AddDebt" close={() => setShowAddDebt(false)} show={showAddDebt}
              down={debtRef.current && debtRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <div className={classes.RemoveBtn}>
                <BlueBtn big clicked={() => setShowRemoveDebt(true)}>{trashIcon}Remove a liability</BlueBtn>
              </div>
              <AssetPanel mode="RemoveDebt" close={() => setShowRemoveDebt(false)} show={showRemoveDebt}
              down={debtRef.current && debtRef.current.getBoundingClientRect().top < 310} small={isSmall} />
              <button className={classes.SettingsBtn} onClick={() => setShowDebtSettings(true)}>{settingsIcon}</button>
              <AssetPanel mode="SettingsDebt" close={() => setShowDebtSettings(false)} show={showDebtSettings}
              down={debtRef.current && debtRef.current.getBoundingClientRect().top < 310} small={isSmall} />
            </div>
            <InvestmentTable mode="Debts" normal />
          </div>
        </div>
        <Breakdown />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos
});

export default connect(mapStateToProps)(withRouter(Portfolio));
