import * as actionTypes from './actionTypes';
import { stockInstance } from '../../axios';

export const getStockStart = () => {
  return { type: actionTypes.GET_STOCK_START };
};

export const setStockPrices = (dataArr) => {
  return {
    type: actionTypes.SET_STOCK_PRICES,
    stockData: dataArr
  };
};

export const getStockPricesFailed = () => {
  return {
    type: actionTypes.GET_STOCK_PRICES_FAILED,
    errorMsg: "Stock price data couldn't be loaded."
  };
};

export const getStockPortfolioFailed = () => {
  return {
    type: actionTypes.GET_STOCK_PORTFOLIO_FAILED,
    errorMsg: "Stock portfolio data couldn't be loaded."
  }
};

export const getStockPrices = () => {
  // const token = 'Bearer ' + localStorage.getItem('token');
  return dispatch => {
    stockInstance.get('aapl').then(res1 => {
      return stockInstance.get('googl').then(res2 => {
        return stockInstance.get('msft').then(res3 => {
          return stockInstance.get('amzn').then(res4 => {
            return stockInstance.get('spy').then(res5 => {
              dispatch(setStockPrices([res1, res2, res3, res4, res5]));
            }).catch(err => {
              dispatch(getStockPricesFailed());
            });
          });
        });
      });
    });
  };
};

export const updateStockPortfolioFailed = () => {
  return {
    type: actionTypes.UPDATE_STOCK_PORTFOLIO_FAILED,
    errorMsg: "Stock portfolio data couldn't be updated."
  }
};

export const updateStockPortfolio = (stocks) => {
  const username = localStorage.getItem('username');
  console.log({username, stocks});
  return dispatch => {
    dispatch(getStockStart());
    stockInstance.post('updatePortfolio', {username, stocks}).then(res => {
      // console.log(res.data);
      if (res.data.message === 'Success') {
        // dispatch(updateSuccess());
        dispatch(setStockPortfolio(res.data.portfolio));
      } else {
        dispatch(updateStockPortfolioFailed());
      }
    }).catch(err => {
      dispatch(updateStockPortfolioFailed());
    });
  };
};

export const setStockPortfolio = (stocks) => {
  return {
    type: actionTypes.SET_STOCK_PORTFOLIO,
    stocks: stocks
  };
};

export const getStockPortfolio = () => {
  const username = localStorage.getItem('username');
  return dispatch => {
    dispatch(getStockStart());
    stockInstance.post('portfolio', {username}).then(res => {
      if (res.data.message === 'Success') {
        dispatch(setStockPortfolio(res.data.portfolio));
      } else {
        dispatch(getStockPortfolioFailed());
      }
    }).catch(err => {
      dispatch(getStockPortfolioFailed());
    });
  };
};
