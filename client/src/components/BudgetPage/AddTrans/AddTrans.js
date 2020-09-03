import React, { useEffect, useRef } from 'react';
import classes from './AddTrans.module.css';
import { Input, NumInput } from '../../UI/Inputs/Inputs';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';

const AddTrans = props => {
  const descRef = useRef();

  useEffect(() => {
    if (props.show) { setTimeout(() => descRef.current.focus(), 300); }
  }, [props.show]);

  return (
    <PanelContainer close={props.close} show={props.show}>
      <div className={props.show ? classes.ShowAddTrans : classes.HideAddTrans}>
        <Input val={props.transDesc} change={props.changeDesc} ph="Transaction Description" ref={descRef} />
        <div className={classes.CostInput}><NumInput val={props.transCost} change={props.changeCost} ph="Cost" /></div>
        <div className={classes.ConfirmBtn}><BlueBtn big clicked={props.confirm}>Add</BlueBtn></div>
      </div>
    </PanelContainer>
  );
};

export default AddTrans;
