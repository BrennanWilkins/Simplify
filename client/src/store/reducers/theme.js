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
  document.body.style.setProperty('--tableBack', 'white');
  document.body.style.setProperty('--tableTDColor', 'black');
  document.body.style.setProperty('--tableSymbol', 'rgb(var(--dark-blue2))');
  document.body.style.setProperty('--tableChartBtn', 'rgb(var(--dark-blue4))');
  document.body.style.setProperty('--tableTHColor', 'rgb(var(--dark-blue))');
  document.body.style.setProperty('--chartBack', 'white');
  document.body.style.setProperty('--highlightBack', 'white');
  document.body.style.setProperty('--highlightInfoBack', 'rgba(var(--blue), 0.2)');
  document.body.style.setProperty('--newsLink', 'rgba(var(--dark-blue), 0.1)');
  document.body.style.setProperty('--newsLinkHover', 'rgba(var(--dark-blue), 0.25)');
};

const switchToDark = () => {
  // ls used to store dark mode preference
  localStorage['darkMode'] = 'true';
  // change css properties to dark mode theme
  document.body.style.setProperty('--bodyBack', 'rgb(31, 52, 69)');
  document.body.style.setProperty('--navBarBack', 'rgb(23, 38, 51)');
  document.body.style.setProperty('--titleColor', 'rgb(var(--light-blue3))');
  document.body.style.setProperty('--tableBack', 'rgba(var(--blue), 0.3)');
  document.body.style.setProperty('--tableTDColor', 'rgb(var(--light-blue2)');
  document.body.style.setProperty('--tableSymbol', 'rgb(var(--light-blue2)');
  document.body.style.setProperty('--tableChartBtn', 'rgb(var(--light-blue2)');
  document.body.style.setProperty('--tableTHColor', 'rgb(var(--light-blue2)');
  document.body.style.setProperty('--chartBack', 'rgb(var(--dark-blue5))');
  document.body.style.setProperty('--highlightBack', 'rgb(var(--dark-blue5))');
  document.body.style.setProperty('--highlightInfoBack', 'rgb(var(--light-blue2)');
  document.body.style.setProperty('--newsLink', 'rgba(var(--light-blue), 0.9)');
  document.body.style.setProperty('--newsLinkHover', 'rgba(var(--light-blue3), 0.7)');
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
