import * as actionTypes from './actionTypes';

export const setNewBudget = (budget) => ({ type: actionTypes.SET_NEW_BUDGET, budget });

export const setBudget = (budget) => ({ type: actionTypes.SET_BUDGET, budget });

export const deleteBudget = () => ({ type: actionTypes.DELETE_BUDGET });
