import React, { useRef, useEffect } from 'react';
import classes from './SideNav.module.css';
import { Link } from 'react-router-dom';
import Title from '../UI/Title/Title';
import { questionIcon } from '../UI/UIIcons';

const SideNav = props => {
  const navRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  useEffect(() => {
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClick = (e) => {
    // close side nav on outside click
    if (navRef.current.contains(e.target)) { return; }
    props.close();
  };

  return (
    <div ref={navRef} className={props.show ? classes.SideNav : classes.HideSideNav}>
      <Title />
      <Link className={classes.Link} to="/portfolio" onClick={props.close}>
        Portfolio
        <div className={classes.FocusBorder}></div>
      </Link>
      <Link className={classes.Link} to="/budget" onClick={props.close}>
        Budgeting
        <div className={classes.FocusBorder}></div>
      </Link>
      <Link className={classes.Link} to="/plan" onClick={props.close}>
        Plan
        <div className={classes.FocusBorder}></div>
      </Link>
      <Link className={classes.Link} to="/goals" onClick={props.close}>
        Goals
        <div className={classes.FocusBorder}></div>
      </Link>
      <div className={classes.Link} onClick={() => { props.close(); props.showHelpPanel(); }}>
        Help
        <span className={classes.QuestionIcon}>{questionIcon}</span>
        <div className={classes.FocusBorder}></div>
      </div>
      <div className={classes.LogoutLink} onClick={props.logout}>
        {props.demo ? 'Back to Login' : 'Logout'}
        <div className={classes.FocusBorder}></div>
      </div>
    </div>
  );
};

export default SideNav;
