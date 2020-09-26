import React from 'react';
import classes from './NewGoalPanel.module.css';
import { NumInput, Input, DateInput } from '../../UI/Inputs/Inputs';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { arrowRight } from '../../UI/UIIcons';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { v4 as uuid } from 'uuid';
import { instance as axios } from '../../../axios';

class NewGoalPanel extends React.Component {
  state = {
    goalName: '',
    goalVal: '',
    goalDate: '',
    currPage: 1,
    err: false,
    errMsg: ''
  }

  constructor(props) {
    super(props);
    this.panel = React.createRef();
    this.nameInput = React.createRef();
    this.valInput = React.createRef();
    this.contentRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show && !prevProps.show) {
      // if panel shown then add listener to close on outside click
      document.addEventListener('mousedown', this.handleClick);
      // listener to go to next page on enter key press
      document.addEventListener('keypress', this.handleKeyPress);
      // listener for focusing input when scrolled to
      this.contentRef.current.addEventListener('scroll', this.handleFocus);

      this.nameInput.current.focus();
      this.contentRef.current.scrollLeft = 0;
    }
    if (!this.props.show && prevProps.show) {
      // remove listeners on panel close
      document.removeEventListener('mousedown', this.handleClick);
      document.removeEventListener('keypress', this.handleKeyPress);
      this.contentRef.current.removeEventListener('scroll', this.handleFocus);
    }
  }

  handleFocus = () => {
    let pos = this.contentRef.current.scrollLeft;
    if (pos === 0) { this.nameInput.current.focus(); }
    if (pos === 350) { this.valInput.current.focus(); }
  }

  handleClick = e => {
    if (this.panel.current.contains(e.target)) { return; }
    this.closeHandler();
  }

  handleKeyPress = e => { if (e.key === 'Enter') { this.nextHandler(true); } }

  closeHandler = () => {
    this.setState({ currPage: 1, goalName: '', goalVal: '', goalDate: '', err: false, errMsg: '' });
    this.contentRef.current.scrollLeft = 0;
    this.props.close();
  }

  prevHandler = () => {
    // go to previous page
    if (this.state.currPage === 1) { return; }
    this.setState(prev => ({ currPage: prev.currPage - 1, err: false }));
    this.contentRef.current.scrollTo({ left: 350 * (this.state.currPage - 2), behavior: 'smooth' });
  }

  nextHandler = isEnter => {
    // close panel if next arrow closed on last page
    if (this.state.currPage === 4) { return this.createHandler(); }
    this.setState(prev => ({ currPage: prev.currPage + 1 }));
    // if enter key pressed then dont over scroll
    if (isEnter) { this.contentRef.current.scrollTo({ left: 350 * (this.state.currPage - 1), behavior: 'smooth' }); }
    else { this.contentRef.current.scrollTo({ left: 350 * this.state.currPage, behavior: 'smooth' }); }
    this.nameInput.current.blur();
    this.valInput.current.blur();
  }

  isValid = () => {
    // check if all input fields are valid
    if (this.state.goalName === '') {
      this.setState({ err: true, errMsg: 'The goal name cannot be empty.' });
      return false;
    }
    if (this.state.goalName.length > 70) {
      this.setState({ err: true, errMsg: 'The goal name must be less than 70 characters.' });
      return false;
    }
    if (this.state.goalVal === '' || this.state.goalVal === 0) {
      this.setState({ err: true, errMsg: 'The goal value cannot be zero.' });
      return false;
    }
    if (this.state.goalVal > 999999999999) {
      this.setState({ err: true, errMsg: 'Please enter a valid goal value.' });
      return false;
    }
    return true;
  }

  createHelper = () => {
    this.props.addNotif('Goal created');
    this.closeHandler();
  }

  createHandler = () => {
    if (!this.isValid()) { return; }
    const goal = { name: this.state.goalName, goal: this.state.goalVal, date: this.state.goalDate, contributions: [], isComplete: false };
    if (this.props.isDemo) {
      // if in demo mode create id using uuid, if logged in then mongoDB id used
      goal._id = uuid();
      this.props.addNewGoal(goal);
      return this.createHelper();
    }
    axios.post('goals/otherGoals', { goal }).then(res => {
      this.props.setOtherGoals(res.data.goals);
      this.createHelper();
    }).catch(err => {
      this.setState({ err: true, errMsg: 'Error connecting to the server.' });
    });
  }

  render() {
    return (
      <div className={this.props.show ? classes.Panel : classes.HidePanel} ref={this.panel}>
        <CloseBtn close={this.closeHandler} />
        <div className={classes.Content} ref={this.contentRef} style={this.props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>
          <div className={classes.Page}>
            <h3>What is the name of your goal?</h3>
            <Input val={this.state.goalName} change={val => this.setState({ goalName: val })} noTab ref={this.nameInput} dark2={this.props.dark} />
            <p className={classes.SubTitle}>Here are some ideas to inspire you</p>
            <div className={this.props.dark ? `${classes.Examples} ${classes.DarkExamples}` : classes.Examples}>
              <p>Pay off credit card debt</p>
              <p>Create an emergency fund</p>
              <p>Buy a home</p>
              <p>Save for college</p>
              <p>Save for retirement</p>
              <p>Buy a new car</p>
              <p>Save for a vacation trip</p>
              <p>Pay off my loans</p>
            </div>
          </div>
          <div className={classes.Page}>
            <h3>What amount do you want to save?</h3>
            <NumInput val={this.state.goalVal} change={val => this.setState({ goalVal: val })} noTab ref={this.valInput} dark2={this.props.dark} />
          </div>
          <div className={classes.Page}>
            <h3>When do you want to reach your goal by? (optional)</h3>
            <DateInput val={this.state.goalDate} change={val => this.setState({ goalDate: val })} noTab dark2={this.props.dark} />
          </div>
          <div className={classes.Page}>
            <p className={classes.P1}>It can help to keep the money for your goal in a separate place, like a different bank account.</p>
            <p>Whenever you add money to this account, you can add a contribution on the goals page.</p>
            <p className={this.state.err ? classes.ShowErrMsg : classes.HideErrMsg}>{this.state.errMsg}</p>
          </div>
        </div>
        <div className={classes.BtnsDiv}>
          <div className={this.state.currPage === 1 ? classes.DisPrevBtn : classes.PrevBtn} onClick={this.prevHandler}>
            <span className={classes.Icon}>{arrowRight}</span>
          </div>
          <div className={this.state.currPage === 4 ? classes.DisNextBtn : classes.NextBtn} onClick={this.nextHandler.bind(this, false)}>
            <span className={classes.Icon}>{arrowRight}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dark: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  addNewGoal: goal => dispatch(actions.addNewGoal(goal)),
  addNotif: msg => dispatch(actions.addNotif(msg)),
  setOtherGoals: goals => dispatch(actions.setOtherGoals(goals))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGoalPanel);
