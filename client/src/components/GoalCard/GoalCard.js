import React, { useState, useEffect, useRef } from 'react';
import classes from './GoalCard.module.css';
import GoalBar from '../GoalBar/GoalBar';
import { formatNum } from '../../utils/formatNum';
import EditNWGoalPanel from '../EditNWGoalPanel/EditNWGoalPanel';
import DeletePanel from '../DeletePanel/DeletePanel';
import BlueBtn from '../UI/BlueBtn/BlueBtn';
import GreenBtn from '../UI/GreenBtn/GreenBtn';
import { plusIcon, chevronDownIcon, calendarIcon, checkMarkIcon2, minusIcon } from '../UI/UIIcons';
import EditGoalPanel from '../EditGoalPanel/EditGoalPanel';
import { calcNWRate, calcGoalRate } from '../../utils/rateCalcs';
import { instance as axios } from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ContribPanel from '../ContribPanel/ContribPanel';
import ContribChart from '../ContribChart/ContribChart';
import GoalExpand from '../GoalExpand/GoalExpand';

const GoalCard = props => {
  const [showMore, setShowMore] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAddContrib, setShowAddContrib] = useState(false);
  const [goalDate, setGoalDate] = useState('');
  const [reachDate, setReachDate] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const showMoreBtn = useRef();

  useEffect(() => {
    // set date that goal will be reached in state
    if (props.isNW) { setReachDate(calcNWRate(props.data, props.goal)); }
    else { setReachDate(calcGoalRate(props.contributions, props.goal, props.curr)); }
  }, [props.goal, props.data, props.contributions]);

  useEffect(() => {
    // show expanded net worth goal by default
    if (props.isNW) { setShowMore(true); }

    const updateWidth = () => { setWidth(window.innerWidth); setShowMore(false); };

    // add window resize listener
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    // get formatted date
    if (props.isNW || props.date === '') { return; }
    let date = (props.date).split('-');
    let m = date[1].charAt(0) === '0' ? date[1].slice(1) : date[1];
    let d = date[2].charAt(0) === '0' ? date[2].slice(1) : date[2];
    let y = date[0] === String(new Date().getFullYear()) ? date[0].slice(2) : date[0];
    setGoalDate([m, d, y].join('/'));
  }, [props.date]);

  const deleteNWHelper = () => {
    props.setNetWorthGoal(null);
    props.addNotif('Goal deleted');
    setShowDelete(false);
  };

  const deleteHelper = () => {
    props.deleteGoal(props.id);
    props.addNotif('Goal deleted');
    setShowDelete(false);
  };

  const deleteHandler = () => {
    if (props.isNW) {
      if (props.isDemo) { return deleteNWHelper(); }
      axios.delete('goals').then(res => { deleteNWHelper(); }).catch(err => { return; });
    } else {
      if (props.isDemo) { return deleteHelper(); }
    }
  };

  const completeHelper = () => {
    props.updateComplete(props.id);
    props.addNotif('Goal updated');
  };

  const completeHandler = () => {
    if (props.isDemo) { return completeHelper(); }
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
          <ContribChart data={props.contributions} blue={width > 795} />
          <ContribPanel show={showAddContrib} close={() => setShowAddContrib(false)} id={props.id} isDemo={props.isDemo} />
        </div>}
      <div className={classes.CurrRate}>{reachDate}</div>
      <div className={classes.BtnDiv}>
        <div className={classes.Btns}>
          <BlueBtn clicked={() => setShowEdit(true)}>Edit goal</BlueBtn>
          <BlueBtn clicked={() => setShowDelete(true)}>Delete goal</BlueBtn>
        </div>
        {props.isNW ?
          <EditNWGoalPanel show={showEdit} close={() => setShowEdit(false)} goal={props.goal} /> :
          <EditGoalPanel show={showEdit} close={() => setShowEdit(false)} id={props.id} />}
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
      <div className={classes.Card}>
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
      {width > 795 && <GoalExpand show={showMore} close={showHandler} hardClose={() => setShowMore(false)} isNW={props.isNW} title={props.name}>{moreContent}</GoalExpand>}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setNetWorthGoal: goal => dispatch(actions.setNetWorthGoal(goal)),
  addNotif: msg => dispatch(actions.addNotif(msg)),
  updateComplete: id => dispatch(actions.updateComplete(id)),
  deleteGoal: id => dispatch(actions.deleteGoal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalCard);
