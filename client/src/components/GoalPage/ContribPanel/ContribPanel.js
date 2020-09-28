import React, { useState, useEffect, useRef } from 'react';
import classes from './ContribPanel.module.css';
import { DateInput, NumInput } from '../../UI/Inputs/Inputs';
import GreenBtn from '../../UI/Btns/GreenBtn/GreenBtn';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { instance as axios } from '../../../axios';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import { formatDate2 } from '../../../utils/formatDate';
import Form from '../../UI/Form/Form';

const ContribPanel = props => {
  const [contribVal, setContribVal] = useState('');
  const [contribDate, setContribDate] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const valRef = useRef();

  useEffect(() => {
    if (props.show) {
      // get todays date in correct format
      setContribDate(formatDate2(new Date()));

      valRef.current.focus();
    }
  }, [props.show]);

  const closeHandler = () => {
    setContribVal('');
    setContribDate('');
    setErr(false);
    setErrMsg('');
    props.close();
  };

  const addHelper = () => {
    props.addNotif('Contribution added');
    closeHandler();
  };

  const addHandler = () => {
    // validate inputs
    if (contribVal === 0 || contribVal === '' || contribDate === '' || contribVal > 999999999) {
      setErr(true);
      return setErrMsg('Please enter a valid value.');
    }
    const contrib = { val: String(contribVal), date: contribDate };
    if (props.isDemo) {
      props.addContrib(contrib, props._id);
      return addHelper();
    }
    axios.put('goals/otherGoals/addContrib', { contrib, _id: props._id }).then(res => {
      props.setOtherGoals(res.data.goals);
      addHelper();
    }).catch(err => {
      setErr(true);
      setErrMsg('Error connecting to the server.');
    });
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.show ? classes.Panel : classes.Hide}>
        <CloseBtn close={closeHandler} />
        <Form allow={props.show} submit={addHandler}>
          <div className={classes.Inputs} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>
            <div>Value <NumInput val={contribVal} change={val => { setErr(false); setContribVal(val); }} ref={valRef} dark2={props.dark} /></div>
            <div className={classes.DateInput}>Date <DateInput val={contribDate} change={val => { setErr(false); setContribDate(val); }} dark2={props.dark} /></div>
          </div>
          <div className={classes.AddBtn}><GreenBtn isSubmit>Add</GreenBtn></div>
        </Form>
        <p className={err ? classes.ShowErr : classes.HideErr} style={props.dark ? {color: 'rgb(var(--light-blue3))'} : null}>{errMsg}</p>
      </div>
    </PanelContainer>
  );
};

const mapStateToProps = state => ({
  dark: state.theme.darkMode
});

const mapDispatchToProps = dispatch => ({
  addNotif: msg => dispatch(actions.addNotif(msg)),
  addContrib: (contrib, id) => dispatch(actions.addContrib(contrib, id)),
  setOtherGoals: goals => dispatch(actions.setOtherGoals(goals))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContribPanel);
