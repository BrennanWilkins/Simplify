import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  errorMsg: '',
  error: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return { ...state, error: false, errorMsg: '', loading: true };
    case actionTypes.AUTH_SUCCESS: return { ...state, token: action.token, error: false, errorMsg: '', loading: false };
    case actionTypes.AUTH_FAIL: return { ...state, error: true, errorMsg: action.errorMsg, loading: false };
    case actionTypes.SIGNUP_SUCCESS: return { ...state, error: false, errorMsg: '', loading: false };
    case actionTypes.LOGOUT: return { ...state, token: null };
    case actionTypes.CLEAR_ERROR: return { ...state, error: false, errorMsg: '' };
    default: return state;
  }
};

export default reducer;
