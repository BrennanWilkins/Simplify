import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cryptos: {
    btc: { quantity: 1, price: 0},
    eth: { quantity: 1, price: 0},
    ltc: { quantity: 1, price: 0}
  },
  totalValue: 0,
  error: false,
  errorMsg: '',
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CRYPTO_PRICES:
      const cryptos = { ...state.cryptos };
      const btcPrice = action.cryptoData[0].data['1'].quote.USD.price.toFixed(2);
      const btc = { ...cryptos.btc };
      btc.price = btcPrice;
      const ltcPrice = action.cryptoData[1].data['2'].quote.USD.price.toFixed(2);
      const ltc = { ...cryptos.ltc };
      ltc.price = ltcPrice;
      let ethPrice = action.cryptoData[2].data['1027'].quote.USD.price.toFixed(2);
      const eth = { ...cryptos.eth };
      eth.price = ethPrice;
      let totalValue = (btc.price * btc.quantity) + (ltc.price * ltc.quantity) +
      (eth.price * eth.quantity);
      cryptos.btc = btc;
      cryptos.eth = eth;
      cryptos.ltc = ltc;
      return { ...state, cryptos, totalValue, error: false, errorMsg: '' };
    case actionTypes.GET_CRYPTO_PRICES_FAILED: return { ...state, error: true, errorMsg: action.errorMsg, loading: false };
    case actionTypes.UPDATE_CRYPTO_PORTFOLIO_FAILED: return { ...state, error: true, errorMsg: action.errorMsg, loading: false };
    case actionTypes.GET_CRYPTO_START: return { ...state, error: false, loading: true };
    case actionTypes.SET_CRYPTO_PORTFOLIO:
      const cryptos2 = { ...state.cryptos };
      const btc2 = { ...cryptos2.btc };
      const ltc2 = { ...cryptos2.ltc };
      const eth2 = { ...cryptos2.eth };
      btc2.quantity = action.cryptos.btc;
      ltc2.quantity = action.cryptos.ltc;
      eth2.quantity = action.cryptos.eth;
      cryptos2.btc = btc2; cryptos2.ltc = ltc2; cryptos2.eth = eth2;
      return { ...state, cryptos: cryptos2, error: false, errorMsg: '', loading: false };
    case actionTypes.UPDATE_SUCCESS: return { ...state, error: false, errorMsg: '', loading: false };
    default: return state;
  }
};

export default reducer;
