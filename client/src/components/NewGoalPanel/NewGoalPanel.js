import React from 'react';
import classes from './NewGoalPanel.module.css';
import { NumInput, Input, DateInput } from '../UI/Inputs/Inputs';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { arrowRight } from '../UI/UIIcons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { v4 as uuid } from 'uuid';

class NewGoalPanel extends React.Component {
  state = {
    goalName: '',
    goalVal: '',
    goalDate: '',
    currPage: 1,
    hides: [1],
    err: false,
    errMsg: ''
  }

  constructor(props) {
    super(props);
    this.panel = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.show) {
      // if panel shown then add event listeners to close on outside click
      // and go to next page on enter key press
      document.addEventListener('mousedown', this.handleClick);
      document.addEventListener('keypress', this.handleKeyPress);
    }
    else {
      document.removeEventListener('mousedown', this.handleClick);
      document.removeEventListener('keypress', this.handleKeyPress);
    }
  }

  handleClick = e => {
    if (this.panel.current.contains(e.target)) { return; }
    this.closeHandler();
  }

  handleKeyPress = e => { if (e.key === 'Enter') { this.nextHandler(); } }

  closeHandler = () => {
    this.setState({ currPage: 1, goalName: '', goalVal: '', goalDate: '', hides: [1], err: false, errMsg: '' });
    this.props.close();
  }

  prevHandler = () => {
    // go to previous page
    if (this.state.currPage === 1) { return; }
    this.setState(prev => ({ currPage: prev.currPage - 1, hides: prev.hides.filter(hide => hide !== prev.currPage), err: false }));
  }

  nextHandler = () => {
    // close panel if next arrow closed on last page
    if (this.state.currPage === 4) { return this.createHandler(); }
    this.setState(prev => ({ currPage: prev.currPage + 1, hides: prev.hides.concat(prev.currPage) }));
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
    if (this.state.goalVal > 9999999999) {
      this.setState({ err: true, errMsg: 'Please enter a valid goal value.' });
      return false;
    }
    return true;
  }

  createHelper = goal => {
    this.props.addNewGoal(goal);
    this.props.addNotif('Goal created');
    this.closeHandler();
  }

  createHandler = () => {
    if (!this.isValid()) { return; }
    const goal = { name: this.state.goalName, goal: this.state.goalVal, date: this.state.goalDate, id: '', contributions: [], isComplete: false };
    if (this.props.isDemo) {
      // if in demo mode create id using uuid, if logged in then mongoDB id used
      goal.id = uuid();
      return this.createHelper(goal);
    }

  }

  render() {
    return (
      <div className={this.props.show ? classes.Panel : classes.HidePanel} ref={this.panel}>
        <CloseBtn close={this.closeHandler} />
        <div className={classes.Content}>
          <div className={this.state.currPage === 1 ? classes.Show : classes.HideLeft}>
            <h3>What is the name of your goal?</h3>
            <Input val={this.state.goalName} change={val => this.setState({ goalName: val })} noTab />
            <p className={classes.SubTitle}>Here are some ideas to inspire you</p>
            <div className={classes.Examples}>
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
          <div className={this.state.currPage === 2 ? classes.Show : (this.state.hides.includes(2) ? classes.HideLeft : classes.HideRight)}>
            <h3>What amount do you want to save?</h3>
            <NumInput val={this.state.goalVal} change={val => this.setState({ goalVal: val })} noTab />
          </div>
          <div className={this.state.currPage === 3 ? classes.Show : (this.state.hides.includes(3) ? classes.HideLeft : classes.HideRight)}>
            <h3>When do you want to reach your goal by? (optional)</h3>
            <DateInput val={this.state.goalDate} change={val => this.setState({ goalDate: val })} noTab />
          </div>
          <div className={this.state.currPage === 4 ? classes.Show : (this.state.hides.includes(4) ? classes.HideLeft : classes.HideRight)}>
            <p className={classes.P1}>It can help to keep the money for your goal in a separate place, like a different bank account.</p>
            <p>Whenever you add money to this account, you can add a contribution on the goals page.</p>
            <p className={this.state.err ? classes.ShowErrMsg : classes.HideErrMsg}>{this.state.errMsg}</p>
          </div>
        </div>
        <div className={classes.BtnsDiv}>
          <div className={this.state.currPage === 1 ? classes.DisPrevBtn : classes.PrevBtn} onClick={this.prevHandler}>
            <span className={classes.Icon}>{arrowRight}</span>
          </div>
          <div className={this.state.currPage === 4 ? classes.DisNextBtn : classes.NextBtn} onClick={this.nextHandler}>
            <span className={classes.Icon}>{arrowRight}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNewGoal: goal => dispatch(actions.addNewGoal(goal)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(null, mapDispatchToProps)(NewGoalPanel);
