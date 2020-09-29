import React from 'react';
import classes from './PortPanelContainer.module.css';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';

const PortPanelContainer = props => (
  <PanelContainer show={props.show} close={props.close}>
    <div className={props.big ?
      (props.show ? (props.down ? classes.BigDownPanel : classes.BigPanel) : classes.BigHide) :
      (props.show ? (props.down ? classes.DownPanel : classes.Panel) : classes.Hide)}
      style={!props.show ? { left: props.left } : null}>
      <div style={{width: '100%'}}><CloseBtn close={props.close} /></div>
      {props.children}
    </div>
  </PanelContainer>
);

export default PortPanelContainer;
