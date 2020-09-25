import React, { useRef, useEffect, useState } from 'react';
import classes from './GoalExpand.module.css';
import NWGoalChart from '../NWGoalChart/NWGoalChart';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';

const GoalExpand = props => {
  const panelRef = useRef();
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (props.isNW) {
      if (props.show) { setShowChart(true); }
      else { setTimeout(() => setShowChart(false), 500); }
    }
  }, [props.show, props.isNW]);

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
    <div ref={panelRef} className={props.show ?
      (props.darkMode ? `${classes.Container} ${classes.Dark}`: classes.Container) :
      (props.darkMode ? `${classes.Hide} ${classes.Container} ${classes.Dark}` : `${classes.Hide} ${classes.Container}`)}>
      <div className={classes.CloseBtn}><CloseBtn close={props.hardClose} /></div>
      <h2 className={classes.Title}>{props.title}</h2>
      {showChart && <NWGoalChart />}
      {props.children}
    </div>
  );
};

export default GoalExpand;
