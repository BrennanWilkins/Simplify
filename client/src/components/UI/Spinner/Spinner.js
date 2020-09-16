import React from 'react';
import classes from './Spinner.module.css';

const Spinner = props => (
  <div className={props.mode === 'Login' ? classes.LoginLoader :
    props.mode === 'Signup' ? classes.SignupLoader :
    props.mode === 'Search' ? classes.SearchLoader :
    props.mode === 'News' ? classes.NewsLoader :
    props.mode === 'Analysis' ? classes.AnalysisLoader : 
    classes.Loader}></div>
);

export default Spinner;
