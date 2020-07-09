import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  loading: false,
  error: false,
  isDemo: false,
  demoError: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN: return { ...state, isAuth: true };
    case actionTypes.LOGOUT: return { ...state, isAuth: false, isDemo: false };
    case actionTypes.START_LOADING: return { ...state, loading: true };
    case actionTypes.END_LOADING: return { ...state, loading: false };
    case actionTypes.CREATE_ERROR: return { ...state, error: true };
    case actionTypes.REMOVE_ERROR: return { ...state, error: false, demoError: false };
    case actionTypes.CREATE_DEMO_ERROR: return { ...state, demoError: true };
    case actionTypes.DEMO_LOGIN: return { ...state, isDemo: true };
    default: return state;
  }
};

export default reducer;
