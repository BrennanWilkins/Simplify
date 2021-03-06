import React from 'react';
import classes from './SideNav.module.css';
import { Link, withRouter } from 'react-router-dom';
import Title from '../Title/Title';
import { questionIcon } from '../UIIcons';
import PanelContainer from '../PanelContainer/PanelContainer';

const SideNav = props => (
  <PanelContainer show={props.show} close={props.close}>
    <div className={props.show ? classes.SideNav : classes.HideSideNav}>
      <div onClick={props.close}><Title /></div>
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
      <div className={classes.Link} onClick={props.logout}>
        {props.demo ? 'Back to Login' : 'Logout'}
        <div className={classes.FocusBorder}></div>
      </div>
    </div>
  </PanelContainer>
);

export default withRouter(SideNav);
