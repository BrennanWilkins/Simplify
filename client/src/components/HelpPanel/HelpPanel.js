import React, { useState } from 'react';
import classes from './HelpPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import Title from '../UI/Title/Title';
import { arrowRight } from '../UI/UIIcons';

const HelpPanel = props => {
  const [currPage, setCurrPage] = useState(1);

  const getContent = (curr) => {
    switch(curr) {
      case 1: return (
        <React.Fragment>
          <h1>Welcome to Simplify!</h1>
          <p>Simplify provides budgeting and investment tracking tools to help you organize and simplify your finances.</p>
          <p>Click the next arrow to learn how all of the different features work.</p>
        </React.Fragment>
      );
      case 2: return (
        <React.Fragment>
          <p className={classes.P1}>To add a new stock or cryptocurrency to your portfolio,
          click "Add a new holding", and enter either the ticker or full name.</p>
          <p className={classes.P2}>The server will provide all of the search results that best match your query.
          If it doesn't show up, you can always add it manually.</p>
          <img className={classes.Gif2} src="/assets/page2gif.gif" alt="" />
        </React.Fragment>
      );
      case 3: return (
        <React.Fragment>
          <p>To buy or sell a stock or cryptocurrency, click the buy or sell button,
          select it from the drop down list, then enter the quantity you sold or bought.</p>
          <img className={classes.Gif3} src="/assets/page3gif.gif" alt="" />
        </React.Fragment>
      );
      case 4: return (
        <React.Fragment>
          <p className={classes.P1}>To add a new asset, like real estate, click "Add a new asset" and enter its name, description, and value.
          To add a new liability, like credit card debt, click "Add a new liability".</p>
          <p className={classes.P2}>To change an asset's or liability's value, click the settings icon and select it from the drop down list.</p>
          <img className={classes.Gif4} src="/assets/page4gif.gif" alt="" />
        </React.Fragment>
      );
      case 5: return (
        <React.Fragment>
          <p className={classes.P1}>Every time you log in, the server will fetch real-time stock and cryptocurrency prices
          from several apis to update your portfolio value.</p>
          <p className={classes.P2}>Your net worth is calculated every day based on these investment values, along with your assets and any liabilities.</p>
          <p className={classes.P2}>Go to the goals page to set a new net worth goal or to edit your goal.</p>
          <img className={classes.Gif5} src="/assets/page5gif.gif" alt="" />
        </React.Fragment>
      );
      case 6: return (
        <React.Fragment>
          <p>Visit the "plan" page to plan or visualize your net worth goal using a compounding interest formula.
          Enter values for all of the fields to generate a net worth chart that projects out for the years you provided.</p>
          <img className={classes.Gif6} src="/assets/page6gif.gif" alt="" />
        </React.Fragment>
      );
      case 7: return (
        <React.Fragment>
          <p>Visit the budgeting page to create, edit, and track your budget. The progress bars will show you how much you've spent this month and your total
          budget for each category. Click on "transactions" to view your past five transactions. To add a new transaction, click "Add Transaction".</p>
          <img className={classes.Gif7} src="/assets/page7gif.gif" alt="" />
        </React.Fragment>
      );
      default: return (
        <React.Fragment>
        <p>Feel free to check out all of the features on the demo account!</p>
        <p>To save all of your data and track your portfolio over time, create an account.</p>
        <p>To view the source code, check out my <a href="#" target="_blank">github</a>.</p>
        </React.Fragment>
      );
    }
  };

  const prevHandler = () => {
    if (currPage === 1) { return; }
    setCurrPage(prev => prev - 1);
  };

  const nextHandler = () => {
    if (currPage === 8) { return props.close(); }
    setCurrPage(prev => prev + 1);
  };

  return (
    <div className={props.show ? classes.Panel : classes.HidePanel}>
      <div className={classes.TopDiv}>
        <div className={classes.PageNum}>{currPage}/8</div>
        <CloseBtn close={props.close} />
      </div>
      <Title auth />
      <div className={classes.Content}>{getContent(currPage)}</div>
      <div className={classes.BtnsDiv}>
        <button className={currPage === 1 ? classes.DisPrevBtn : classes.PrevBtn} onClick={prevHandler}>
          <span className={classes.Icon}>{arrowRight}</span>
        </button>
        <button className={currPage === 8 ? classes.DisNextBtn : classes.NextBtn} onClick={nextHandler}>
          <span className={classes.Icon}>{arrowRight}</span>
        </button>
      </div>
    </div>
  );
};

export default HelpPanel;
