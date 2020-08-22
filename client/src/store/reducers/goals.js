import * as actionTypes from '../actions/actionTypes';

const initialState = {
  netWorthGoal: null,
  otherGoals: []
};

// used to add a new goal for demo mode only
const addNewGoal = (state, action) => {
  const otherGoals = [...state.otherGoals];
  otherGoals.unshift(action.goal);
  return { ...state, otherGoals };
};

// used to edit a goal in demo mode only
const editGoal = (state, action) => {
  const index = state.otherGoals.findIndex(goal => goal._id === action.goal._id);
  const goal = { ...state.otherGoals[index], name: action.goal.name,
    goal: action.goal.val, date: action.goal.date };
  const otherGoals = [...state.otherGoals];
  otherGoals[index] = goal;
  return { ...state, otherGoals };
};

// used to update isComplete goal property for demo mode only
const updateComplete = (state, action) => {
  const index = state.otherGoals.findIndex(goal => goal._id === action.id);
  const goal = { ...state.otherGoals[index] };
  goal.isComplete = !goal.isComplete;
  const otherGoals = [...state.otherGoals];
  otherGoals[index] = goal;
  return { ...state, otherGoals };
};

// adds contribution to a goal for demo mode only
const addContrib = (state, action) => {
  const index = state.otherGoals.findIndex(goal => goal._id === action.id);
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
    case actionTypes.SET_OTHER_GOALS: return { ...state, otherGoals: action.goals };
    case actionTypes.ADD_NEW_GOAL: return addNewGoal(state, action);
    case actionTypes.EDIT_GOAL: return editGoal(state, action);
    case actionTypes.UPDATE_COMPLETE: return updateComplete(state, action);
    case actionTypes.ADD_CONTRIB: return addContrib(state, action);
    case actionTypes.DELETE_GOAL: return { ...state, otherGoals: state.otherGoals.filter(goal => goal._id !== action.id) };
    case actionTypes.RESET_GOALS: return { ...state, netWorthGoal: null, otherGoals: [] };
    default: return state;
  }
};

export default reducer;
