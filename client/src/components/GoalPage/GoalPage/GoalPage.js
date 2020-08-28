import React, { useState, useEffect } from 'react';
import classes from './GoalPage.module.css';
import { connect } from 'react-redux';
import NewGoalPanel from '../NewGoalPanel/NewGoalPanel';
import NewNWGoalPanel from '../NewNWGoalPanel/NewNWGoalPanel';
import { plusIcon } from '../../UI/UIIcons';
import GoalCard from '../GoalCard/GoalCard';
import { usePrevious } from '../../../utils/customHooks';

const GoalPage = props => {
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [showCreateNWGoal, setShowCreateNWGoal] = useState(false);
  const [filterMethod, setFilterMethod] = useState('All');
  const [goals, setGoals] = useState([...props.otherGoals]);
  const [showNWGoal, setShowNWGoal] = useState(true);
  const prevGoalLength = usePrevious(props.otherGoals.length);

  useEffect(() => {
    // update goals in state on props change
    setGoals([...props.otherGoals]);
    if (prevGoalLength === undefined) { return; }
    // set filter method to all when new goal added
    if (prevGoalLength + 1 === props.otherGoals.length) {
      setShowNWGoal(true);
      setFilterMethod('All');
    } else { filterHandler(filterMethod, true); }
  }, [props.otherGoals]);

  const filterHandler = (method, update) => {
    // don't filter if current method clicked & not updating state
    if (method === filterMethod && !update) { return; }
    // don't filter if no goals
    if (!props.netWorthGoal && props.otherGoals.length === 0) { return; }
    const NWGoalIsComplete = props.netWorthData[props.netWorthData.length - 1].value >= props.netWorthGoal;
    if (method === 'All') {
      setGoals([...props.otherGoals]);
      setShowNWGoal(true);
    } else if (method === 'Incomplete') {
      setGoals(props.otherGoals.filter(goal => !goal.isComplete));
      setShowNWGoal(!NWGoalIsComplete);
    } else {
      setGoals(props.otherGoals.filter(goal => goal.isComplete));
      setShowNWGoal(NWGoalIsComplete);
    }
    setFilterMethod(method);
  };

  return (
    <div className={classes.Container}>
      <div className={showCreateNWGoal ? `${classes.Content} ${classes.ExpandNW}` : showCreateGoal ? `${classes.Content} ${classes.ExpandGoal}` : classes.Content}>
        <div className={classes.SelectBar}>
          <button className={classes.Btn} onClick={() => setShowCreateGoal(true)}><span>{plusIcon}</span>Add a new goal</button>
          {!props.netWorthGoal && <button className={classes.Btn} onClick={() => setShowCreateNWGoal(true)}><span>{plusIcon}</span>Add a net worth goal</button>}
          <NewNWGoalPanel show={showCreateNWGoal} close={() => setShowCreateNWGoal(false)} isDemo={props.isDemo} />
          <NewGoalPanel show={showCreateGoal} close={() => setShowCreateGoal(false)} isDemo={props.isDemo} />
        </div>
        <div className={classes.SortBtns}>
          <div className={filterMethod === 'Incomplete' ? classes.Active : classes.Inactive} onClick={() => filterHandler('Incomplete')}>
            In Progress
            <div className={classes.FocusBorder}></div>
          </div>
          <div className={filterMethod === 'Complete' ? classes.Active : classes.Inactive} onClick={() => filterHandler('Complete')}>
            Completed
            <div className={classes.FocusBorder}></div>
          </div>
          <div className={filterMethod === 'All' ? classes.Active : classes.Inactive} onClick={() => filterHandler('All')}>
            All Goals
            <div className={classes.FocusBorder}></div>
          </div>
        </div>
        <div className={classes.Cards}>
          {props.netWorthGoal && showNWGoal &&
          <GoalCard isNW ind={1} key={props.otherGoals.length + filterMethod}
          curr={props.netWorthData.length === 0 ? '0.00' : props.netWorthData[props.netWorthData.length - 1].value}
          data={props.netWorthData}
          goal={props.netWorthGoal}
          isComplete={props.netWorthData[props.netWorthData.length - 1].value >= props.netWorthGoal}
          name="Net Worth Goal" />}
          {goals.map((goal, i) => (
            <GoalCard key={i + props.otherGoals.length + filterMethod} {...goal} ind={i + 2} curr={goal.contributions.reduce((tot, curr) => tot + Number(curr.val), 0)} />))}
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
