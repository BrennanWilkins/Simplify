import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import authReducer from './store/reducers/auth';
import netWorthReducer from './store/reducers/netWorth';
import portfolioReducer from './store/reducers/portfolio';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  netWorth: netWorthReducer,
  portfolio: portfolioReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
