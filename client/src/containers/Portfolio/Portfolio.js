import React, { useState, useEffect, useRef } from 'react';
import classes from './Portfolio.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import BuySellPanel from '../../components/BuySellPanel/BuySellPanel';
import { settingsIcon } from '../../components/UI/UIIcons';
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel';
import AssetPanel from '../../components/AssetPanel/AssetPanel';
import NetWorthChart from '../../components/NetWorthChart/NetWorthChart';
import InvestmentTable from '../../components/InvestmentTable/InvestmentTable';

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
  const contentRef = useRef();
  const stockRef = useRef();
  const cryptoRef = useRef();
  const assetRef = useRef();

  useEffect(() => {
    switch(props.location.search) {
      case '?pos=stocks': return stockRef.current.scrollIntoView();
      case '?pos=cryptos': return cryptoRef.current.scrollIntoView();
      case '?pos=assets': return assetRef.current.scrollIntoView();
      default: return contentRef.current.scrollIntoView();
    }
  }, []);

  const showBuySellHandler = (mode) => {
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
      <div className={classes.Content} ref={contentRef}>
        <NetWorthChart small={false} />
        <div className={classes.Investments}>
          <div className={classes.Stocks} ref={stockRef}>
            <h1>Stocks</h1>
            <button className={classes.NewBtn} onClick={() => setShowStockSearch(true)}>Add a new holding</button>
            <div className={classes.BuySellBtns}>
              <button className={classes.BuyBtn} onClick={() => showBuySellHandler('BuyStock')}>Buy</button>
              <BuySellPanel mode="BuyStock" show={showBuyStock} close={() => setShowBuyStock(false)} />
              <button className={classes.SellBtn} onClick={() => showBuySellHandler('SellStock')}>Sell</button>
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
            <button className={classes.NewBtn} onClick={() => setShowCryptoSearch(true)}>Add a new holding</button>
            <div className={classes.BuySellBtns}>
              <button className={classes.BuyBtn} onClick={() => showBuySellHandler('BuyCrypto')}>Buy</button>
              <BuySellPanel mode="BuyCrypto" show={showBuyCrypto} close={() => setShowBuyCrypto(false)} />
              <button className={classes.SellBtn} onClick={() => showBuySellHandler('SellCrypto')}>Sell</button>
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
              <button className={classes.NewBtn} onClick={() => setShowAddAsset(true)}>Add a new asset</button>
              <AssetPanel mode="AddAsset" close={() => setShowAddAsset(false)} show={showAddAsset} />
              <button className={classes.NewBtn} onClick={() => setShowRemoveAsset(true)}>Remove an asset</button>
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
              <button className={classes.NewBtn} onClick={() => setShowAddDebt(true)}>Add a new liability</button>
              <AssetPanel mode="AddDebt" close={() => setShowAddDebt(false)} show={showAddDebt} />
              <button className={classes.NewBtn} onClick={() => setShowRemoveDebt(true)}>Remove a liability</button>
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
