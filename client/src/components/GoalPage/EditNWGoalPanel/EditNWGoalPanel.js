import React, { useState, useEffect, useRef } from 'react';
import classes from './EditNWGoalPanel.module.css';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { connect } from 'react-redux';
import { instance as axios } from '../../../axios';
import * as actions from '../../../store/actions/index';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import { NumInput } from '../../UI/Inputs/Inputs';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import Form from '../../UI/Form/Form';

const EditNWGoalPanel = props => {
  const [inputVal, setInputVal] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const inputRef = useRef();

  useEffect(() => setInputVal(props.goal), [props.goal]);

  useEffect(() => {
    if (props.show) { inputRef.current.focus(); }
  }, [props.show]);

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

  const editHelper = () => {
    props.setNetWorthGoal(inputVal);
    props.addNotif('Goal updated');
    closeHandler();
  };

  const editHandler = () => {
    // validate input
    if (inputVal === 0 || inputVal === '' || inputVal > 999999999999) {
      setErr(true);
      return setErrMsg('Please enter a valid goal.');
    }
    if (props.isDemo) { return editHelper(); }
    axios.put('goals/netWorthGoal', { goal: inputVal }).then(res => { editHelper(); })
    .catch(err => { errHandler(true); });
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.show ? classes.Panel : classes.Hide}>
        <CloseBtn close={closeHandler} />
        <Form allow={props.show} submit={editHandler}>
          <div className={classes.Input}>
            <NumInput val={inputVal} change={val => { setErr(false); setInputVal(val); }} ref={inputRef} dark2={props.dark} />
          </div>
          <div className={classes.BtnDiv}>
            <GreenBtn isSubmit>Change</GreenBtn>
          </div>
        </Form>
        <p className={err ? classes.ShowErr : classes.HideErr} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>{errMsg}</p>
      </div>
    </PanelContainer>
  );
};

const mapStateToProps = state => ({
  isDemo: state.auth.isDemo,
  dark: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  setNetWorthGoal: goal => dispatch(actions.setNetWorthGoal(goal)),
  addNotif: msg => dispatch(actions.addNotif(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNWGoalPanel);
