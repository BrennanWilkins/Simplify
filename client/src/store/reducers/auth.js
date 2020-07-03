import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN: return { ...state, isAuth: true };
    case actionTypes.LOGOUT: return { ...state, isAuth: false };
    case actionTypes.START_LOADING: return { ...state, loading: true };
    case actionTypes.END_LOADING: return { ...state, loading: false };
    default: return state;
  }
};

export default reducer;
