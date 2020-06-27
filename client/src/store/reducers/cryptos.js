import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cryptos: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_CRYPTOS: return { ...state, cryptos: action.cryptos };
    default: return state;
  }
};

export default reducer;
