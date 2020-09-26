import * as actionTypes from '../actions/actionTypes';

const initialState = {
  darkMode: false
};

const switchToLight = () => {
  // ls used to store dark mode preference
  localStorage.removeItem('darkMode');
  // change css properties to light mode theme
  document.body.style.setProperty('--bodyBack', 'white');
  document.body.style.setProperty('--navBarBack', 'rgb(var(--dark-blue3))');
  document.body.style.setProperty('--titleColor', 'rgb(var(--dark-blue2))');
  document.body.style.setProperty('--chartBack', 'white');
  document.body.style.setProperty('--panelBack', 'white');
  document.body.style.setProperty('--panelText', 'black');
  document.body.style.setProperty('--homeCardBack', 'white');
};

const switchToDark = () => {
  // ls used to store dark mode preference
  localStorage['darkMode'] = 'true';
  // change css properties to dark mode theme
  document.body.style.setProperty('--bodyBack', 'rgb(31, 52, 69)');
  document.body.style.setProperty('--navBarBack', 'rgb(23, 38, 51)');
  document.body.style.setProperty('--titleColor', 'rgb(var(--light-blue3))');
  document.body.style.setProperty('--chartBack', 'rgb(var(--dark-blue5))');
  document.body.style.setProperty('--panelBack', 'rgb(14, 41, 65)');
  document.body.style.setProperty('--panelText', 'rgb(var(--light-blue3))');
  document.body.style.setProperty('--homeCardBack', 'rgb(15, 37, 55)');
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TOGGLE_DARK_MODE:
      if (state.darkMode) { switchToLight(); }
      else { switchToDark(); }
      return { ...state, darkMode: !state.darkMode };
    case actionTypes.RESET_DARK_MODE:
      switchToLight();
      return { ...state, darkMode: false };
    default: return state;
  }
};

export default reducer;
