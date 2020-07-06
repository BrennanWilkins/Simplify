import React, { useState } from 'react';
import classes from './BudgetPage.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import NewBudgetPanel from '../../components/NewBudgetPanel/NewBudgetPanel';

const BudgetPage = props => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className={classes.Container}>
      <h1 className={classes.Title}>Budgeting</h1>
      {props.budget.length > 0 ? (
        null
      ) : (
        <div className={classes.NewDiv}>
          <button className={classes.NewBtn} onClick={() => setShowCreate(true)}>Create a new budget</button>
          <NewBudgetPanel show={showCreate} close={() => setShowCreate(false)} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  budget: state.budget.budget
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
