import React, { useState, useEffect, useRef } from 'react';
import classes from './DeletePanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { Input } from '../UI/Inputs/Inputs';
import BlueBtn from '../UI/BlueBtn/BlueBtn';

const DeletePanel = props => {
  const panelRef = useRef();
  const [text, setText] = useState('');

  const deleteHandler = () => {
    // delete only if user types DELETE
    if (text === 'DELETE') {
      setText('');
      props.delete();
    }
  };

  useEffect(() => {
    const handleClick = e => {
      // close panel on click outside
      if (panelRef.current.contains(e.target)) { return; }
      props.close();
    };

    if (props.show) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  return (
    <div ref={panelRef} className={props.mode === 'goal' ? (props.show ? classes.GoalPanel : classes.HideDown) :
      (props.showUp ? (props.show ? classes.PanelUp : classes.HideUp) : (props.show ? classes.PanelDown : classes.HideDown))}>
      <div className={classes.CloseBtn}><CloseBtn close={props.close} /></div>
      <p className={classes.Title}>Please type 'DELETE' to delete your {props.mode}.</p>
      <div className={classes.Input}><Input val={text} change={val => setText(val)} /></div>
      <div className={classes.DeleteBtn}><BlueBtn clicked={deleteHandler}>Delete</BlueBtn></div>
    </div>
  );
};

export default DeletePanel;
