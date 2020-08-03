import React, { useState } from 'react';
import classes from './HelpPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import Title from '../UI/Title/Title';
import { arrowRight } from '../UI/UIIcons';
import page2gif from '../../assets/page2gif.gif';
import page3gif from '../../assets/page3gif.gif';
import page4gif from '../../assets/page4gif.gif';
import page5gif from '../../assets/page5gif.gif';
import page6gif from '../../assets/page6gif.gif';
import page7gif from '../../assets/page7gif.gif';

const HelpPanel = props => {
  const [currPage, setCurrPage] = useState(1);
  const [hides, setHides] = useState([1]);

  const prevHandler = () => {
    if (currPage === 1) { return; }
    setCurrPage(prev => prev - 1);
    setHides(hides.filter(hide => hide !== currPage));
  };

  const nextHandler = () => {
    // close panel if next arrow closed on last page
    if (currPage === 8) { return closeHandler(); }
    setCurrPage(prev => prev + 1);
    setHides(hides.concat(currPage));
  };

  const closeHandler = () => {
    setCurrPage(1);
    setHides([1]);
    props.close();
  };

  return (
    <div className={props.show ? classes.Panel : classes.HidePanel}>
      <div className={classes.TopDiv}>
        <div className={classes.PageNum}>{currPage}/8</div>
        <CloseBtn close={closeHandler} />
      </div>
      <Title auth />
      <div className={classes.Content}>
        <div className={currPage === 1 ? classes.Show : classes.HideLeft}>
          <h1>Welcome to Simplify!</h1>
          <p>Simplify provides budgeting and investment tracking tools to help you organize and simplify your finances.</p>
          <p>Click the next arrow to learn how all of the different features work.</p>
        </div>
        <div className={currPage === 2 ? classes.Show : (hides.includes(2) ? classes.HideLeft : classes.HideRight)}>
          <p className={classes.P1}>To add a new stock or cryptocurrency to your portfolio,
          click "Add a new holding", and enter either the ticker or full name.</p>
          <p className={classes.P2}>The server will provide all of the search results that best match your query.
          If it doesn't show up, you can always add it manually.</p>
          <img className={classes.Gif2} src={page2gif} alt="" />
        </div>
        <div className={currPage === 3 ? classes.Show : (hides.includes(3) ? classes.HideLeft : classes.HideRight)}>
          <p>To buy or sell a stock or cryptocurrency, click the buy or sell button,
          select it from the drop down list, then enter the quantity you sold or bought.</p>
          <img className={classes.Gif3} src={page3gif} alt="" />
        </div>
        <div className={currPage === 4 ? classes.Show : (hides.includes(4) ? classes.HideLeft : classes.HideRight)}>
          <p className={classes.P1}>To add a new asset, like real estate, click "Add a new asset" and enter its name, description, and value.
          To add a new liability, like credit card debt, click "Add a new liability".</p>
          <p className={classes.P3}>To change an asset's or liability's value, click the settings icon and select it from the drop down.</p>
          <img className={classes.Gif4} src={page4gif} alt="" />
        </div>
        <div className={currPage === 5 ? classes.Show : (hides.includes(5) ? classes.HideLeft : classes.HideRight)}>
          <p className={classes.P1}>Every time you log in, the server will fetch real-time stock and cryptocurrency prices
          from several apis to update your portfolio value.</p>
          <p className={classes.P2}>Your net worth is calculated every day based on these investment values, along with your assets and any liabilities.</p>
          <p className={classes.P2}>Go to the goals page to set a new net worth goal or to edit your goal.</p>
          <img className={classes.Gif5} src={page5gif} alt="" />
        </div>
        <div className={currPage === 6 ? classes.Show : (hides.includes(6) ? classes.HideLeft : classes.HideRight)}>
          <p>Visit the "plan" page to plan or visualize your net worth goal using a compounding interest formula.
          Enter values for all of the fields to generate a net worth chart that projects out for the years you provided.</p>
          <img className={classes.Gif6} src={page6gif} alt="" />
        </div>
        <div className={currPage === 7 ? classes.Show : (hides.includes(7) ? classes.HideLeft : classes.HideRight)}>
          <p>Visit the budgeting page to create, edit, and track your budget. The progress bars will show you how much you've spent this month and your total
          budget for each category. Click on "transactions" to view your past five transactions. To add a new transaction, click "Add Transaction".</p>
          <img className={classes.Gif7} src={page7gif} alt="" />
        </div>
        <div className={currPage === 8 ? classes.Show : (hides.includes(8) ? classes.HideLeft : classes.HideRight)}>
          <p>Feel free to check out all of the features on the demo account!</p>
          <p>To save all of your data and track your portfolio over time, create an account.</p>
          <p>To view the source code, check out my <a href="https://github.com/BrennanWilkins/Simplify" target="_blank">github</a>.</p>
        </div>
      </div>
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
