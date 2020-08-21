import React, { useRef, useEffect } from 'react';
import classes from './SideNav.module.css';
import { Link, withRouter } from 'react-router-dom';
import Title from '../UI/Title/Title';
import { questionIcon } from '../UI/UIIcons';

const SideNav = props => {
  const navRef = useRef();

  useEffect(() => {
    const handleClick = e => {
      // close side nav on outside click
      if (navRef.current.contains(e.target)) { return; }
      props.close();
    };

    if (props.show) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  return (
    <div ref={navRef} className={props.show ? classes.SideNav : classes.HideSideNav}>
      <Title />
      <Link className={props.location.pathname === '/portfolio' ? [classes.LinkActive, classes.Link].join(' ') : classes.Link} to="/portfolio" onClick={props.close}>
        Portfolio
        <div className={classes.FocusBorder}></div>
      </Link>
      <Link className={props.location.pathname === '/budget' ? [classes.LinkActive, classes.Link].join(' ') : classes.Link} to="/budget" onClick={props.close}>
        Budgeting
        <div className={classes.FocusBorder}></div>
      </Link>
      <Link className={props.location.pathname === '/plan' ? [classes.LinkActive, classes.Link].join(' ') : classes.Link} to="/plan" onClick={props.close}>
        Plan
        <div className={classes.FocusBorder}></div>
      </Link>
      <Link className={props.location.pathname === '/goals' ? [classes.LinkActive, classes.Link].join(' ') : classes.Link} to="/goals" onClick={props.close}>
        Goals
        <div className={classes.FocusBorder}></div>
      </Link>
      <div className={classes.Link} onClick={() => { props.close(); props.showHelpPanel(); }}>
        <span className={classes.QuestionIcon}>{questionIcon}</span>
        Help
        <div className={classes.FocusBorder}></div>
      </div>
      <div className={classes.LogoutLink} onClick={props.logout}>
        {props.demo ? 'Back to Login' : 'Logout'}
        <div className={classes.FocusBorder}></div>
      </div>
    </div>
  );
};

export default withRouter(SideNav);
