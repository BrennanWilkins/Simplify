import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notifs: [],
  showNWPopup: true,
  NWPopupShown: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_NOTIFS: return { ...state, notifs: action.notifs };
    case actionTypes.DELETE_NOTIF: return { ...state, notifs: state.notifs.filter(notif => notif.id !== action.id) };
    case actionTypes.HIDE_NWPOPUP: return { ...state, showNWPopup: false };
    case actionTypes.NWPOPUP_SHOWN: return { ...state, showNWPopup: false, NWPopupShown: true };
    default: return state;
  }
};

export default reducer;
