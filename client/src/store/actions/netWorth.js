import * as actionTypes from './actionTypes';

export const setNetWorthData = (data) => ({ type: actionTypes.SET_NET_WORTH_DATA, data });

export const resetNetWorth = () => ({ type: actionTypes.RESET_NET_WORTH });
