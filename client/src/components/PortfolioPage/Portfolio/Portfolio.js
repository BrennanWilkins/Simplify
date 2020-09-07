import React, { useState, useEffect, useRef } from 'react';
import classes from './Portfolio.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchPanel from '../SearchPanel/SearchPanel';
import BuySellPanel from '../BuySellPanel/BuySellPanel';
import { settingsIcon, plusIcon, trashIcon } from '../../UI/UIIcons';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import AssetPanel from '../AssetPanel/AssetPanel';
import NetWorthChart from '../NetWorthChart/NetWorthChart';
import InvestmentTable from '../InvestmentTable/InvestmentTable';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import Highlights from '../Highlights/Highlights';
import NewsPanel from '../NewsPanel/NewsPanel';

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
  const stockRef = useRef();
  const cryptoRef = useRef();
  const assetRef = useRef();

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
            <h1>Stocks</h1>
            <div className={classes.AddBtn}>
              <BlueBtn big clicked={() => setShowStockSearch(true)}><span>{plusIcon}</span>Add a new holding</BlueBtn>
            </div>
            <div className={classes.BuySellBtns}>
              <GreenBtn big clicked={() => showBuySellHandler('BuyStock')}>Buy</GreenBtn>
              <BuySellPanel mode="BuyStock" show={showBuyStock} close={() => setShowBuyStock(false)} />
              <GreenBtn big clicked={() => showBuySellHandler('SellStock')}>Sell</GreenBtn>
              <BuySellPanel mode="SellStock" show={showSellStock} close={() => setShowSellStock(false)} />
              <button className={classes.SettingsBtn} onClick={() => setShowStockSettings(true)}>
                <span>{settingsIcon}</span>
              </button>
              <SettingsPanel mode="Stock" show={showStockSettings} close={() => setShowStockSettings(false)} />
            </div>
            <SearchPanel mode="Stock" show={showStockSearch} close={() => setShowStockSearch(false)} />
            <InvestmentTable mode="Stocks" normal />
          </div>
          <div className={classes.Cryptos} ref={cryptoRef}>
            <h1>Cryptocurrencies</h1>
            <div className={classes.AddBtn}>
              <BlueBtn big clicked={() => setShowCryptoSearch(true)}><span>{plusIcon}</span>Add a new holding</BlueBtn>
            </div>
            <div className={classes.BuySellBtns}>
              <GreenBtn big clicked={() => showBuySellHandler('BuyCrypto')}>Buy</GreenBtn>
              <BuySellPanel mode="BuyCrypto" show={showBuyCrypto} close={() => setShowBuyCrypto(false)} />
              <GreenBtn big clicked={() => showBuySellHandler('SellCrypto')}>Sell</GreenBtn>
              <BuySellPanel mode="SellCrypto" show={showSellCrypto} close={() => setShowSellCrypto(false)} />
              <button className={classes.SettingsBtn} onClick={() => setShowCryptoSettings(true)}>
                <span>{settingsIcon}</span>
              </button>
              <SettingsPanel mode="Crypto" show={showCryptoSettings} close={() => setShowCryptoSettings(false)} />
            </div>
            <SearchPanel mode="Crypto" show={showCryptoSearch} close={() => setShowCryptoSearch(false)} />
            <InvestmentTable mode="Cryptos" normal />
          </div>
        </div>
        <div className={classes.Investments}>
          <div className={classes.Stocks} ref={assetRef}>
            <h1>Assets</h1>
            <div className={classes.AssetBtns}>
              <div className={classes.AddBtn}>
                <BlueBtn big clicked={() => setShowAddAsset(true)}><span>{plusIcon}</span>Add a new asset</BlueBtn>
              </div>
              <AssetPanel mode="AddAsset" close={() => setShowAddAsset(false)} show={showAddAsset} />
              <div className={classes.RemoveBtn}>
                <BlueBtn big clicked={() => setShowRemoveAsset(true)}><span>{trashIcon}</span>Remove an asset</BlueBtn>
              </div>
              <AssetPanel mode="RemoveAsset" close={() => setShowRemoveAsset(false)} show={showRemoveAsset} />
              <button className={classes.AssetSettingsBtn} onClick={() => setShowAssetSettings(true)}>
                <span>{settingsIcon}</span>
              </button>
              <AssetPanel mode="SettingsAsset" close={() => setShowAssetSettings(false)} show={showAssetSettings} />
            </div>
            <InvestmentTable mode="Assets" normal />
          </div>
          <div className={classes.Cryptos}>
            <h1>Liabilities</h1>
            <div className={classes.AssetBtns}>
              <div className={classes.AddBtn}>
                <BlueBtn big clicked={() => setShowAddDebt(true)}><span>{plusIcon}</span>Add a new liability</BlueBtn>
              </div>
              <AssetPanel mode="AddDebt" close={() => setShowAddDebt(false)} show={showAddDebt} />
              <div className={classes.RemoveBtn}>
                <BlueBtn big clicked={() => setShowRemoveDebt(true)}><span>{trashIcon}</span>Remove a liability</BlueBtn>
              </div>
              <AssetPanel mode="RemoveDebt" close={() => setShowRemoveDebt(false)} show={showRemoveDebt} />
              <button className={classes.AssetSettingsBtn} onClick={() => setShowDebtSettings(true)}>
                <span>{settingsIcon}</span>
              </button>
              <AssetPanel mode="SettingsDebt" close={() => setShowDebtSettings(false)} show={showDebtSettings} />
            </div>
            <InvestmentTable mode="Debts" normal />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cryptos: state.portfolio.cryptos
});

export default connect(mapStateToProps)(withRouter(Portfolio));
