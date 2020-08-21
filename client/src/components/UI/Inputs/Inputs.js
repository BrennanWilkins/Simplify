import React from 'react';
import classes from './Inputs.module.css';

export const Input = props => (
  <input value={props.val} onChange={e => props.change(e.target.value)} className={classes.Input} placeholder={props.ph} tabIndex={props.noTab ? -1 : 0} />
);

export const NumInput = props => {
  const changeHandler = e => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    props.change(val);
  };

  return (
    <input value={props.val} onChange={changeHandler} className={classes.Input} placeholder={props.ph} tabIndex={props.noTab ? -1 : 0} />
  );
};

export const DateInput = props => (
  <input type="date" value={props.val} onChange={e => props.change(e.target.value)} className={classes.DateInput} tabIndex={props.noTab ? -1 : 0} />
);
