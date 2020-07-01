import React from 'react';
import classes from './BackBtn.module.css';
import { arrowRight } from '../UIIcons';

const BackBtn = props => (
  <button className={props.mode === 'Hide' ? classes.Hide : classes.BackBtn} onClick={props.back}>
    <span>{arrowRight}</span>
  </button>
);

export default BackBtn;
