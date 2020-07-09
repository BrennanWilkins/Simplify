import * as actionTypes from './actionTypes';
import { instance } from '../../axios';
import * as actions from './index';
import { calcNetWorth, calcPortfolioValue } from '../../utils/valueCalcs';
import { getDemoData } from '../../utils/demoData';

let expirationTimeout;

export const loginDispatch = () => ({ type: actionTypes.LOGIN });

export const login = () => dispatch => {
  expirationTimeout = setTimeout(() => dispatch(logout()), Number(localStorage['expirationTime']));
  dispatch(loginDispatch());
};

export const logoutDispatch = () => ({ type: actionTypes.LOGOUT });

export const logout = () => dispatch => {
  delete instance.defaults.headers.common['x-auth-token'];
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('expirationTime');
  clearTimeout(expirationTimeout);
  dispatch(logoutDispatch());
  dispatch(actions.resetPortfolio());
  dispatch(actions.resetNetWorth());
  dispatch(actions.setGoal(null));
  dispatch(actions.deleteBudget());
  dispatch(endLoading());
};

export const startLoading = () => ({ type: actionTypes.START_LOADING });

export const endLoading = () => ({ type: actionTypes.END_LOADING });

export const createError = () => ({ type: actionTypes.CREATE_ERROR });

export const createDemoError = () => ({ type: actionTypes.CREATE_DEMO_ERROR });

export const removeError = () => ({ type: actionTypes.REMOVE_ERROR });

export const autoLogin = () => dispatch => {
  if (!localStorage['token'] || !localStorage['expirationDate']) { return; }
  if (new Date(localStorage['expirationDate']) <= new Date()) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('expirationTime');
    return;
  }
  dispatch(startLoading());
  instance.defaults.headers.common['x-auth-token'] = localStorage['token'];
  const newTime = new Date(localStorage['expirationDate']).getTime() - new Date().getTime();
  localStorage['expirationTime'] = newTime;
  instance.get('/auth/autoLogin').then(res => {
    const updatedNetWorth = calcNetWorth(res.data.netWorth.dataPoints, res.data.portfolio);
    instance.put('netWorth', { netWorthData: updatedNetWorth }).then(resp => {
      dispatch(actions.setNetWorthData(resp.data.result.dataPoints));
      dispatch(actions.setPortfolio(calcPortfolioValue(res.data.portfolio)));
      if (res.data.goal) { dispatch(actions.setGoal(res.data.goal)); }
      if (res.data.budgets) { dispatch(actions.setBudget(res.data.budgets)); }
      dispatch(endLoading());
      dispatch(removeError());
      dispatch(login());
    }).catch(err => {
      dispatch(logout());
      dispatch(endLoading());
      dispatch(createError());
    });
  }).catch(err => {
    dispatch(logout());
    dispatch(endLoading());
    dispatch(createError());
  });
};

export const demoLogin = () => ({ type: actionTypes.DEMO_LOGIN });

export const loadDemo = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('expirationTime');
  dispatch(startLoading());
  const demoData = getDemoData();
  instance.post('/demo/demoLogin', { portfolio: demoData.portfolio }).then(res => {
    const updatedNetWorth = calcNetWorth(demoData.netWorthData, res.data.portfolio);
    dispatch(actions.setNetWorthData(updatedNetWorth));
    dispatch(actions.setPortfolio(calcPortfolioValue(res.data.portfolio)));
    dispatch(actions.setGoal(demoData.goal));
    dispatch(actions.setBudget(demoData.budget));
    dispatch(endLoading());
    dispatch(removeError());
    dispatch(demoLogin());
  }).catch(err => {
    dispatch(endLoading());
    dispatch(createDemoError());
  });
};
