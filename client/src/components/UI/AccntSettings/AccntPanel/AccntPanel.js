import React, { useState } from 'react';
import classes from './AccntPanel.module.css';
import ChangePass from '../ChangePass';
import DeleteAccnt from '../DeleteAccnt';
import PanelContainer from '../../PanelContainer/PanelContainer';

const AccntPanel = props => {
  const [showChangePass, setShowChangePass] = useState(false);
  const [showDeleteAccnt, setShowDeleteAccnt] = useState(false);

  return (
    <>
    <PanelContainer show={props.show} close={props.close}>
      <div className={props.show ? classes.Container : classes.Hide}>
        <div className={classes.Link} onClick={props.logout}>Logout</div>
        <div className={classes.Link} onClick={() => setShowChangePass(true)}>Change my password</div>
        <div className={classes.Link} onClick={() => setShowDeleteAccnt(true)}>Delete account</div>
        <ChangePass show={showChangePass} close={() => setShowChangePass(false)} closeAll={props.close} />
        <DeleteAccnt show={showDeleteAccnt} close={() => setShowDeleteAccnt(false)} logout={props.logout} closeAll={props.close} />
      </div>
    </PanelContainer>
    <div className={showChangePass || showDeleteAccnt ? classes.Backdrop : classes.HideBackdrop}></div>
    </>
  );
};

export default AccntPanel;
