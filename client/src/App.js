import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPanel from './containers/AuthPanel/AuthPanel';
import { connect } from 'react-redux';
import { autoLogin } from './store/actions/index';
import NavBar from './components/NavBar/NavBar';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Spinner from './components/UI/Spinner/Spinner';
const Portfolio = React.lazy(() => import('./containers/Portfolio/Portfolio'));
const BudgetPage = React.lazy(() => import('./containers/BudgetPage/BudgetPage'));
const HomePage = React.lazy(() => import('./containers/HomePage/HomePage'));
const GoalPage = React.lazy(() => import('./containers/GoalPage/GoalPage'));
const PlanPage = React.lazy(() => import('./containers/PlanPage/PlanPage'));

const App = props => {
  useEffect(() => {
    // try auto login on mount
    props.autoLogin();
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        {props.isAuth || props.isDemo ?
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/portfolio" render={() => <Suspense fallback={<Spinner />}><Portfolio /></Suspense>} />
              <Route exact path="/" render={() => <Suspense fallback=""><HomePage /></Suspense>}/>
              <Route exact path="/goals" render={() => <Suspense fallback={<Spinner />}><GoalPage /></Suspense>} />
              <Route exact path="/plan" render={() => <Suspense fallback={<Spinner />}><PlanPage /></Suspense>} />
              <Route exact path="/budget" render={() => <Suspense fallback={<Spinner />}><BudgetPage /></Suspense>} />
              <Redirect to="/" />
            </Switch>
          </React.Fragment>
          :
          <Switch>
            <Route exact path="/login" render={() => <AuthPanel mode="Login" />} />
            <Route exact path="/signup" render={() => <AuthPanel mode="Signup" />} />
            <Redirect to="/login" />
          </Switch>
        }
      </ErrorBoundary>
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  isDemo: state.auth.isDemo
});

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
