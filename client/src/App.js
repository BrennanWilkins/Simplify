import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPanel from './containers/AuthPanel/AuthPanel';
import { connect } from 'react-redux';
import { autoLogin } from './store/actions/index';

const App = props => {
  useEffect(() => {
    props.autoLogin();
  }, []);

  return (
    <BrowserRouter>
      {props.isAuth ?
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Redirect to="/" />
        </Switch>
        :
        <Switch>
          <Route exact path="/login" render={() => <AuthPanel mode="Login" />} />
          <Route exact path="/signup" render={() => <AuthPanel mode="Signup" />} />
          <Redirect to="/login" />
        </Switch>
      }
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
