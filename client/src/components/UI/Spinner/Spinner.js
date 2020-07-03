import React from 'react';
import classes from './Spinner.module.css';

const Spinner = props => (
  <div className={props.mode === 'Login' ? classes.LoginLoader : props.mode === 'Signup' ? classes.SignupLoader : classes.Loader}></div>
);

export default Spinner;
