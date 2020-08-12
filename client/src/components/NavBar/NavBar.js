import React, { useState, useEffect, Suspense } from 'react';
import classes from './NavBar.module.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import SideNav from '../SideNav/SideNav';
import Title from '../UI/Title/Title';
import { questionIcon } from '../UI/UIIcons';
const HelpPanel = React.lazy(() => import('../HelpPanel/HelpPanel'));

const NavBar = props => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // auto shows help panel if in demo mode
    if (props.isDemo) { setShowHelp(true); }
  }, []);

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
        <Link className={props.location.pathname === '/portfolio' ? [classes.LinkActive, classes.Link].join(' ') : classes.Link} to="/portfolio">
          Portfolio
          <div className={classes.FocusBorder}></div>
        </Link>
        <Link className={props.location.pathname === '/budget' ? [classes.LinkActive, classes.Link].join(' ') : classes.Link} to="/budget">
          Budgeting
          <div className={classes.FocusBorder}></div>
        </Link>
        <Link className={props.location.pathname === '/plan' ? [classes.LinkActive, classes.Link].join(' ') : classes.Link} to="/plan">
          Plan
          <div className={classes.FocusBorder}></div>
        </Link>
        <Link className={props.location.pathname === '/goals' ? [classes.LinkActive, classes.Link].join(' ') : classes.Link} to="/goals">
          Goals
          <div className={classes.FocusBorder}></div>
        </Link>
        <div className={classes.Link} onClick={() => setShowHelp(true)}>
          <span className={classes.QuestionIcon}>{questionIcon}</span>
          Help
          <div className={classes.FocusBorder}></div>
        </div>
        <div className={classes.LogoutLink} onClick={props.logout}>
          {props.isDemo ? 'Login' : 'Logout'}
          <div className={classes.FocusBorder}></div>
        </div>
      </div>
      <div className={showSideNav || showHelp ? classes.Backdrop : classes.HideBackdrop}></div>
      <SideNav demo={props.isDemo} show={showSideNav} close={() => setShowSideNav(false)} showHelpPanel={() => setShowHelp(true)} />
      <Suspense fallback=""><HelpPanel show={showHelp} close={() => setShowHelp(false)} /></Suspense>
    </div>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
