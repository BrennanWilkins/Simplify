import * as actionTypes from './actionTypes';
import { instance as axios } from '../../axios';

export const setPortfolio = data => ({ type: actionTypes.SET_PORTFOLIO, data });

export const resetPortfolio = () => ({ type: actionTypes.RESET_PORTFOLIO });

export const addStock = stock => ({ type: actionTypes.ADD_STOCK, stock });

export const addCrypto = crypto => ({ type: actionTypes.ADD_CRYPTO, crypto });

export const changeStock = stocks => ({ type: actionTypes.CHANGE_STOCK, stocks });

export const changeCrypto = cryptos => ({ type: actionTypes.CHANGE_CRYPTO, cryptos });

export const updateAssets = assets => ({ type: actionTypes.UPDATE_ASSETS, assets });

export const updateDebts = debts => ({ type: actionTypes.UPDATE_DEBTS, debts });

export const setHighlights = data => ({ type: actionTypes.SET_HIGHLIGHTS, data });

export const setUpdateHighlights = bool => ({ type: actionTypes.SET_UPDATE_HIGHLIGHTS, bool });
