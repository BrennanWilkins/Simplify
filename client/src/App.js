import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPanel from './containers/AuthPanel/AuthPanel';
import { connect } from 'react-redux';
import { autoLogin } from './store/actions/index';
import HomePage from './containers/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Portfolio from './containers/Portfolio/Portfolio';

const App = props => {
  useEffect(() => {
    props.autoLogin();
  }, []);

  return (
    <BrowserRouter>
      {props.isAuth ?
        <React.Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/" component={HomePage} />
            <Redirect to="/" />
          </Switch>
        </React.Fragment>
        :
        <Switch>
          <Route exact path="/demo" render={() => <div>Demo</div>} />
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
