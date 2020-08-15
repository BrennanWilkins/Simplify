import * as actionTypes from '../actions/actionTypes';

const initialState = {
  netWorthGoal: null,
  otherGoals: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_NET_WORTH_GOAL: return { ...state, netWorthGoal: action.goal };
    default: return state;
  }
};

export default reducer;
