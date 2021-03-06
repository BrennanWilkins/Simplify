import React, { useState, useEffect, useRef } from 'react';
import classes from './GoalCard.module.css';
import GoalBar from '../GoalBar/GoalBar';
import { formatNum } from '../../../utils/formatNum';
import { formatDate } from '../../../utils/formatDate';
import EditNWGoalPanel from '../EditNWGoalPanel/EditNWGoalPanel';
import DeletePanel from '../../UI/DeletePanel/DeletePanel';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import { plusIcon, chevronDownIcon, calendarIcon, checkMarkIcon2,
  minusIcon, pencilIcon, trashIcon } from '../../UI/UIIcons';
import EditGoalPanel from '../EditGoalPanel/EditGoalPanel';
import { calcNWRate, calcGoalRate } from '../../../utils/rateCalcs';
import { instance as axios } from '../../../axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import ContribPanel from '../ContribPanel/ContribPanel';
import GoalChart from '../GoalChart/GoalChart';
import GoalExpand from '../GoalExpand/GoalExpand';
import ContribTable from '../ContribTable/ContribTable';
import NWGoalChart from '../NWGoalChart/NWGoalChart';

const GoalCard = props => {
  const [showMore, setShowMore] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAddContrib, setShowAddContrib] = useState(false);
  const [goalDate, setGoalDate] = useState('');
  const [reachDate, setReachDate] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [showChart, setShowChart] = useState(false);
  const showMoreBtn = useRef();

  useEffect(() => {
    if (showMore) { setShowChart(true); }
    else { setTimeout(() => setShowChart(false), 500); }
  }, [showMore]);

  useEffect(() => {
    // set date that goal will be reached in state
    if (props.isNW) { setReachDate(calcNWRate(props.data, props.goal)); }
    else { setReachDate(calcGoalRate(props.contributions, props.goal, props.curr)); }
  }, [props.goal, props.data, props.contributions, props.isNW, props.curr]);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
      setShowMore(false);
      setShowEdit(false);
      setShowDelete(false);
    };

    // add window resize listener
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    // get formatted date
    if (props.isNW || props.date === '') { return; }
    setGoalDate(formatDate(props.date));
  }, [props.date, props.isNW]);

  const deleteNWHelper = () => {
    props.setNetWorthGoal(null);
    props.addNotif('Goal deleted');
    setShowDelete(false);
    setShowMore(false);
  };

  const deleteHelper = () => {
    props.addNotif('Goal deleted');
    setShowDelete(false);
    setShowMore(false);
  };

  const deleteHandler = () => {
    if (props.isNW) {
      // delete net worth goal
      if (props.isDemo) { return deleteNWHelper(); }
      axios.delete('goals/netWorthGoal').then(res => { deleteNWHelper(); }).catch(err => { return; });
    } else {
      // delete other goal
      if (props.isDemo) {
        props.deleteGoal(props._id);
        return deleteHelper();
      }
      axios.delete('goals/otherGoals/' + props._id).then(res => {
        props.setOtherGoals(res.data.goals);
        deleteHelper();
      }).catch(err => { return; });
    }
  };

  const completeHelper = () => {
    // props.updateComplete(props._id);
    props.addNotif('Goal updated');
  };

  const completeHandler = () => {
    if (props.isDemo) {
      props.updateComplete(props._id);
      return completeHelper();
    }
    axios.put('goals/otherGoals/updateComplete', { _id: props._id }).then(res => {
      props.setOtherGoals(res.data.goals);
      completeHelper();
    }).catch(err => { return; });
  };

  const showHandler = target => {
    // dont close show more panel if show less btn clicked
    // or if window viewport width <796px
    if (showMoreBtn.current.contains(target) || window.innerWidth < 796) { return; }
    setShowMore(false);
  };

  // more content shown on left if viewport width is >796px, else expands the card
  const moreContent = (
    <React.Fragment>
      {!props.isNW &&
        <div className={classes.Contribs}>
          <div className={classes.AddContribBtn}>
            <GreenBtn clicked={() => setShowAddContrib(true)}>
              <span className={classes.PlusIcon}>{plusIcon}</span>Add a contribution
            </GreenBtn>
          </div>
          {showChart && <GoalChart data={props.contributions} blue={width > 795 && !props.darkMode} expandDark={width > 795 && props.darkMode} darkMode={props.darkMode} />}
          <ContribPanel show={showAddContrib} close={() => setShowAddContrib(false)} _id={props._id} isDemo={props.isDemo} />
        </div>}
      <div className={props.darkMode ? `${classes.CurrRate} ${classes.DarkCurrRate}` : classes.CurrRate}>{reachDate}</div>
      {props.isNW && showChart && <NWGoalChart darkMode={props.darkMode} expanded={width > 795} />}
      {!props.isNW && <ContribTable data={props.contributions} darkMode={props.darkMode} />}
      <div className={classes.BtnDiv}>
        <div className={classes.Btns}>
          <BlueBtn clicked={() => setShowEdit(true)}>{pencilIcon}Edit goal</BlueBtn>
          <BlueBtn clicked={() => setShowDelete(true)}>{trashIcon}Delete goal</BlueBtn>
        </div>
        {props.isNW ?
          <EditNWGoalPanel show={showEdit} close={() => setShowEdit(false)} goal={props.goal} /> :
          <EditGoalPanel show={showEdit} close={() => setShowEdit(false)} _id={props._id} />}
        <DeletePanel showUp={true} show={showDelete} mode="goal" close={() => setShowDelete(false)} delete={deleteHandler} />
      </div>
      {!props.isNW &&
        <div className={classes.CompleteBtn}>
          <GreenBtn clicked={completeHandler}>{props.isComplete ? 'Mark as incomplete' : 'Mark as complete'}</GreenBtn>
        </div>}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className={props.darkMode ? `${classes.Card} ${classes.Dark}` : classes.Card} style={{ animationDelay: `${150 * props.ind}ms` }}>
        <div className={classes.CheckMark}>{props.isComplete && <span>{checkMarkIcon2}</span>}</div>
        <h2 className={classes.Title}>{props.name}</h2>
        <h2 className={classes.Title2}>
          <span className={classes.Curr}>${formatNum(props.curr)}</span>
          <span className={classes.Goal}> of ${formatNum(props.goal)}</span>
        </h2>
        <GoalBar goal={props.goal} curr={props.curr} />
        {props.isNW || props.date === '' ? <div className={classes.DateDiv}></div> :
        <div className={classes.DateDiv}>
          Target date <span className={classes.Date}><span>{calendarIcon}</span>{goalDate}</span>
        </div>}
        {width < 796 && <div className={showMore ? classes.ShowMoreContent : classes.HideMoreContent}>{moreContent}</div>}
        <div className={classes.ShowBtn} onClick={() => setShowMore(prev => !prev)} ref={showMoreBtn}>
          {width < 796 ? <span className={showMore ? classes.IconUp : classes.IconDown}>{chevronDownIcon}</span> :
          <span className={classes.ExpandIcons}>{showMore ? minusIcon : plusIcon}</span>}
          {showMore ? 'Show Less' : 'Show More'}
        </div>
        <div className={(showEdit || showDelete || showAddContrib) ? classes.Backdrop : classes.HideBackdrop}></div>
      </div>
      {width > 795 && <GoalExpand show={showMore} close={showHandler} darkMode={props.darkMode}
      hardClose={() => setShowMore(false)} isNW={props.isNW} title={props.name}>{moreContent}</GoalExpand>}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo,
  darkMode: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  setNetWorthGoal: goal => dispatch(actions.setNetWorthGoal(goal)),
  addNotif: msg => dispatch(actions.addNotif(msg)),
  updateComplete: id => dispatch(actions.updateComplete(id)),
  deleteGoal: id => dispatch(actions.deleteGoal(id)),
  setOtherGoals: goals => dispatch(actions.setOtherGoals(goals))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalCard);
