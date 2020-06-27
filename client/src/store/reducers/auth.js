import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN: return { ...state, isAuth: true };
    case actionTypes.LOGOUT: return { ...state, isAuth: false };
    default: return state;
  }
};

export default reducer;
