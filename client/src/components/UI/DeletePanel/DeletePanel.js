import React, { useState, useRef, useEffect } from 'react';
import classes from './DeletePanel.module.css';
import CloseBtn from '../Btns/CloseBtn/CloseBtn';
import { Input } from '../Inputs/Inputs';
import BlueBtn from '../Btns/BlueBtn/BlueBtn';
import PanelContainer from '../PanelContainer/PanelContainer';

const DeletePanel = props => {
  const [text, setText] = useState('');
  const inputRef = useRef();

  useEffect(() => { if (props.show) { inputRef.current.focus(); } }, [props.show]);

  const deleteHandler = () => {
    // delete only if user types DELETE
    if (text === 'DELETE') {
      setText('');
      props.delete();
    }
  };

  return (
    <PanelContainer show={props.show} close={props.close}>
      <div className={props.mode === 'goal' ? (props.show ? classes.GoalPanel : classes.HideDown) :
        (props.showUp ? (props.show ? classes.PanelUp : classes.HideUp) : (props.show ? classes.PanelDown : classes.HideDown))}>
        <div className={classes.CloseBtn}><CloseBtn close={props.close} /></div>
        <p className={classes.Title}>Please type 'DELETE' to delete your {props.mode}.</p>
        <div className={classes.Input}><Input val={text} change={val => setText(val)} ref={inputRef} /></div>
        <div className={classes.DeleteBtn}><BlueBtn clicked={deleteHandler}>Delete</BlueBtn></div>
      </div>
    </PanelContainer>
  );
};

export default DeletePanel;
