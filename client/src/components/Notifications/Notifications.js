import React from 'react';
import './Notifications.css';
import { connect } from 'react-redux';
import { checkMarkIcon, xIcon } from '../UI/UIIcons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { deleteNotif } from '../../store/actions/index';

const Notifications = props => (
  <TransitionGroup className="Notifs-Notifs">
    {props.notifs.map(({ id, msg }, i) => (
      <CSSTransition key={id} timeout={500} classNames="Notifs-Notif">
        <div className="Notifs-Notif">
          <span className="Notifs-Icon">{checkMarkIcon}</span>
          {msg}
          <button onClick={() => props.deleteNotif(id)} className="Notifs-Btn"><span>{xIcon}</span></button>
        </div>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

const mapStateToProps = state => ({
  notifs: state.notifications.notifs
});

const mapDispatchToProps = dispatch => ({
  deleteNotif: id => dispatch(deleteNotif(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
