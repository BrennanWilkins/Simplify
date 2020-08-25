import React, { useState } from 'react';
import classes from './GoalPage.module.css';
import { connect } from 'react-redux';
import NewGoalPanel from '../NewGoalPanel/NewGoalPanel';
import NewNWGoalPanel from '../NewNWGoalPanel/NewNWGoalPanel';
import { plusIcon } from '../../UI/UIIcons';
import GoalCard from '../GoalCard/GoalCard';

const GoalPage = props => {
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [showCreateNWGoal, setShowCreateNWGoal] = useState(false);

  return (
    <div className={classes.Container}>
      <div className={showCreateNWGoal ? `${classes.Content} ${classes.ExpandNW}` : showCreateGoal ? `${classes.Content} ${classes.ExpandGoal}` : classes.Content}>
        <div className={classes.SelectBar}>
          <button className={classes.Btn} onClick={() => setShowCreateGoal(true)}><span>{plusIcon}</span>Add a new goal</button>
          {!props.netWorthGoal && <button className={classes.Btn} onClick={() => setShowCreateNWGoal(true)}><span>{plusIcon}</span>Add a net worth goal</button>}
          <NewNWGoalPanel show={showCreateNWGoal} close={() => setShowCreateNWGoal(false)} isDemo={props.isDemo} />
          <NewGoalPanel show={showCreateGoal} close={() => setShowCreateGoal(false)} isDemo={props.isDemo} />
        </div>
        <div className={classes.Cards}>
          {props.netWorthGoal &&
          <GoalCard isNW
          curr={props.netWorthData.length === 0 ? '0.00' : props.netWorthData[props.netWorthData.length - 1].value}
          data={props.netWorthData}
          goal={props.netWorthGoal}
          isComplete={props.netWorthData[props.netWorthData.length - 1].value >= props.netWorthGoal}
          name="Net Worth Goal" />}
          {props.otherGoals.map((goal, i) => <GoalCard key={i} {...goal} curr={goal.contributions.reduce((tot, curr) => tot + Number(curr.val), 0)} />)}
        </div>
        <div className={showCreateNWGoal || showCreateGoal ? classes.Backdrop : classes.HideBackdrop}></div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  netWorthGoal: state.goals.netWorthGoal,
  otherGoals: state.goals.otherGoals,
  isDemo: state.auth.isDemo,
  netWorthData: state.netWorth.netWorthData
});

export default connect(mapStateToProps)(GoalPage);
