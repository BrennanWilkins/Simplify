import React from 'react';
import classes from './ErrorBoundary.module.css';
import { Link } from 'react-router-dom';
import { caretIcon } from '../UI/UIIcons';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: '',
    info: '',
    showError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={classes.Error}>
          <h1>Something went wrong.</h1>
          <Link to="/"><button>Back to Simplify Home</button></Link>
          <div onClick={() => this.setState(prev => ({ showError: !prev }))}>
            Error Info<span className={this.state.showError ? classes.Down : classes.Right}>{caretIcon}</span>
          </div>
          {this.state.showError ? <div className={classes.ErrorInfo}><p>{this.state.error}</p><p>{this.state.info}</p></div> : null}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
