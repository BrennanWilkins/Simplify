import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPanel from './containers/AuthPanel/AuthPanel';
import { connect } from 'react-redux';
import { autoLogin } from './store/actions/index';
import HomePage from './containers/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import GoalPage from './containers/GoalPage/GoalPage';
import PlanPage from './containers/PlanPage/PlanPage';
import BudgetPage from './containers/BudgetPage/BudgetPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Spinner from './components/UI/Spinner/Spinner';
const Portfolio = React.lazy(() => import('./containers/Portfolio/Portfolio'));

const App = props => {
  useEffect(() => {
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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/goals" component={GoalPage} />
              <Route exact path="/plan" component={PlanPage} />
              <Route exact path="/budget" component={BudgetPage} />
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
