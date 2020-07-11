import React, { useState, useRef, useEffect } from 'react';
import classes from './EditGoalPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { connect } from 'react-redux';
import { instance as axios } from '../../axios';
import * as actions from '../../store/actions/index';

const EditGoalPanel = props => {
  const panelRef = useRef();
  const [inputVal, setInputVal] = useState(props.goal);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  useEffect(() => {
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClick = (e) => {
    if (panelRef.current.contains(e.target)) { return; }
    closeHandler();
  };

  const closeHandler = () => {
    setInputVal(props.goal);
    setErr(false);
    setErrMsg('');
    props.close();
  };

  const editHandler = () => {
    if (inputVal === 0 || inputVal > 999999999999) { return; }
    if (props.isDemo) {
      props.setGoal(inputVal);
      return closeHandler();
    }
    axios.put('goals', { goal: inputVal }).then(res => {
      props.setGoal(inputVal);
      closeHandler();
    }).catch(err => {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  const deleteHandler = () => {
    if (props.isDemo) {
      props.setGoal(null);
      return closeHandler();
    }
    axios.delete('goals').then(res => {
      props.setGoal(null);
      closeHandler();
    }).catch(err => {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  const inputValHandler = (e) => {
    setErr(false);
    setErrMsg('');
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0' && val.charAt(1) !== '.') {
      val = val.slice(1);
    }
    if (val === '') { val = 0; }
    setInputVal(val);
  };

  return (
    <div ref={panelRef} className={props.mode === 'Edit' ? (props.show ? classes.EditPanel : classes.HideEditPanel) :
    (props.show ? classes.DeletePanel : classes.HideDeletePanel)}>
      <div className={classes.BtnDiv}><CloseBtn close={closeHandler} /></div>
      {props.mode === 'Edit' ? (
        <React.Fragment>
          <input className={classes.Input} value={inputVal} onChange={inputValHandler} />
          <div className={classes.BtnDiv2}>
            <button className={classes.Btn} onClick={editHandler}>Change</button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className={classes.Title}>Are you sure?</p>
          <div className={classes.BtnDiv2}>
            <button className={classes.Btn} onClick={deleteHandler}>Delete</button>
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
  setGoal: (goal) => dispatch(actions.setGoal(goal))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGoalPanel);
