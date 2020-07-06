import React, { useState } from 'react';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import SideNav from '../SideNav/SideNav';
import Title from '../UI/Title/Title';

const NavBar = props => {
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <div>
      <div className={classes.NavBar}>
        <div className={classes.LeftNavBar}>
          <div className={classes.SideToggle} onClick={() => setShowSideNav(true)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <Title />
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
        <div className={classes.LogoutLink} onClick={props.logout}>
          Logout
          <div className={classes.FocusBorder}></div>
        </div>
      </div>
      <div className={showSideNav ? classes.Backdrop : classes.HideBackdrop}></div>
      <SideNav show={showSideNav} close={() => setShowSideNav(false)} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(NavBar);
