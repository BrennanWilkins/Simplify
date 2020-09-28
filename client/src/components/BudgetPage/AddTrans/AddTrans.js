import React, { useEffect, useRef } from 'react';
import classes from './AddTrans.module.css';
import { Input, NumInput } from '../../UI/Inputs/Inputs';
import BlueBtn from '../../UI/Btns/BlueBtn/BlueBtn';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import Form from '../../UI/Form/Form';

const AddTrans = props => {
  const descRef = useRef();

  useEffect(() => {
    if (props.show) { setTimeout(() => descRef.current.focus(), 300); }
  }, [props.show]);

  return (
    <PanelContainer close={props.close} show={props.show}>
      <Form allow={props.show} submit={props.confirm}>
        <div className={props.show ? classes.ShowAddTrans : classes.HideAddTrans}>
          <Input val={props.transDesc} change={props.changeDesc} ph="Transaction Description" ref={descRef} dark={props.darkMode} />
          <div className={classes.CostInput}><NumInput val={props.transCost} change={props.changeCost} ph="Cost" dark={props.darkMode} /></div>
          <div className={classes.ConfirmBtn}><BlueBtn big isSubmit>Add</BlueBtn></div>
        </div>
      </Form>
    </PanelContainer>
  );
};

export default AddTrans;
