import React from 'react';
import classes from './Title.module.css';
import { Link } from 'react-router-dom';

const Title = props => (
  <div>
    {props.auth ? (
      <div className={classes.AuthTitle}>
        <div className={classes.Bars}>
          <div className={classes.Bar1}></div>
          <div className={classes.Bar2}></div>
          <div className={classes.Bar3}></div>
          <div className={classes.Bar4}></div>
        </div>
        <h1>Simplify</h1>
      </div>
    ) : (
      <Link to="/" className={classes.Title}>
        <div className={classes.Bars}>
          <div className={classes.Bar1}></div>
          <div className={classes.Bar2}></div>
          <div className={classes.Bar3}></div>
          <div className={classes.Bar4}></div>
        </div>
        <h1>Simplify</h1>
      </Link>
    )}
  </div>
);

export default Title;
