import React, { useState } from 'react';
import classes from './AuthPanel.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { personIcon, lockIcon, arrowRight } from '../../components/UI/UIIcons';
import { Link } from 'react-router-dom';
import { validate } from '../../utils/authValidation';
import ChartSymbol from '../../components/UI/ChartSymbol/ChartSymbol';
import { authInstance as axios, instance } from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { calcPortfolioValue, calcNetWorth } from '../../utils/valueCalcs';

const AuthPanel = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [focused, setFocus] = useState('');

  const showErr = (msg) => {
    setErr(true);
    setLoading(false);
    setErrMsg(msg);
  };

  const submitHandler = () => {
    if (loading) { return; }
    const res = props.mode === 'Login' ? validate(email, password, password) :
    validate(email, password, confPass);
    setErrMsg(res);
    res === '' ? setErr(false) : setErr(true);
    if (res !== '') { return; }
    if (props.mode === 'Login') { return loginHandler(); }
    signupHandler();
  };

  const loginHandler = () => {
    setLoading(true);
    axios.post('login', { email, password, remember }).then(res => {
      successHandler(res.data);
    }).catch(err => {
      if (err.response) { return showErr(err.response.data.msg); }
      showErr('Error logging in.');
    });
  };

  const signupHandler = () => {
    setLoading(true);
    axios.post('signup', { email, password, confirmPassword: confPass, remember }).then(res => {
      successHandler(res.data);
    }).catch(err => {
      if (err.response) { return showErr(err.response.data.msg); }
      showErr('Error signing up.');
    });
  };

  const successHandler = (data) => {
    instance.defaults.headers.common['x-auth-token'] = data.token;
    if (remember) {
      localStorage['token'] = data.token;
      // expires in 30 days
      localStorage['expirationDate'] = new Date(new Date().getTime() + 2592000000);
      localStorage['expirationTime'] = '2592000000';
    } else {
      // expires in 1hr
      localStorage['token'] = data.token;
      localStorage['expirationDate'] = new Date(new Date().getTime() + 3600000);
      localStorage['expirationTime'] = '3600000';
    }
    const updatedNetWorth = calcNetWorth(data.netWorth.dataPoints, data.portfolio);
    instance.put('netWorth', { netWorthData: updatedNetWorth }).then(res => {
      props.setNetWorthData(res.data.result.dataPoints);
    }).catch(err => {
      setErr(true);
      setErrMsg('Error connecting to the server.');
      setLoading(false);
      return;
    });
    if (props.mode === 'Login') {
      props.setPortfolio(calcPortfolioValue(data.portfolio));
    }
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
  };

  return (
    <div className={classes.Container}>
      <div className={props.mode === 'Login' ? classes.LoginPanel : classes.SignupPanel}>
        {loading && <Spinner login />}
        <div className={classes.Content}>
          <Link to="/demo" className={classes.Demo}>View a demo account<span>{arrowRight}</span></Link>
          <div className={classes.Title}>
            <ChartSymbol />
            <h1>Simplify</h1>
          </div>
          <p className={classes.SubTitle}>Simplify your finances with budget, net worth, and investment trackers</p>
          <div className={focused === '1' ? classes.InputDivFocus : classes.InputDiv}>
            <span className={classes.Icon}>{personIcon}</span>
            <input onFocus={() => setFocus('1')} onBlur={() => setFocus('')}
              value={email}
              placeholder="Email"
              spellCheck="false"
              onChange={(e) => { setEmail(e.target.value); setErr(false); }} />
          </div>
          <div className={focused === '2' ? classes.InputDivFocus : classes.InputDiv}>
            <span className={classes.Icon}>{lockIcon}</span>
            <input onFocus={() => setFocus('2')} onBlur={() => setFocus('')}
              type="password"
              value={password}
              placeholder="Password"
              spellCheck="false"
              onChange={(e) => { setPassword(e.target.value); setErr(false); }} />
          </div>
          {props.mode === 'Signup' &&
            <div className={focused === '3' ? classes.InputDivFocus : classes.InputDiv}>
              <span className={classes.Icon}>{lockIcon}</span>
              <input onFocus={() => setFocus('3')} onBlur={() => setFocus('')}
                type="password"
                value={confPass}
                placeholder="Confirm Password"
                spellCheck="false"
                onChange={(e) => { setConfPass(e.target.value); setErr(false); }} />
            </div>
          }
          <div className={classes.Remember}>
            <input type="checkbox" onChange={() => setRemember(prev => !prev)} checked={remember}/>
            <span>Remember me for 30 days</span>
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
  );
};

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(actions.login()),
  setNetWorthData: (data) => dispatch(actions.setNetWorthData(data)),
  setPortfolio: (data) => dispatch(actions.setPortfolio(data))
});

export default connect(null, mapDispatchToProps)(AuthPanel);
