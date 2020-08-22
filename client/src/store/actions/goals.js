import * as actionTypes from './actionTypes';

export const setNetWorthGoal = goal => ({ type: actionTypes.SET_NET_WORTH_GOAL, goal });

export const addNewGoal = goal => ({ type: actionTypes.ADD_NEW_GOAL, goal });

export const editGoal = goal => ({ type: actionTypes.EDIT_GOAL, goal });

export const updateComplete = id => ({ type: actionTypes.UPDATE_COMPLETE, id });

export const addContrib = (contrib, id) => ({ type: actionTypes.ADD_CONTRIB, contrib, id });

export const deleteGoal = id => ({ type: actionTypes.DELETE_GOAL, id });

export const resetGoals = () => ({ type: actionTypes.RESET_GOALS });

export const setOtherGoals = goals => ({ type: actionTypes.SET_OTHER_GOALS, goals });
