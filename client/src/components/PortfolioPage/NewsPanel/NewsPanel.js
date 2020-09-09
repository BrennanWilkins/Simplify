import React, { useState, useEffect } from 'react';
import classes from './NewsPanel.module.css';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { SearchInput, PassInput } from '../../UI/Inputs/Inputs';
import { instance as axios } from '../../../axios';
import { formatDate3 } from '../../../utils/formatDate';
import Spinner from '../../UI/Spinner/Spinner';

const NewsPanel = props => {
  const [query, setQuery] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [news, setNews] = useState([]);
  const [sentiment, setSentiment] = useState({
    totArticles: 0,
    bearPerc: 0,
    bullPerc: 0
  });
  const [err, setErr] = useState(false);
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!props.show) {
      setQuery('');
      setNews([]);
      setSentiment({ totArticles: 0, bearPerc: 0, bullPerc: 0 });
      setErr(false);
      setCodeInvalid(false);
      setErrMsg('');
      setLoading(false);
    }
  }, [props.show]);

  const errHandler = msg => { setErr(true); setErrMsg(msg); };

  const search = () => {
    if (query === '' || accessCode === '') { return; }
    setLoading(true);
    axios.get(`portfolio/news/${accessCode}/${query}`).then(res => {
      setNews(res.data.news.map(article => ({
        date: formatDate3(new Date(article.datetime * 1000)),
        headline: article.headline,
        summary: article.summary,
        url: article.url,
        image: article.image
      })));
      setSentiment({
        totArticles: res.data.sentiment.buzz.articlesInLastWeek,
        bearPerc: (res.data.sentiment.sentiment.bearishPercent * 100).toFixed(2),
        bullPerc: (res.data.sentiment.sentiment.bullishPercent * 100).toFixed(2)
      });
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      if (err.response) {
        let status = err.response.status;
        if (status === 401) { setCodeInvalid(true); }
        if (status === 400) { errHandler('No news was found for the symbol you entered.'); }
      } else { errHandler('There was an error connecting to the server.'); }
    });
  };

  return (
    <React.Fragment>
      <div className={props.show ? classes.Backdrop : classes.HideBackdrop}></div>
      <PanelContainer show={props.show} close={props.close}>
        <div className={props.show ? classes.Panel : `${classes.Panel} ${classes.HidePanel}`}>
          <div className={classes.CloseBtn}><CloseBtn close={props.close} /></div>
          <div className={classes.Title}>Financial News</div>
          <div className={classes.InputText}>An access code is required to access this feature</div>
          <div className={codeInvalid ? `${classes.AccessInput} ${classes.RedInput}` : classes.AccessInput}>
            <PassInput val={accessCode} change={val => { setCodeInvalid(false); setAccessCode(val); }} ph="Access Code" />
          </div>
          <div className={classes.Content}>
            <div style={news.length > 0 ? { width: '488px' } : { width: '500px' }}>
            <div className={classes.StockText}>Enter a stock ticker to get recent company news</div>
            <div className={classes.Search}>
              <SearchInput val={query} change={val => { setErr(false); setQuery(val); }} submit={search} ph="Eg AAPL, aapl" />
              <div className={!loading ? classes.HideSpinner : undefined}><Spinner mode="News" /></div>
            </div>
            <div className={err ? classes.Err : classes.HideErr}>{errMsg}</div>
            {news.length > 0 && <div className={classes.Sentiment}>
              <div>Total articles mentioning {String(query).toUpperCase()} this week: <span>{sentiment.totArticles}</span></div>
              <div>Articles with bearish sentiment: <span>{sentiment.bearPerc}%</span></div>
              <div>Articles with bullish sentiment: <span>{sentiment.bullPerc}%</span></div>
            </div>}
            {news.map((art, i) => (
              <div className={classes.Article} key={i}>
                <div>
                  <a href={art.url} target="_blank">{art.headline}</a>
                  <div className={classes.Summary}>{art.summary}</div>
                  <div className={classes.Date}>{art.date}</div>
                </div>
                <img src={art.image} alt="" />
              </div>
            ))}
            </div>
          </div>
        </div>
      </PanelContainer>
    </React.Fragment>
  );
};

export default NewsPanel;
