import React, { useState, useEffect, useRef } from 'react';
import classes from './PlanPageContainer.module.css';
import { questionIcon } from '../../UI/UIIcons';

const PlanPageContainer = props => {
  const infoRef = useRef();
  const qRef = useRef();
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const handleClick = e => {
      // dont close info panel if clicking on panel or question icon
      if (infoRef.current.contains(e.target) || qRef.current.contains(e.target)) { return; }
      setShowInfo(false);
    };

    if (showInfo) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showInfo]);

  return (
    <div className={props.show ? undefined : classes.Hide}>
      <div className={props.darkMode ? `${classes.Title} ${classes.Dark}` : classes.Title}>
        <h1>
          {props.currMode === 'Tax' ? 'Capital Gains Tax Calculator' :
          props.currMode === 'Retire' ? 'Retirement Goal Visualizer' :
          'Compound Interest Visualizer'}
          <span onClick={()=> setShowInfo(true)} ref={qRef}>{questionIcon}</span>
        </h1>
        <p ref={infoRef} className={showInfo ? classes.ShowInfo : classes.HideInfo}>
        {props.currMode === 'Tax' ?
        `Capital gains taxes are estimated based on the Tax Cuts and Jobs Act and 2020 federal income tax brackets.
        Investments held for longer than a year are taxed at a different rate than investments held for less than a year,
        which are taxed in the ordinary income tax brackets.`
        : props.currMode === 'Retire' ?
        `This shows the monthly contribution you need to add to your investments each month to reach your retirement goal
        based on the values you enter. The earlier you start saving towards your goal, the less you have to save per month
        due to the compounding effect of holding your investments over time.`
        :
        `'Principal Investment' refers to your initial funds that you are starting with. 'Monthly Contribution' refers to the
        amount you add to your investments each month. 'Years Compounded' refers to how many years you are investing for.
        'Yearly return in %' is the percentage return on your investments you expect to make per year.`}</p>
      </div>
      {props.children}
    </div>
  );
};

export default PlanPageContainer;
