import * as actionTypes from './actionTypes';
import { instance } from '../../axios';
import * as actions from './index';
import { calcNetWorth, calcPortfolioValue } from '../../utils/valueCalcs';
import getDemoData, { getDemoNWData, getDemoNW } from '../../utils/demoData';

let expirationTimeout;

export const loginDispatch = () => ({ type: actionTypes.LOGIN });

export const login = () => dispatch => {
  // logs user out when token expiration reached
  expirationTimeout = setTimeout(() => dispatch(logout()), Number(localStorage['expirationTime']));
  dispatch(loginDispatch());
};

export const loginHandler = (data, remember) => async dispatch => {
  instance.defaults.headers.common['x-auth-token'] = data.token;
  if (remember) {
    localStorage['token'] = data.token;
    // token expires in 7 days
    localStorage['expirationDate'] = new Date(new Date().getTime() + 604800000);
    localStorage['expirationTime'] = '604800000';
  } else {
    // token expires in 1hr
    localStorage['token'] = data.token;
    localStorage['expirationDate'] = new Date(new Date().getTime() + 3600000);
    localStorage['expirationTime'] = '3600000';
  }
  const updatedNetWorth = calcNetWorth(data.netWorth.dataPoints, data.portfolio);
  const res = await instance.put('netWorth', { netWorthData: updatedNetWorth });
  dispatch(actions.setNetWorthData(res.data.result.dataPoints));
  const NWGoal = Number(data.goals.netWorthGoal);
  if (NWGoal === 0) { dispatch(actions.setNetWorthGoal(null)); }
  else { dispatch(actions.setNetWorthGoal(NWGoal)); }
  dispatch(actions.setOtherGoals(data.goals.otherGoals));
  dispatch(actions.setPortfolio(calcPortfolioValue(data.portfolio)));
  if (data.budgets) { dispatch(actions.setBudget(data.budgets)); }
  dispatch(login());
};

export const logoutDispatch = () => ({ type: actionTypes.LOGOUT });

export const logout = () => dispatch => {
  // delete all local storage items & remove token from instance header on logout
  delete instance.defaults.headers.common['x-auth-token'];
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('darkMode');
  clearTimeout(expirationTimeout);
  dispatch(logoutDispatch());
  dispatch(actions.resetPortfolio());
  dispatch(actions.resetNetWorth());
  dispatch(actions.resetGoals());
  dispatch(actions.deleteBudget());
  dispatch(endLoading());
  dispatch(actions.resetDarkMode());
};

export const startLoading = () => ({ type: actionTypes.START_LOADING });

export const endLoading = () => ({ type: actionTypes.END_LOADING });

export const createError = () => ({ type: actionTypes.CREATE_ERROR });

export const createDemoError = () => ({ type: actionTypes.CREATE_DEMO_ERROR });

export const removeError = () => ({ type: actionTypes.REMOVE_ERROR });

export const autoLogin = () => dispatch => {
  if (!localStorage['token'] || !localStorage['expirationDate']) { return; }
  if (new Date(localStorage['expirationDate']) <= new Date()) {
    // if token is expired dont login
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('darkMode');
    return;
  }
  dispatch(startLoading());
  instance.defaults.headers.common['x-auth-token'] = localStorage['token'];
  // update timer for autologout
  const newTime = new Date(localStorage['expirationDate']).getTime() - new Date().getTime();
  localStorage['expirationTime'] = newTime;
  instance.get('/auth/autoLogin').then(res => {
    const updatedNetWorth = calcNetWorth(res.data.netWorth.dataPoints, res.data.portfolio);
    instance.put('netWorth', { netWorthData: updatedNetWorth }).then(resp => {
      dispatch(actions.setNetWorthData(resp.data.result.dataPoints));
      dispatch(actions.setPortfolio(calcPortfolioValue(res.data.portfolio)));
      let NWGoal = Number(res.data.goals.netWorthGoal);
      NWGoal = NWGoal === 0 ? null : NWGoal;
      dispatch(actions.setNetWorthGoal(NWGoal));
      dispatch(actions.setOtherGoals(res.data.goals.otherGoals));
      if (res.data.budgets) { dispatch(actions.setBudget(res.data.budgets)); }
      dispatch(endLoading());
      dispatch(removeError());
      dispatch(login());
      if (localStorage['darkMode'] === 'true') { dispatch(actions.toggleDarkMode()); }
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
  localStorage.removeItem('darkMode');
  dispatch(startLoading());
  const demoData = getDemoData();
  instance.post('/auth/demoLogin', { portfolio: demoData.portfolio }).then(res => {
    const demoNWData = getDemoNWData(getDemoNW(res.data.portfolio));
    const updatedNetWorth = calcNetWorth(demoNWData, res.data.portfolio);
    dispatch(actions.setNetWorthData(updatedNetWorth));
    dispatch(actions.setPortfolio(calcPortfolioValue(res.data.portfolio)));
    dispatch(actions.setNetWorthGoal(demoData.NWGoal));
    dispatch(actions.setBudget(demoData.budget));
    dispatch(actions.setOtherGoals(demoData.otherGoals));
    dispatch(endLoading());
    dispatch(removeError());
    dispatch(demoLogin());
  }).catch(err => {
    dispatch(endLoading());
    dispatch(createDemoError());
  });
};
