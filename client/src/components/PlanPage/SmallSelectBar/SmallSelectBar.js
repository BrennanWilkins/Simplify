import React from 'react';
import classes from './SmallSelectBar.module.css';
import Select from '../../UI/Select/Select';

const SmallSelectBar = props => (
  <div className={classes.Container}>
    <Select change={props.changeMode}
      val={{ value: props.mode, label:
        props.mode === 'Compound' ? 'Compound Interest Visualizer' :
        props.mode === 'Retire' ? 'Retirement Visualizer' :
        'Capital Gains Calculator' }}
      options={[
      { value: 'Compound', label: 'Compound Interest Visualizer' },
      { value: 'Retire', label: 'Retirement Visualizer' },
      { value: 'Tax', label: 'Capital Gains Calculator' }]} />
  </div>
);

export default SmallSelectBar;
