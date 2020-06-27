import * as actionTypes from '../actions/actionTypes';

const initialState = {
  netWorthData: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_NET_WORTH_DATA: return { ...state, netWorthData: action.data };
    case actionTypes.RESET_NET_WORTH: return { ...initialState };
    default: return state;
  }
};

export default reducer;
