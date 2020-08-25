import React, { useRef, useEffect } from 'react';
import classes from './GoalExpand.module.css';
import GoalChart from '../GoalChart/GoalChart';
import CloseBtn from '../UI/CloseBtn/CloseBtn';

const GoalExpand = props => {
  const panelRef = useRef();

  useEffect(() => {
    const handleClick = e => {
      // close panel on click outside
      if (panelRef.current.contains(e.target)) { return; }
      props.close(e.target);
    };

    if (props.show) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show, props.close]);

  return (
    <div ref={panelRef} className={props.show ? classes.Container : `${classes.Hide} ${classes.Container}`}>
      <div className={classes.CloseBtn}><CloseBtn close={props.hardClose} /></div>
      <h2 className={classes.Title}>{props.title}</h2>
      {props.isNW && <GoalChart />}
      {props.children}
    </div>
  );
};

export default GoalExpand;
