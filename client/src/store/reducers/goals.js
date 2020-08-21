import * as actionTypes from '../actions/actionTypes';

const initialState = {
  netWorthGoal: null,
  otherGoals: []
};

const addNewGoal = (state, action) => {
  const otherGoals = [...state.otherGoals];
  otherGoals.unshift(action.goal);
  return { ...state, otherGoals };
};

const editGoal = (state, action) => {
  const index = state.otherGoals.findIndex(goal => goal.id === action.goal.id);
  const goal = { ...state.otherGoals[index], name: action.goal.name,
    goal: action.goal.val, date: action.goal.date };
  const otherGoals = [...state.otherGoals];
  otherGoals[index] = goal;
  return { ...state, otherGoals };
};

const updateComplete = (state, action) => {
  const index = state.otherGoals.findIndex(goal => goal.id === action.id);
  const goal = { ...state.otherGoals[index] };
  goal.isComplete = !goal.isComplete;
  const otherGoals = [...state.otherGoals];
  otherGoals[index] = goal;
  return { ...state, otherGoals };
};

const addContrib = (state, action) => {
  const index = state.otherGoals.findIndex(goal => goal.id === action.id);
  const goal = { ...state.otherGoals[index] };
  const contribs = [...goal.contributions];
  // if contribution was made on same date then add it to that date else push to end
  const matchingIndex = contribs.findIndex(contrib => contrib.date === action.contrib.date);
  if (matchingIndex === -1) { contribs.push({ ...action.contrib }); }
  else { contribs[matchingIndex].val = Number(contribs[matchingIndex].val) + Number(action.contrib.val); }
  goal.contributions = [...contribs];
  const otherGoals = [...state.otherGoals];
  otherGoals[index] = { ...goal };
  return { ...state, otherGoals };
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_NET_WORTH_GOAL: return { ...state, netWorthGoal: action.goal };
    case actionTypes.ADD_NEW_GOAL: return addNewGoal(state, action);
    case actionTypes.EDIT_GOAL: return editGoal(state, action);
    case actionTypes.UPDATE_COMPLETE: return updateComplete(state, action);
    case actionTypes.ADD_CONTRIB: return addContrib(state, action);
    case actionTypes.DELETE_GOAL: return { ...state, otherGoals: state.otherGoals.filter(goal => goal.id !== action.id) };
    default: return state;
  }
};

export default reducer;
