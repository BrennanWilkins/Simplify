import React from 'react';
import classes from './HomeCard.module.css';
import { withRouter } from 'react-router-dom';

const HomeCard = props => {
  const cardClass = (
    props.num === '1' ? classes.Card1 :
    props.num === '2' ? classes.Card2 :
    props.num === '3' ? classes.Card3 :
    props.num === '4' ? classes.Card4 :
    props.num === '5' ? classes.Card5 :
    classes.Card6
  );

  const linkHandler = () => {
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
      <div className={[cardClass, classes.Card].join(' ')}>
        {props.children}
      </div>
    </div>
  );
};

export default withRouter(HomeCard);
