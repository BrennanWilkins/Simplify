import * as actionTypes from './actionTypes';
import { cryptoInstance } from '../../axios';

export const getCryptoStart = () => {
  return { type: actionTypes.GET_CRYPTO_START };
};

export const setCryptoPrices = (dataArr) => {
  return {
    type: actionTypes.SET_CRYPTO_PRICES,
    cryptoData: dataArr
  };
};

export const getCryptoPricesFailed = () => {
  return {
    type: actionTypes.GET_CRYPTO_PRICES_FAILED,
    errorMsg: "Crypto price data couldn't be loaded."
  };
};

export const getCryptoPortfolioFailed = () => {
  return {
    type: actionTypes.GET_CRYPTO_PORTFOLIO_FAILED,
    errorMsg: "Crypto portfolio data couldn't be loaded."
  }
};

export const updateCryptoPortfolioFailed = () => {
  return {
    type: actionTypes.UPDATE_CRYPTO_PORTFOLIO_FAILED,
    errorMsg: "Crypto portfolio data couldn't be updated."
  }
};

export const getCryptoPrices = () => {
  return dispatch => {
    dispatch(getCryptoStart());
    cryptoInstance.get('btc').then(res1 => {
      return cryptoInstance.get('ltc').then(res2 => {
        return cryptoInstance.get('eth').then(res3 => {
          dispatch(setCryptoPrices([res1, res2, res3]));
        }).catch(err => {
          dispatch(getCryptoPricesFailed());
        });
      });
    });
  };
};

export const updateSuccess = () => {
  return { type: actionTypes.UPDATE_SUCCESS };
};

export const updateCryptoPortfolio = (cryptos) => {
  const username = localStorage.getItem('username');
  return dispatch => {
    dispatch(getCryptoStart());
    cryptoInstance.post('updatePortfolio', {username, cryptos}).then(res => {
      // console.log(res.data);
      if (res.data.message === 'Success') {
        // dispatch(updateSuccess());
        dispatch(setCryptoPortfolio(res.data.portfolio));
      } else {
        dispatch(updateCryptoPortfolioFailed());
      }
    }).catch(err => {
      dispatch(updateCryptoPortfolioFailed());
    });
  };
};

export const setCryptoPortfolio = (cryptos) => {
  return {
    type: actionTypes.SET_CRYPTO_PORTFOLIO,
    cryptos: cryptos
  };
};

export const getCryptoPortfolio = () => {
  const username = localStorage.getItem('username');
  return dispatch => {
    dispatch(getCryptoStart());
    cryptoInstance.post('portfolio', {username}).then(res => {
      // console.log(res.data);
      if (res.data.message === 'Success') {
        dispatch(setCryptoPortfolio(res.data.portfolio));
      } else {
        dispatch(getCryptoPortfolioFailed());
      }
    }).catch(err => {
      dispatch(getCryptoPortfolioFailed());
    });
  };
};
