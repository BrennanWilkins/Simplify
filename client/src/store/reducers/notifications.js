import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notifs: [],
  showNWPopup: true,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_NOTIFS: return { ...state, notifs: action.notifs };
    case actionTypes.DELETE_NOTIF: return { ...state, notifs: state.notifs.filter(notif => notif.id !== action.id) };
    case actionTypes.HIDE_NWPOPUP: return { ...state, showNWPopup: false };
    default: return state;
  }
};

export default reducer;
