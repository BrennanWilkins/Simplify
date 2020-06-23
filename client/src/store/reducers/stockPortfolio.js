import * as actionTypes from '../actions/actionTypes';

const initialState = {
  stocks: {
    AAPL: { shares: 1, price: 0 },
    GOOGL: { shares: 1, price: 0 },
    MSFT: { shares: 1, price: 0 },
    AMZN: { shares: 1, price: 0 },
    // TSLA: { shares: 1, price: 0 },
    SPY: { shares: 1, price: 0 },
    // VOO: { shares: 1, price: 0 }
  },
  totalValue: 0,
  error: false,
  errorMsg: '',
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STOCK_PRICES:
      const stocks = {...state.stocks};
      for (let res of action.stockData) {
        const stock = {...stocks[res.data["Global Quote"]["01. symbol"]]}
        stock.price = Number(res.data["Global Quote"]["05. price"]).toFixed(2);
        stocks[res.data["Global Quote"]["01. symbol"]] = stock;
      }
      let totalValue = 0;
      for (let key in stocks) {
        totalValue += (Number(stocks[key].price) * Number(stocks[key].shares));
      }
      return { ...state, stocks, totalValue, error: false };
    case actionTypes.GET_STOCK_PRICES_FAILED: return { ...state, error: true, loading: false };
    case actionTypes.UPDATE_STOCK_PORTFOLIO_FAILED: return { ...state, error: true, errorMsg: action.errorMsg, loading: false };
    case actionTypes.GET_STOCK_START: return { ...state, error: false, loading: true };
    case actionTypes.SET_STOCK_PORTFOLIO:
      const stocks2 = { ...state.stocks };
      const aapl = {...stocks2.AAPL};
      aapl.shares = action.stocks.aapl;
      stocks2.AAPL = aapl;
      const googl = {...stocks2.GOOGL};
      googl.shares = action.stocks.googl;
      stocks2.GOOGL = googl;
      const msft = {...stocks2.MSFT};
      msft.shares = action.stocks.msft;
      stocks2.MSFT = msft;
      const amzn = {...stocks2.AMZN};
      amzn.shares = action.stocks.amzn;
      stocks2.AMZN = amzn;
      const spy = {...stocks2.SPY};
      spy.shares = action.stocks.spy;
      stocks2.SPY = spy;
      // console.log(stocks2);
      return { ...state, stocks: stocks2, error: false, errorMsg: '', loading: false };
    default: return state;
  }
};

export default reducer;
