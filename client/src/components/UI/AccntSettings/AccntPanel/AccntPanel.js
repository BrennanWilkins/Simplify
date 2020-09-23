import React, { useState } from 'react';
import classes from './AccntPanel.module.css';
import ChangePass from '../ChangePass';
import DeleteAccnt from '../DeleteAccnt';
import Feedback from '../Feedback';
import PanelContainer from '../../PanelContainer/PanelContainer';
import { darkIcon, lightIcon } from '../../UIIcons';
import { connect } from 'react-redux';
import { toggleDarkMode } from '../../../../store/actions';

const AccntPanel = props => {
  const [showChangePass, setShowChangePass] = useState(false);
  const [showDeleteAccnt, setShowDeleteAccnt] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
    <PanelContainer show={props.show} close={props.close}>
      <div className={props.show ? classes.Container : classes.Hide}>
        <div className={classes.Link} onClick={props.logout}>{props.isDemo ? 'Back to Login' : 'Logout'}</div>
        <div className={classes.Link} onClick={() => setShowFeedback(true)}>Leave feedback</div>
        {!props.isDemo && <>
        <div className={classes.Link} onClick={() => setShowChangePass(true)}>Change my password</div>
        <div className={classes.Link} onClick={() => setShowDeleteAccnt(true)}>Delete account</div>
        <ChangePass show={showChangePass} close={() => setShowChangePass(false)} closeAll={props.close} />
        <DeleteAccnt show={showDeleteAccnt} close={() => setShowDeleteAccnt(false)} logout={props.logout} closeAll={props.close} /></>}
        <div className={classes.Link} style={{marginBottom: '15px'}} onClick={props.toggleDarkMode}>
          {!props.darkMode ?
          <span className={classes.Dark}>{darkIcon} Dark mode</span> :
          <span className={classes.Light}>{lightIcon} Light mode</span>}
        </div>
        <Feedback show={showFeedback} close={() => setShowFeedback(false)} closeAll={props.close} isDemo={props.isDemo} />
      </div>
    </PanelContainer>
    <div className={showChangePass || showDeleteAccnt ? classes.Backdrop : classes.HideBackdrop}></div>
    </>
  );
};

const mapStateToProps = state => ({
  darkMode: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  toggleDarkMode: () => dispatch(toggleDarkMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccntPanel);
