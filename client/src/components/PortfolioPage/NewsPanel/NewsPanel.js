import React from 'react';
import classes from './NewsPanel.module.css';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';

const NewsPanel = props => {
  return (
    <React.Fragment>
      <div className={props.show ? classes.Backdrop : classes.HideBackdrop}></div>
      <PanelContainer show={props.show} close={props.close}>
        <div className={props.show ? classes.Panel : classes.HidePanel}>
        </div>
      </PanelContainer>
    </React.Fragment>
  );
};

export default NewsPanel;
