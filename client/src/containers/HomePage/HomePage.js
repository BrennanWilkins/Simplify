import React from 'react';
import classes from './HomePage.module.css';
import HomeCard from '../../components/HomeCard/HomeCard';

const HomePage = props => {
  return (
    <div className={classes.Container}>
      <div className={classes.Cards}>
        <HomeCard num="1">
          <h1>Net Worth</h1>
        </HomeCard>
        <HomeCard num="2">
          <h1>Portfolio</h1>
        </HomeCard>
        <HomeCard num="3">
          <h1>Budget</h1>
        </HomeCard>
        <HomeCard num="4">
          <h1>Assets & liabilities</h1>
        </HomeCard>
        <HomeCard num="5">
          <h1>Plan</h1>
        </HomeCard>
        <HomeCard num="6">
          <h1>Net Worth Goal</h1>
        </HomeCard>
      </div>
    </div>
  );
};

export default HomePage;
