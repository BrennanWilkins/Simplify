import * as actionTypes from '../actions/actionTypes';

const initialState = {
  goal: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_GOAL: return { ...state, goal: action.goal };
    default: return state;
  }
};

export default reducer;
