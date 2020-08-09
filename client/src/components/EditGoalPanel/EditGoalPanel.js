import React, { useState, useRef, useEffect } from 'react';
import classes from './EditGoalPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { connect } from 'react-redux';
import { instance as axios } from '../../axios';
import * as actions from '../../store/actions/index';
import GreenBtn from '../UI/GreenBtn/GreenBtn';
import { NumInput } from '../UI/Inputs/Inputs';

const EditGoalPanel = props => {
  const panelRef = useRef();
  const [inputVal, setInputVal] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (props.show) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  useEffect(() => {
    setInputVal(props.goal);
  }, [props.goal, props.show]);

  const handleClick = e => {
    // close panel on click outside
    if (panelRef.current.contains(e.target)) { return; }
    closeHandler();
  };

  const closeHandler = () => {
    setInputVal(props.goal);
    errHandler(false);
    props.close();
  };

  const errHandler = bool => {
    if (bool) {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    } else {
      setErr(false);
      setErrMsg('');
    }
  };

  const editHandler = () => {
    if (inputVal === 0 || inputVal > 999999999999) { return; }
    if (props.isDemo) {
      props.setGoal(inputVal);
      props.addNotif('Goal updated');
      return closeHandler();
    }
    axios.put('goals', { goal: inputVal }).then(res => {
      props.setGoal(inputVal);
      props.addNotif('Goal updated');
      closeHandler();
    }).catch(err => { errHandler(true); });
  };

  const deleteHandler = () => {
    if (props.isDemo) {
      props.setGoal(null);
      props.addNotif('Goal deleted');
      return closeHandler();
    }
    axios.delete('goals').then(res => {
      props.setGoal(null);
      props.addNotif('Goal deleted');
      closeHandler();
    }).catch(err => { errHandler(true); });
  };

  const inputValHandler = val => {
    errHandler(false);
    setInputVal(val);
  };

  return (
    <div ref={panelRef} className={props.mode === 'Edit' ? (props.show ? classes.EditPanel : classes.HideEditPanel) :
    (props.show ? classes.DeletePanel : classes.HideDeletePanel)}>
      <div className={classes.BtnDiv}><CloseBtn close={closeHandler} /></div>
      {props.mode === 'Edit' ? (
        <React.Fragment>
          <div className={classes.Input}><NumInput val={inputVal} change={inputValHandler} /></div>
          <div className={classes.BtnDiv2}>
            <GreenBtn clicked={editHandler}>Change</GreenBtn>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className={classes.Title}>Are you sure?</p>
          <div className={classes.BtnDiv2}>
            <GreenBtn clicked={deleteHandler}>Delete</GreenBtn>
          </div>
        </React.Fragment>
      )}
      <p className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  setGoal: goal => dispatch(actions.setGoal(goal)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGoalPanel);
