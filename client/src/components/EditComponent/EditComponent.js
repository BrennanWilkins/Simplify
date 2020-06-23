import React from 'react';
import classes from './EditComponent.module.css';

const editComponent = (props) => {
  let errorMsg = props.error ? <p>{props.errorMsg}</p> : null;
  return (
    <div className={classes.EditDiv}>
      <p>How much {props.editable} did you {props.action}?</p>
      <div>
        <input type="text" onChange={props.editAmnt} value={props.amnt} style={{marginRight: '4px'}}></input>
        <button onClick={props.finishEdit.bind(this, true)} style={{marginRight: '4px'}}><strong>+</strong></button>
        <button onClick={props.finishEdit.bind(this, false)}><strong>x</strong></button>
      </div>
      {errorMsg}
    </div>
  );
};

export default editComponent;
