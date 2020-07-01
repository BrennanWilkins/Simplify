import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cryptos: [],
  stocks: [],
  otherAssets: [],
  liabilities: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_PORTFOLIO:
      return {
        ...state,
        cryptos: action.data.cryptos,
        stocks: action.data.stocks,
        otherAssets: action.data.otherAssets,
        liabilities: action.data.liabilities
      };
    case actionTypes.RESET_PORTFOLIO: return { ...initialState };
    case actionTypes.ADD_STOCK:
      const stocks = [...state.stocks];
      stocks.unshift(action.stock);
      return { ...state, stocks };
    case actionTypes.ADD_CRYPTO:
      const cryptos = [...state.cryptos];
      cryptos.unshift(action.crypto);
      return { ...state, cryptos };
    case actionTypes.CHANGE_STOCK:
      return { ...state, stocks: action.stocks };
    case actionTypes.CHANGE_CRYPTO:
      return { ...state, cryptos: action.cryptos };
    default: return state;
  }
};

export default reducer;
