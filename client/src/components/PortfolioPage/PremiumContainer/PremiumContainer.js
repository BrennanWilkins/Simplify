import React from 'react';
import classes from './PremiumContainer.module.css';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { PassInput } from '../../UI/Inputs/Inputs';

const PremiumContainer = props => (
  <React.Fragment>
    <div className={props.show ? classes.Backdrop : classes.HideBackdrop}></div>
    <PanelContainer show={props.show} close={props.close}>
      <div className={props.show ? classes.Panel : `${classes.Panel} ${classes.HidePanel}`}>
        <div className={classes.CloseBtn}><CloseBtn close={props.close} /></div>
        <div className={props.isAuth ? classes.AuthTitle : classes.Title}>{props.title}</div>
        {!props.isAuth && <><div className={classes.InputText}>You must be logged in or have an access code to access this feature</div>
        <div className={props.codeInvalid ? `${classes.AccessInput} ${classes.RedInput}` : classes.AccessInput}>
          <PassInput val={props.accessCode} change={props.accessHandler} ph="Access Code" />
        </div></>}
        <div className={classes.Content}>{props.children}</div>
      </div>
    </PanelContainer>
  </React.Fragment>
);

export default PremiumContainer;
