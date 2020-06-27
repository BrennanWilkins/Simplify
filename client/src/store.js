import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import authReducer from './store/reducers/auth';
import cryptoReducer from './store/reducers/cryptos';
import netWorthReducer from './store/reducers/netWorth';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  cryptos: cryptoReducer,
  netWorth: netWorthReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
