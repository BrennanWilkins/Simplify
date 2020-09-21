import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPanel from './components/AuthPage/AuthPanel/AuthPanel';
import { connect } from 'react-redux';
import { autoLogin } from './store/actions/index';
import NavBar from './components/UI/NavBar/NavBar';
import ErrorBoundary from './components/UI/ErrorBoundary/ErrorBoundary';
import Spinner from './components/UI/Spinner/Spinner';
import Notifications from './components/UI/Notifications/Notifications';
const Portfolio = React.lazy(() => import('./components/PortfolioPage/Portfolio/Portfolio'));
const BudgetPage = React.lazy(() => import('./components/BudgetPage/BudgetPage/BudgetPage'));
const HomePage = React.lazy(() => import('./components/HomePage/HomePage/HomePage'));
const GoalPage = React.lazy(() => import('./components/GoalPage/GoalPage/GoalPage'));
const PlanPage = React.lazy(() => import('./components/PlanPage/PlanPage/PlanPage'));

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
            <Notifications />
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
            <Route path="/login" render={() => <AuthPanel mode="Login" />} />
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
