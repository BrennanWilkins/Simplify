import * as actionTypes from '../actions/actionTypes';

const initialState = {
  budget: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_NEW_BUDGET:
      const budget = [...action.budget].map(budg => (
        { ...budg, remaining: budg.budget, transactions: [] }
      ));
      return { ...state, budget };
    case actionTypes.SET_BUDGET:
      const budgets = action.budget.map(budget => {
        let remaining = budget.budget;
        for (let i = 0; i < budget.transactions.length; i++) {
          remaining -= budget.transactions[i].val;
        }
        return { budget: budget.budget, category: budget.category, transactions: budget.transactions, remaining };
      });
      return { ...state, budget: budgets };
    case actionTypes.DELETE_BUDGET: return { ...state, budget: [] };
    default: return state;
  }
};

export default reducer;
