import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
// import axios from 'axios';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';

class Auth extends Component {
  state = {
    user: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    userErrors: {
      username: { error: false, placeholder: ''},
      password: { error: false, placeholder: ''},
      confirmPassword: { error: false, placeholder: ''}
    },
    error: false,
    errorMsg: '',
    logIn: true,
    shouldRedirect: false
  }

  componentDidMount() {
    this.props.clearError();
    if (this.props.defaultMode === 'login') {
      this.setState({ logIn: true });
    } else {
      this.setState({ logIn: false });
    }
  }

  inputChangedHandler = (e) => {
    const user = { ...this.state.user };
    const userErrors = {...this.state.userErrors};
    const errorField = {...userErrors[e.target.name]};
    errorField.error = false;
    errorField.placeholder = '';
    userErrors[e.target.name] = errorField;
    user[e.target.name] = e.target.value;
    this.setState({ user, userErrors });
    this.props.clearError();
  }

  checkValidity = () => {
    const user = { ...this.state.user };
    const userErrors = { ...this.state.userErrors };
    let error = false;
    if (user.username.length < 1) {
      const usernameErrors = {...userErrors.username};
      usernameErrors.error = true;
      usernameErrors.placeholder = 'Username must not be empty.';
      userErrors.username = usernameErrors;
      this.setState({ userErrors });
      error = true;
    } else if (user.username.length < 5) {
      const usernameErrors = {...userErrors.username};
      usernameErrors.error = true;
      usernameErrors.placeholder = 'Must be at least 6 characters.';
      userErrors.username = usernameErrors;
      user.username = '';
      this.setState({ userErrors, user });
      error = true;
    } else if (user.username.length > 40) {
      const usernameErrors = {...userErrors.username};
      usernameErrors.error = true;
      usernameErrors.placeholder = 'Must be less than 40 characters.';
      userErrors.username = usernameErrors;
      user.username = '';
      this.setState({ userErrors, user });
      error = true;
    }
    if (user.password.length < 1) {
      const passwordErrors = {...userErrors.password};
      passwordErrors.error = true;
      passwordErrors.placeholder = 'Password must not be empty.';
      userErrors.password = passwordErrors;
      this.setState({ userErrors });
      error = true;
    } else if (user.password.length < 5) {
      const passwordErrors = {...userErrors.password};
      passwordErrors.error = true;
      passwordErrors.placeholder = 'Must be at least 6 characters.';
      userErrors.password = passwordErrors;
      user.password = '';
      this.setState({ userErrors, user });
      error = true;
    } else if (user.password.length > 40) {
      const passwordErrors = {...userErrors.password};
      passwordErrors.error = true;
      passwordErrors.placeholder = 'Must be less than 40 characters.';
      userErrors.password = passwordErrors;
      user.password = '';
      this.setState({ userErrors, user });
      error = true;
    }
    if (!this.state.logIn && user.confirmPassword.length < 1) {
      const confirmPasswordErrors = {...userErrors.confirmPassword};
      confirmPasswordErrors.error = true;
      confirmPasswordErrors.placeholder = 'Password must not be empty.';
      userErrors.confirmPassword = confirmPasswordErrors;
      this.setState({ userErrors });
      error = true;
    }
    if (!this.state.logIn && this.state.user.confirmPassword !== this.state.user.password) {
      const confirmPasswordErrors = {...userErrors.confirmPassword};
      confirmPasswordErrors.error = true;
      confirmPasswordErrors.placeholder = 'Must be equal to Password.';
      userErrors.confirmPassword = confirmPasswordErrors;
      user.confirmPassword = '';
      this.setState({ userErrors, user });
      error = true;
    }
    return error;
  }

  switchAuthHandler = () => {
    this.props.clearError();
    this.setState(prevState => { return { logIn: !prevState.logIn, shouldRedirect: true }});
  }

  submitHandler = (e) => {
    e.preventDefault();
    if (this.checkValidity()) { return; }
    if (this.state.logIn) {
      this.props.onAuth({ ...this.state.user });
    } else {
      this.props.onSignup({ ...this.state.user });
    }
  }

  render() {
    let form;
    let usernamePlaceholder = this.state.userErrors.username.error ? this.state.userErrors.username.placeholder : 'Username';
    let passwordPlaceholder = this.state.userErrors.password.error ? this.state.userErrors.password.placeholder : 'Password';
    let usernameClass = this.state.userErrors.username.error ? classes.error : null;
    let passwordClass = this.state.userErrors.password.error ? classes.error : null;
    let error = this.props.error ? <p style={{color: 'red', fontWeight: 'bold'}}>{this.props.errorMsg}</p> : null;
    let redirect = this.props.isAuthenticated ? <Redirect to="/" /> : null;
    let spinner = this.props.loading ? <Spinner /> : null;
    let switchRedirect = null;
    if (this.state.shouldRedirect) {
      switchRedirect = this.state.logIn ? <Redirect to="/login" /> : <Redirect to="signup" />;
    }
    if (this.state.logIn) {
      form = (
        <div className={classes.authDiv}>
          <div className={classes.formDiv}>
            <form className={classes.form} onSubmit={this.submitHandler}>
              <input className={usernameClass} type="text" name="username" placeholder={usernamePlaceholder} value={this.state.user.username} onChange={this.inputChangedHandler}/>
              <input className={passwordClass} type="password" name="password" placeholder={passwordPlaceholder} value={this.state.user.password} onChange={this.inputChangedHandler}/>
              <button>LOGIN</button>
            </form>
            {error}
            <p className={classes.message}>Not registered? <button onClick={this.switchAuthHandler}>Signup</button></p>
          </div>
          {redirect}
          {switchRedirect}
          {spinner}
        </div>
      );
    } else {
      let confirmPasswordPlaceholder = this.state.userErrors.confirmPassword.error ? this.state.userErrors.confirmPassword.placeholder : 'Confirm Password';
      let confirmPasswordClass = this.state.userErrors.confirmPassword.error ? classes.error : null;
      form = (
        <div className={classes.authDiv}>
          <div className={classes.formDiv}>
            <form className={classes.form} onSubmit={this.submitHandler}>
              <input className={usernameClass} type="text" name="username" placeholder={usernamePlaceholder} value={this.state.user.username} onChange={this.inputChangedHandler}/>
              <input className={passwordClass} type="password" name="password" placeholder={passwordPlaceholder} value={this.state.user.password} onChange={this.inputChangedHandler}/>
              <input className={confirmPasswordClass} type="password" name="confirmPassword" placeholder={confirmPasswordPlaceholder} value={this.state.user.confirmPassword} onChange={this.inputChangedHandler}/>
              <button>SIGNUP</button>
            </form>
            {error}
            <p className={classes.message}>Already registered? <button onClick={this.switchAuthHandler}>Login</button></p>
          </div>
          {redirect}
          {switchRedirect}
          {spinner}
        </div>
      );
    }
    return form;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (user) => dispatch(actions.auth(user)),
    onSignup: (user) => dispatch(actions.signup(user)),
    clearError: () => dispatch(actions.clearError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
