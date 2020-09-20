import React, { useState, useEffect } from 'react';
import classes from './AuthPanel.module.css';
import Spinner from '../../UI/Spinner/Spinner';
import { personIcon, lockIcon, arrowRight } from '../../UI/UIIcons';
import { Link } from 'react-router-dom';
import { validate } from '../../../utils/authValidation';
import { authInstance as axios, instance } from '../../../axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { calcPortfolioValue, calcNetWorth } from '../../../utils/valueCalcs';
import Title from '../../UI/Title/Title';

const AuthPanel = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [focused, setFocus] = useState('');

  useEffect(() => {
    if (props.loading) {
      setErr(true);
      setErrMsg('Retrieving current stock prices...');
    }
  }, [props.loading]);

  useEffect(() => {
    if (props.error) {
      setErr(true);
      setErrMsg('There was an error logging in.');
    }
  }, [props.error]);

  useEffect(() => {
    if (props.demoError) {
      setErr(true);
      setErrMsg('There was an error loading the demo account.');
    }
  }, [props.demoError]);

  const showErr = msg => {
    setErr(true);
    setLoading(false);
    setErrMsg(msg);
  };

  // submit request on 'Enter' press
  const keyPressHandler = e => { if (e.key === 'Enter') { submitHandler(); } }

  const submitHandler = () => {
    if (loading || props.loading) { return; }
    const res = props.mode === 'Login' ? validate(email, password, password) :
    validate(email, password, confPass);
    setErrMsg(res);
    // if validate returned err then set err false, else true
    res === '' ? setErr(false) : setErr(true);
    if (res !== '') { return; }
    if (props.mode === 'Login') { return loginHandler(); }
    signupHandler();
  };

  const loginHandler = () => {
    setLoading(true);
    setErr(true);
    setErrMsg('Retrieving current stock prices...');
    axios.post('login', { email, password, remember }).then(res => {
      successHandler(res.data);
    }).catch(err => {
      if (err.response) { return showErr(err.response.data.msg); }
      showErr('There was an error logging in.');
    });
  };

  const signupHandler = () => {
    setLoading(true);
    axios.post('signup', { email, password, confirmPassword: confPass, remember })
    .then(res => {
      successHandler(res.data);
    }).catch(err => {
      if (err.response) { return showErr(err.response.data.msg); }
      showErr('There was an error signing up.');
    });
  };

  const successHandler = data => {
    instance.defaults.headers.common['x-auth-token'] = data.token;
    if (remember) {
      localStorage['token'] = data.token;
      // token expires in 7 days
      localStorage['expirationDate'] = new Date(new Date().getTime() + 604800000);
      localStorage['expirationTime'] = '604800000';
    } else {
      // token expires in 1hr
      localStorage['token'] = data.token;
      localStorage['expirationDate'] = new Date(new Date().getTime() + 3600000);
      localStorage['expirationTime'] = '3600000';
    }
    const updatedNetWorth = calcNetWorth(data.netWorth.dataPoints, data.portfolio);
    if (props.mode === 'Login') {
      instance.put('netWorth', { netWorthData: updatedNetWorth }).then(res => {
        props.setNetWorthData(res.data.result.dataPoints);
      }).catch(err => { return showErr('There was an error logging in.'); });
      const NWGoal = Number(data.goals.netWorthGoal);
      if (NWGoal === 0) { props.setNetWorthGoal(null); }
      else { props.setNetWorthGoal(NWGoal); }
      props.setOtherGoals(data.goals.otherGoals);
    } else {
      props.setNetWorthData(data.netWorth.dataPoints);
    }
    props.setPortfolio(calcPortfolioValue(data.portfolio));
    if (data.budgets) { props.setBudget(data.budgets); }
    reset();
    props.login();
  };

  const reset = () => {
    setErr(false);
    setErrMsg('');
    setEmail('');
    setPassword('');
    setConfPass('');
    setRemember(false);
    setLoading(false);
    props.endLoading();
  };

  return (
    <div className={classes.Container}>
      <div className={classes.OuterContent}>
        <div className={props.mode === 'Login' ? classes.LoginPanel : classes.SignupPanel}>
          {(loading || props.loading) && <Spinner mode={props.mode} />}
          <div className={classes.Content}>
            <div className={classes.Demo} onClick={() => { reset(); props.loadDemo(); }}>View a demo account<span>{arrowRight}</span></div>
            <Title auth />
            <p className={classes.SubTitle}>Simplify your finances with financial trackers and visualization tools</p>
            <div className={focused === '1' ? classes.InputDivFocus : classes.InputDiv}>
              <span className={classes.Icon}>{personIcon}</span>
              <input onFocus={() => setFocus('1')} onBlur={() => setFocus('')}
                value={email}
                placeholder="Email"
                spellCheck="false"
                onChange={(e) => { setEmail(e.target.value); setErr(false); }}
                onKeyDown={keyPressHandler} />
            </div>
            <div className={focused === '2' ? classes.InputDivFocus : classes.InputDiv}>
              <span className={classes.Icon}>{lockIcon}</span>
              <input onFocus={() => setFocus('2')} onBlur={() => setFocus('')}
                type="password"
                value={password}
                placeholder="Password"
                spellCheck="false"
                onChange={(e) => { setPassword(e.target.value); setErr(false); }}
                onKeyDown={keyPressHandler} />
            </div>
            {props.mode === 'Signup' &&
              <div className={focused === '3' ? classes.InputDivFocus : classes.InputDiv}>
                <span className={classes.Icon}>{lockIcon}</span>
                <input onFocus={() => setFocus('3')} onBlur={() => setFocus('')}
                  type="password"
                  value={confPass}
                  placeholder="Confirm Password"
                  spellCheck="false"
                  onChange={(e) => { setConfPass(e.target.value); setErr(false); }}
                  onKeyDown={keyPressHandler} />
              </div>
            }
            <div className={classes.Remember}>
              <input type="checkbox" onChange={() => setRemember(prev => !prev)} checked={remember}/>
              <span>Remember me</span>
            </div>
            <div className={classes.ErrDiv}>
              <span className={err ? classes.ErrMsgShow : classes.ErrMsgHide}>
                {errMsg}
              </span>
            </div>
            <button onClick={submitHandler}>
              {props.mode === 'Login' ? 'Log in' : 'Sign up'}
            </button>
            <div className={classes.SwitchAuth}>
              {props.mode === 'Login' ?
                <span>Not registered?<Link onClick={reset} to="/signup">Signup</Link></span> :
                <span>Already registered?<Link onClick={reset} to="/login">Login</Link></span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  demoError: state.auth.demoError
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(actions.login()),
  setNetWorthData: data => dispatch(actions.setNetWorthData(data)),
  setPortfolio: data => dispatch(actions.setPortfolio(data)),
  setNetWorthGoal: goal => dispatch(actions.setNetWorthGoal(goal)),
  setBudget: budget => dispatch(actions.setBudget(budget)),
  loadDemo: () => dispatch(actions.loadDemo()),
  setOtherGoals: goals => dispatch(actions.setOtherGoals(goals)),
  endLoading: () => dispatch(actions.endLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel);
