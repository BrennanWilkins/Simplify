import * as actionTypes from '../actions/actionTypes';

const initialState = {
  budget: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_NEW_BUDGET:
      const budget = [...action.budget].map(indivBudget => (
        { ...indivBudget, remaining: indivBudget.budget, transactions: [] }
      ));
      return { ...state, budget };
    default: return state;
  }
};

export default reducer;
