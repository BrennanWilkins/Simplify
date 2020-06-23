import React from 'react';
import classes from './App.module.css';
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import CryptoPortfolio from './containers/CryptoPortfolio/CryptoPortfolio';
import StockPortfolio from './containers/StockPortfolio/StockPortfolio';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Chart from './components/ChartSymbol/ChartSymbol';
import SideToggle from './components/SideBar/SideToggle/SideToggle';

class App extends React.Component {
  componentDidMount() {
    this.props.tryAutoSignIn();
  }

  state = {
    showSideBar: false
  }

  toggleSideBar = () => {
    this.setState(prevState => {
      return { showSideBar: !prevState.showSideBar };
    });
  }

  render() {
    let routes, links;
    let leftLinks = null;
    if (this.props.isAuthenticated) {
      const username = localStorage.getItem('username');
      routes = (
        <React.Fragment>
          <Route path="/" exact component={Home} />
          <Route path="/crypto" exact component={CryptoPortfolio} />
          <Route path="/stocks" exact component={StockPortfolio} />
          <Route path="/logout" exact component={Logout} />
          <Redirect to="/"/>
        </React.Fragment>
      );
      links = (
        <ul>
          <li className={classes.Right}><div className={classes.userText}>Hello, {username}</div></li>
          <li className={classes.Right}><Link to="/logout">Log Out</Link></li>
        </ul>
      );
      leftLinks = (
        <React.Fragment>
          <li><Link to="/crypto">Crypto</Link></li>
          <li><Link to="/stocks">Stocks</Link></li>
        </React.Fragment>
      );
    } else {
      routes = (
        <React.Fragment>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact render={() => <Auth defaultMode="login"/>} />
          <Route path="/signup" exact render={() => <Auth defaultMode="signup"/>} />
          <Redirect to="/"/>
        </React.Fragment>
      );
      links = (
        <ul>
          <li className={classes.Right}><Link to="/login">Log In</Link></li>
          <li className={classes.Right}><Link to="/signup">Sign Up</Link></li>
        </ul>
      );
    }
    // let sideBar, backdrop = null;
    // if (this.state.showSideBar) {
    //   backdrop = <div className={classes.Backdrop} onClick={this.toggleSideBar}></div>
    //   if (this.props.isAuthenticated) {
    //     sideBar = (
    //       <div className={classes.SideBar} onClick={this.toggleSideBar}>
    //         <div className={classes.SideBarChart}><Link to="/"><Chart /></Link></div>
    //         <div className={classes.SideLinks}><Link to="/crypto">Crypto</Link></div>
    //         <div className={classes.SideLinks}><Link to="/stocks">Stocks</Link></div>
    //         <div className={classes.SideLinks}><Link to="/logout">Logout</Link></div>
    //       </div>
    //     );
    //   } else {
    //     sideBar = (
    //       <div className={classes.SideBar} onClick={this.toggleSideBar}>
    //         <div className={classes.SideBarChart}><Link to="/"><Chart /></Link></div>
    //         <div className={classes.SideLinks}><Link to="/login">Log In</Link></div>
    //         <div className={classes.SideLinks}><Link to="/signup">Sign Up</Link></div>
    //       </div>
    //     );
    //   }
    // }
    let sideBar, sideBarClasses;
    let backdrop = null;
    if (this.state.showSideBar) {
      backdrop = <div className={classes.Backdrop} onClick={this.toggleSideBar}></div>
      sideBarClasses = [classes.SideBar, classes.Open];
    } else {
      sideBarClasses = [classes.SideBar, classes.Close];
    }
    if (this.props.isAuthenticated) {
      sideBar = (
        <div className={sideBarClasses.join(' ')} onClick={this.toggleSideBar}>
          <div className={classes.SideBarChart}><Link to="/"><Chart /></Link></div>
          <div className={classes.SideLinks}><Link to="/crypto">Crypto</Link></div>
          <div className={classes.SideLinks}><Link to="/stocks">Stocks</Link></div>
          <div className={classes.SideLinks}><Link to="/logout">Logout</Link></div>
        </div>
      );
    } else {
      sideBar = (
        <div className={sideBarClasses.join(' ')} onClick={this.toggleSideBar}>
          <div className={classes.SideBarChart}><Link to="/"><Chart /></Link></div>
          <div className={classes.SideLinks}><Link to="/login">Log In</Link></div>
          <div className={classes.SideLinks}><Link to="/signup">Sign Up</Link></div>
        </div>
      );
    }
    return (
      <BrowserRouter>
        <div>
          <nav className={classes.NavBar}>
            <ul>
              <li><Link to="/"><Chart /></Link></li>
              {leftLinks}
            </ul>
            {links}
          </nav>
          <nav className={classes.SideNav}>
            <SideToggle toggleSideBar={this.toggleSideBar}/>
            {backdrop}
            {sideBar}
          </nav>
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignIn: () => dispatch(actions.tryAutoSignIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
