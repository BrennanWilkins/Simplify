import React from 'react';
import classes from './GreenBtn.module.css';

const GreenBtn = props => (
  <button className={props.big ? classes.BigBtn : classes.Btn} onClick={props.clicked}>{props.children}</button>
);

export default GreenBtn;
