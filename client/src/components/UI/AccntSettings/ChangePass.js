import React, { useState } from 'react';
import classes from './SettingsPanels.module.css';
import BlueBtn from '../Btns/BlueBtn/BlueBtn';
import { PassInput } from '../Inputs/Inputs';
import { instance as axios } from '../../../axios';
import CloseBtn from '../Btns/CloseBtn/CloseBtn';
import PanelContainer from '../PanelContainer/PanelContainer';
import { connect } from 'react-redux';
import { addNotif } from '../../../store/actions/index';

const ChangePass = props => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const closeHandler = () => {
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
    setErr(false);
    setErrMsg('');
    props.close();
  };

  const changeHandler = () => {
    if (oldPass === '' || newPass === '' || confirmPass === '') { return; }
    if (newPass !== confirmPass) { setErr(true); return setErrMsg('Confirm password must be the same as your new password.'); }
    axios.post('auth/changePassword', { oldPass, newPass, confirmPass }).then(res => {
      closeHandler();
      props.closeAll();
      props.addNotif('Password change successful');
    }).catch(err => {
      setErr(true);
      if (err.response) { setErrMsg(err.response.data.msg); }
      else { setErrMsg('There was an error connecting to the server.'); }
    });
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.show ? classes.Container : `${classes.Container} ${classes.Hide}`}>
        <div className={classes.Content}>
          <div style={{width: '100%'}}><CloseBtn close={closeHandler} /></div>
          <p className={classes.Title2}>Change my password</p>
          <PassInput val={oldPass} change={val => { setErr(false); setOldPass(val); }} ph="Current password" dark2={props.dark} />
          <PassInput val={newPass} change={val => { setErr(false); setNewPass(val); }} ph="New password" dark2={props.dark} />
          <PassInput val={confirmPass} change={val => { setErr(false); setConfirmPass(val); }} ph="Confirm password" dark2={props.dark} />
          <BlueBtn clicked={changeHandler}>Confirm</BlueBtn>
          <div className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</div>
        </div>
      </div>
    </PanelContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  addNotif: msg => dispatch(addNotif(msg))
});

export default connect(null, mapDispatchToProps)(ChangePass);
