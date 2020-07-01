import * as actionTypes from './actionTypes';

export const setPortfolio = (data) => ({ type: actionTypes.SET_PORTFOLIO, data });

export const resetPortfolio = () => ({ type: actionTypes.RESET_PORTFOLIO });

export const addStock = (stock) => ({ type: actionTypes.ADD_STOCK, stock });

export const addCrypto = (crypto) => ({ type: actionTypes.ADD_CRYPTO, crypto });

export const changeStock = (stocks) => ({ type: actionTypes.CHANGE_STOCK, stocks });

export const changeCrypto = (cryptos) => ({ type: actionTypes.CHANGE_CRYPTO, cryptos });
