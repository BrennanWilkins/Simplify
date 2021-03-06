import React, { useState } from 'react';
import classes from './Inputs.module.css';
import { searchIcon } from '../UIIcons';

export const Input = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    spellCheck="false"
    value={props.val}
    onChange={e => props.change(e.target.value)}
    className={props.dark ? `${classes.Input} ${classes.Dark}` : props.dark2 ? `${classes.Input} ${classes.Dark2}` : classes.Input}
    placeholder={props.ph}
    tabIndex={props.noTab ? -1 : 0} />
));

export const PassInput = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    spellCheck="false"
    type="password"
    value={props.val}
    onChange={e => props.change(e.target.value)}
    placeholder={props.ph}
    className={props.dark2 ? `${classes.Input} ${classes.Dark2}` : classes.Input} />
));

export const NumInput = React.forwardRef((props, ref) => {
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
    <input
      ref={ref}
      spellCheck="false"
      value={props.val}
      onChange={changeHandler}
      className={props.dark ? `${classes.Input} ${classes.Dark}` : props.dark2 ? `${classes.Input} ${classes.Dark2}` : classes.Input}
      placeholder={props.ph}
      tabIndex={props.noTab ? -1 : 0} />
  );
});

export const DateInput = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    type="date"
    value={props.val}
    onChange={e => props.change(e.target.value)}
    className={props.dark2 ? `${classes.DateInput} ${classes.Dark2}` : classes.DateInput}
    tabIndex={props.noTab ? -1 : 0} />
));

export const SearchInput = React.forwardRef((props, ref) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={focused ? `${classes.SearchInput} ${classes.Focus}` : classes.SearchInput}>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={ref}
        spellCheck="false"
        value={props.val}
        onChange={e => props.change(e.target.value)}
        placeholder={props.ph}
        tabIndex={props.noTab ? -1 : 0} />
      <div onClick={props.submit}>{searchIcon}</div>
    </div>
  );
});
