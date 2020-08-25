import * as actionTypes from './actionTypes';
import { v4 as uuid } from 'uuid';

export const addNotif = notif => (dispatch, getState) => {
  const newNotif = { id: uuid(), msg: notif };
  const notifs = [...getState().notifications.notifs, newNotif];
  dispatch(setNotifs(notifs));
  dispatch(removeNotif(newNotif.id));
};

export const removeNotif = id => (dispatch, getState) => {
  // delete notification after 6 sec
  setTimeout(() => {
    const notifs = getState().notifications.notifs.filter(notif => notif.id !== id);
    dispatch(setNotifs(notifs));
  }, 6000);
};

export const setNotifs = notifs => ({ type: actionTypes.SET_NOTIFS, notifs });

export const deleteNotif = id => ({ type: actionTypes.DELETE_NOTIF, id });

export const hideNWPopup = () => ({ type: actionTypes.HIDE_NWPOPUP });
