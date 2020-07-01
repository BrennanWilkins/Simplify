import React from 'react';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';
import Chart from '../UI/ChartSymbol/ChartSymbol';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const NavBar = props => (
  <div className={classes.NavBar}>
    <Link className={classes.Title} to="/">
      <Chart />
      <h1>Simplify</h1>
    </Link>
    <Link className={classes.Link} to="/portfolio">
      Portfolio
      <div className={classes.FocusBorder}></div>
    </Link>
    <Link className={classes.Link} to="/budget">
      Budgeting
      <div className={classes.FocusBorder}></div>
    </Link>
    <Link className={classes.Link} to="/plan">
      Plan
      <div className={classes.FocusBorder}></div>
    </Link>
    <Link className={classes.Link} to="/goals">
      Goals
      <div className={classes.FocusBorder}></div>
    </Link>
    <div className={classes.Link} onClick={props.logout}>
      Logout
      <div className={classes.FocusBorder}></div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(NavBar);
