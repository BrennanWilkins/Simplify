import React from 'react';
import classes from './HomeCard.module.css';
import { withRouter } from 'react-router-dom';

const HomeCard = props => {
  const linkHandler = () => {
    // query params used to take user to correct position on page
    if (props.num === '1') {
      props.history.push('/portfolio');
    } else if (props.num === '2') {
      props.history.push('/portfolio/?pos=stocks');
    } else if (props.num === '3') {
      props.history.push('/portfolio/?pos=cryptos');
    } else if (props.num === '4') {
      props.history.push('/portfolio/?pos=assets');
    } else if (props.num === '5') {
      props.history.push('/budget');
    } else {
      props.history.push('/goals');
    }
  };

  return (
    <div className={classes.CardContainer} onClick={linkHandler}>
      <div className={classes.Card} style={{ animationDelay: `${props.num * 100}ms`}}>
        {props.children}
      </div>
    </div>
  );
};

export default withRouter(HomeCard);
