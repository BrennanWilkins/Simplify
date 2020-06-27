import * as actionTypes from './actionTypes';
import { instance } from '../../axios';
import * as actions from './index';

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
};

export const autoLogin = () => dispatch => {
  if (!localStorage['token'] || !localStorage['expirationDate']) { return; }
  if (new Date(localStorage['expirationDate']) <= new Date()) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('expirationTime');
    return;
  }
  instance.defaults.headers.common['x-auth-token'] = localStorage['token'];
  const newTime = new Date(localStorage['expirationDate']).getTime() - new Date().getTime();
  localStorage['expirationTime'] = newTime;
};
