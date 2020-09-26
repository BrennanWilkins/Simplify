import React from 'react';
import classes from './TrashBtn.module.css';
import { trashIcon } from '../../UIIcons';

const TrashBtn = props => (
  <button className={props.dark ? classes.DarkBtn : classes.Btn} onClick={props.clicked}>{trashIcon}</button>
);

export default TrashBtn;
