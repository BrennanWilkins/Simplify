import React from 'react';
import classes from './BlueBtn.module.css';

const BlueBtn = props => (
  <button className={props.big ? classes.BigBtn : classes.Btn} onClick={props.clicked}>{props.children}</button>
);

export default BlueBtn;
