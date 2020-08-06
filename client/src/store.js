import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import authReducer from './store/reducers/auth';
import netWorthReducer from './store/reducers/netWorth';
import portfolioReducer from './store/reducers/portfolio';
import goalReducer from './store/reducers/goal';
import budgetReducer from './store/reducers/budget';
import notifsReducer from './store/reducers/notifications';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  netWorth: netWorthReducer,
  portfolio: portfolioReducer,
  goal: goalReducer,
  budget: budgetReducer,
  notifications: notifsReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
