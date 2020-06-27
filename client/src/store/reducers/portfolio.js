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
    default: return state;
  }
};

export default reducer;
