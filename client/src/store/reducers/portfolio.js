import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cryptos: [],
  stocks: [],
  otherAssets: [],
  liabilities: [],
  wasMounted: false,
  highlightData: {
    highestStock: { symbol: '', change: 0 },
    lowestStock: { symbol: '', change: 0 },
    highestCrypto: { symbol: '', change: 0 },
    lowestCrypto: { symbol: '', change: 0 }
  }
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
    case actionTypes.UPDATE_ASSETS:
      return { ...state, otherAssets: action.assets };
    case actionTypes.UPDATE_DEBTS:
      return { ...state, liabilities: action.debts };
    case actionTypes.SET_HIGHLIGHTS:
      const highlightData = { ...state.highlightData };
      if (action.data.highestStock) { highlightData.highestStock = action.data.highestStock; }
      if (action.data.lowestStock) { highlightData.lowestStock = action.data.lowestStock; }
      if (action.data.highestCrypto) { highlightData.highestCrypto = action.data.highestCrypto; }
      if (action.data.lowestCrypto) { highlightData.lowestCrypto = action.data.lowestCrypto; }
      return { ...state, wasMounted: true, highlightData };
    default: return state;
  }
};

export default reducer;
