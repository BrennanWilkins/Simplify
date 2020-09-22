import React, { useState } from 'react';
import classes from './SettingsPanels.module.css';
import { instance as axios } from '../../../axios';
import { Input } from '../Inputs/Inputs';
import CloseBtn from '../Btns/CloseBtn/CloseBtn';
import PanelContainer from '../PanelContainer/PanelContainer';
import BlueBtn from '../Btns/BlueBtn/BlueBtn';

const DeleteAccnt = props => {
  const [err, setErr] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const closeHandler = () => {
    setErr(false);
    setInputVal('');
    props.close();
  };

  const deleteHandler = () => {
    if (inputVal !== 'DELETE MY ACCOUNT') { return; }
    axios.post('auth/deleteAccount').then(res => {
      props.logout();
    }).catch(err => { setErr(true); });
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.show ? classes.Container : `${classes.Container} ${classes.Hide}`}>
        <div className={classes.Content}>
          <div style={{width: '100%'}}><CloseBtn close={closeHandler} /></div>
          <p className={classes.Title1}>To delete your account, type 'DELETE MY ACCOUNT' below.</p>
          <Input val={inputVal} change={val => setInputVal(val)} />
          <div className={classes.Btn}><BlueBtn clicked={deleteHandler}>DELETE</BlueBtn></div>
          <div className={err ? classes.ShowErr : classes.HideErr}>There was an error connecting to the server.</div>
        </div>
      </div>
    </PanelContainer>
  );
};

export default DeleteAccnt;
