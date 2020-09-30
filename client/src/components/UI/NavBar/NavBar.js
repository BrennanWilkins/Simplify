import React, { useState, useEffect, Suspense } from 'react';
import classes from './NavBar.module.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import SideNav from '../SideNav/SideNav';
import Title from '../Title/Title';
import { questionIcon, personIcon2 } from '../UIIcons';
import AccntPanel from '../AccntSettings/AccntPanel/AccntPanel';
const HelpPanel = React.lazy(() => import('../HelpPanel/HelpPanel'));

const NavBar = props => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // auto shows help panel if in demo mode
    if (props.isDemo) { setShowHelp(true); }
  }, [props.isDemo]);

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
        <div className={classes.Title}><Title /></div>
        <Link className={props.location.pathname === '/portfolio' ? `${classes.LinkActive} ${classes.Link}` : classes.Link} to="/portfolio">
          Portfolio
          <div className={classes.FocusBorder}></div>
        </Link>
        <Link className={props.location.pathname === '/budget' ? `${classes.LinkActive} ${classes.Link}` : classes.Link} to="/budget">
          Budgeting
          <div className={classes.FocusBorder}></div>
        </Link>
        <Link className={props.location.pathname === '/plan' ? `${classes.LinkActive} ${classes.Link}` : classes.Link} to="/plan">
          Plan
          <div className={classes.FocusBorder}></div>
        </Link>
        <Link className={props.location.pathname === '/goals' ? `${classes.LinkActive} ${classes.Link}` : classes.Link} to="/goals">
          Goals
          <div className={classes.FocusBorder}></div>
        </Link>
        <div className={classes.Link} onClick={() => setShowHelp(true)}>
          <span className={classes.QuestionIcon}>{questionIcon}</span>
          Help
          <div className={classes.FocusBorder}></div>
        </div>
        <div className={`${classes.Link2} ${classes.AccntLink}`} onClick={() => setShowSettings(true)}>
          <span className={classes.PersonIcon}>{personIcon2}</span>
        </div>
      </div>
      <AccntPanel show={showSettings} close={() => setShowSettings(false)} logout={props.logout} isDemo={props.isDemo} />
      <div className={showSideNav ? classes.NavBackdrop : classes.HideNavBackdrop}></div>
      <div className={showHelp ? classes.HelpBackdrop : classes.HideHelpBackdrop}></div>
      <SideNav demo={props.isDemo} show={showSideNav} close={() => setShowSideNav(false)}
      showHelpPanel={() => setShowHelp(true)} logout={props.logout} />
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
