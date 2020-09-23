import React, { useState } from 'react';
import classes from './SettingsPanels.module.css';
import BlueBtn from '../Btns/BlueBtn/BlueBtn';
import { instance as axios } from '../../../axios';
import CloseBtn from '../Btns/CloseBtn/CloseBtn';
import PanelContainer from '../PanelContainer/PanelContainer';
import { connect } from 'react-redux';
import { addNotif } from '../../../store/actions/index';

const Feedback = props => {
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [rating, setRating] = useState();
  const [loading, setLoading] = useState(false);

  const closeHandler = () => {
    setMsg('');
    setRating(null);
    setErr(false);
    setLoading(false);
    props.close();
  };

  const submitHandler = () => {
    if (!rating) { return; }
    if (props.isDemo) { setErr(true); return setErrMsg('Please login or signup before leaving feedback.'); }
    if (loading) { return; }
    setLoading(true);
    axios.post('auth/feedback', { msg, rating }).then(res => {
      closeHandler();
      props.closeAll();
      props.addNotif('Feedback sent');
      setLoading(false);
    }).catch(err => {
      setErr(true);
      setErrMsg('There was an error connecting to the server.');
      setLoading(false);
    });
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.show ? classes.FeedbackContainer : `${classes.FeedbackContainer} ${classes.Hide}`}>
        <div className={`${classes.Content} ${classes.FeedbackContent}`}>
          <div style={{width: '100%'}}><CloseBtn close={closeHandler} /></div>
          <p className={classes.Title1}>How would you rate Simplify from 1 to 10?</p>
          <div className={classes.FeedbackBtns}>
            {[...Array(10)].map((num, i) =>
              <div key={i} onClick={() => setRating(i + 1)} style={i + 1 === rating ? {background: 'rgb(var(--green))'} : undefined} className={classes.FeedbackBtn}>{i + 1}</div>
            )}
          </div>
          <p className={classes.Title1}>Leave a message about your experience (optional).</p>
          <textarea value={msg} onChange={e => setMsg(e.target.value)} />
          <BlueBtn clicked={submitHandler}>Send Feedback</BlueBtn>
          <div className={err ? classes.ShowErr : classes.HideErr}>{errMsg}</div>
        </div>
      </div>
    </PanelContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  addNotif: msg => dispatch(addNotif(msg))
});

export default connect(null, mapDispatchToProps)(Feedback);
