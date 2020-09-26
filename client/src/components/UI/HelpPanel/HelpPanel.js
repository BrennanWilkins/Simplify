import React, { useState } from 'react';
import classes from './HelpPanel.module.css';
import CloseBtn from '../Btns/CloseBtn/CloseBtn';
import Title from '../Title/Title';
import { arrowRight } from '../UIIcons';
import helpGif2 from '../../../assets/helpGif2.gif';
import helpGif3 from '../../../assets/helpGif3.gif';
import helpGif4 from '../../../assets/helpGif4.gif';
import helpGif5 from '../../../assets/helpGif5.gif';
import helpGif6 from '../../../assets/helpGif6.gif';
import helpGif7 from '../../../assets/helpGif7.gif';
import helpGif8 from '../../../assets/helpGif8.gif';
import helpGif9 from '../../../assets/helpGif9.gif';
import helpGif10 from '../../../assets/helpGif10.gif';
import helpGif11 from '../../../assets/helpGif11.gif';
import helpGif12 from '../../../assets/helpGif12.gif';
import helpGif13 from '../../../assets/helpGif13.gif';
import { connect } from 'react-redux';

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
    if (currPage === 14) { return closeHandler(); }
    setCurrPage(prev => prev + 1);
    setHides(hides.concat(currPage));
  };

  const closeHandler = () => {
    setCurrPage(1);
    setHides([1]);
    props.close();
  };

  const content = [
    <>
      <h1>Welcome to Simplify!</h1>
      <p>Simplify helps you organize and simplify your finances by tracking your budget, goals, investments, net worth, and more.</p>
      <p>Click the next arrow to learn how all of the different features work.</p>
    </>,
    <>
      <p>To add a new stock or cryptocurrency to your portfolio, click "Add a new holding", and enter either the ticker or company name.</p>
      <p>The server will provide all of the search results that best match your query. If it doesn't show up, you can always add it manually.</p>
      <img src={helpGif2} alt="" />
    </>,
    <>
      <p>To buy or sell a stock or cryptocurrency, click the buy or sell button, select it from the drop down list, then enter the quantity you sold or bought.</p>
      <img src={helpGif3} alt="" />
    </>,
    <>
      <p>Click on the chart icon next to the 'Value' table column to see a price and volume chart of a stock or cryptocurrency.
      You can look at another chart by clicking on its symbol at the top.</p>
      <p>The chart will show a max of 5 years of data, and can be zoomed on different time intervals.</p>
      <img src={helpGif4} alt="" />
    </>,
    <>
      <p>To analyze a stock, click the 'Analysis' button, and choose a stock from your portfolio in the drop down.</p>
      <p>The server will retrieve a summary of analyst price targets, quarterly Earnings Per Share (EPS) data, and analyst recommendations for buying or selling the stock.</p>
      <img src={helpGif5} alt="" />
    </>,
    <>
      <p>To add a new asset, like real estate, click "Add a new asset" and enter its category, description, and value.
      To add a new liability, like credit card debt, click "Add a new liability".</p>
      <p>Click the settings icon and select an asset or liability from the drop down to change its value.</p>
      <img src={helpGif6} alt="" />
    </>,
    <>
      <p>Every time you log in, the server will fetch real-time stock and cryptocurrency prices from several apis to update your total portfolio value,
      and combine these values with your other assets and liabilities to calculate and record your net worth over time.</p>
      <img src={helpGif7} alt="" />
    </>,
    <>
      <p>The today's highlights section shows key changes in your portfolio, like changes in your net worth and your highest and lowest performing investments.</p>
      <p>To get recent financial news, you can click on 'Financial News'
      and either retrieve general market news or news targeted towards a stock in your portfolio along with an analysis of news sentiment.</p>
      <img src={helpGif8} alt="" />
    </>,
    <>
      <p>On the budgeting page, you can create and track your monthly budget. You can see a breakdown of your budget with the charts,
      and can track your spent and remaining budget with the progress bars.</p>
      <p>To add a transaction, click on the 'Add Transaction' button. To view your past transactions, click on 'Transactions'.</p>
      <img src={helpGif9} alt="" />
    </>,
    <>
      <p>On the plan page, the compound interest visualizer and retirement visualizer can help you plan for reaching your net worth and retirement goals.</p>
      <p>To learn about how each tool works, click on the help icon on each page.</p>
      <img src={helpGif10} alt="" />
    </>,
    <>
      <p>The tax calculator allows you to get an estimate of the taxes you will have to pay on your investment returns for the year.</p>
      <p>To learn about how your taxes are calculated, click on the help icon.</p>
      <img src={helpGif11} alt="" />
    </>,
    <>
      <p>On the goal page, you can create and track your financial goals. You can create a net worth goal that will be tracked on your portfolio value,
      or a custom goal that you can add contributions to over time.</p>
      <img src={helpGif12} alt="" />
    </>,
    <>
      <p>To edit, delete, or add a contribution to your goals, click on 'Show More'.
      You can view your recent contributions and the total value you've saved towards your goal over time.</p>
      <p>Based on how much and how often you tend to contribute towards your goal, you can see the expected date to reach your goal under the chart.</p>
      <img src={helpGif13} alt="" />
    </>,
    <>
      <p>Feel free to check out all of the features on the demo account!</p>
      <p>To save all of your data and track your portfolio over time, create an account.</p>
      <p>To view the source code, check out my <a href="https://github.com/BrennanWilkins/Simplify" target="_blank" rel="noopener noreferrer">github</a>.</p>
    </>,
  ];

  return (
    <div className={props.show ? classes.Panel : `${classes.HidePanel} ${classes.Panel}`}>
      <div className={props.dark ? classes.Dark : classes.InnerPanel}>
        <div className={classes.TopDiv}>
          <div className={classes.PageNum}>{currPage}/14</div>
          <CloseBtn close={closeHandler} />
        </div>
        <Title auth />
        <div className={classes.Content}>
          {content.map((page, i) => <div className={currPage === i + 1 ? classes.Show : (hides.includes(i + 1) ? classes.HideLeft : classes.HideRight)} key={i}>{page}</div>)}
        </div>
        <div className={classes.BtnsDiv}>
          <button className={currPage === 1 ? classes.DisPrevBtn : classes.PrevBtn} onClick={prevHandler}>
            <span className={classes.Icon}>{arrowRight}</span>
          </button>
          <button className={currPage === 14 ? classes.DisNextBtn : classes.NextBtn} onClick={nextHandler}>
            <span className={classes.Icon}>{arrowRight}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ dark: state.theme.darkMode });

export default React.memo(connect(mapStateToProps)(HelpPanel));
