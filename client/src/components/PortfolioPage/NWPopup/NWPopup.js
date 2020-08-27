import React, { useState, useEffect } from 'react';
import classes from './NWPopup.module.css';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import { connect } from 'react-redux';
import { formatNum } from '../../../utils/formatNum';
import { hideNWPopup, setNWPopupShown } from '../../../store/actions';

const NWPopup = props => {
  const [change, setChange] = useState(0);

  useEffect(() => {
    // calculate change in net worth since last log in
    if (props.netWorthData.length < 2) { return; }
    let diff = props.netWorthData[props.netWorthData.length - 1].value - props.netWorthData[props.netWorthData.length - 2].value;
    setChange(diff);

    if (props.showNWPopup) {
      // hide NWPopup after 6 sec or on unmount
      setTimeout(() => props.hideNWPopup(), 6000);
      return () => props.setNWPopupShown();
    }
  }, []);

  return (
    <div className={props.showNWPopup ? classes.Panel : props.NWPopupShown ? classes.Shown : classes.Hide}>
      <CloseBtn close={props.hideNWPopup} />
      {change === 0 ?
        <p className={classes.Info}>Your net worth has not changed since the last time you logged in.</p> :
        <p className={classes.Info}>
          Your net worth has {change > 0 ? 'increased' : 'decreased'} by <span className={change > 0 ? classes.Green : classes.Red}>
          ${formatNum(change)}</span> since you last logged in.
        </p>}
    </div>
  );
};

const mapStateToProps = state => ({
  netWorthData: state.netWorth.netWorthData,
  showNWPopup: state.notifications.showNWPopup,
  NWPopupShown: state.notifications.NWPopupShown
});

const mapDispatchToProps = dispatch => ({
  hideNWPopup: () => dispatch(hideNWPopup()),
  setNWPopupShown: () => dispatch(setNWPopupShown())
});

export default connect(mapStateToProps, mapDispatchToProps)(NWPopup);
