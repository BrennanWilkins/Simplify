import React from 'react';
import classes from './SideToggle.module.css';
import Chart from '../../ChartSymbol/ChartSymbol';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const sideToggle = (props) => {
  let username = null;
  if (props.isAuthenticated) {
    username = 'Hello, ' + localStorage.getItem('username');
  }
  return (
    <div className={classes.SideDiv}>
      <div className={classes.SideToggle} onClick={props.toggleSideBar}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={classes.SideChart}><Link to="/"><Chart /></Link></div>
      <div>{username}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(sideToggle);
