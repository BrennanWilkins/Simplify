import React from 'react';
import classes from './TrashBtn.module.css';
import { trashIcon } from '../../UIIcons';

const TrashBtn = props => (
  <button className={classes.Btn} onClick={props.clicked}>{trashIcon}</button>
);

export default TrashBtn;
