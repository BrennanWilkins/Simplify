import React from 'react';
import classes from './CloseBtn.module.css';
import { xIcon } from '../../UIIcons';

const CloseBtn = props => (
  <button className={classes.CloseBtn} onClick={props.close}>
    <span className={classes.Icon}>{xIcon}</span>
  </button>
);

export default CloseBtn;
