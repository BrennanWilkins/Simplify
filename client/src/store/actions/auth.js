import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authFail = (errorMsg) => {
  return { type: actionTypes.AUTH_FAIL, errorMsg };
};

export const authSuccess = (token) => {
  return { type: actionTypes.AUTH_SUCCESS, token };
};

export const signupSuccess = () => {
  return { type: actionTypes.SIGNUP_SUCCESS };
};

export const auth = (user) => {
  return dispatch => {
    dispatch(authStart());
    const userData = { username: user.username, password: user.password };
    axios.post('http://localhost:9000/auth/logIn', userData).then(res => {
      if (res.data.message === 'Success') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', userData.username);
        dispatch(authSuccess(res.data.token));
      } else {
        dispatch(authFail(res.data.message));
      }
    }).catch(err => {
      dispatch(authFail('There was an error logging in.'));
    });
    // } else {
    //   axios.post('http://localhost:9000/auth/signUp', user).then(res1 => {
    //     axios.post('http://localhost:9000/auth/logIn', user).then(res2 => {
    //       if (res1.data.message === 'Success' && res2.data.message === 'Success') {
    //         // dispatch(signupSuccess());
    //         localStorage.setItem('token', res2.data.token);
    //         localStorage.setItem('username', user.username);
    //         dispatch(authSuccess(res2.data.token));
    //       } else if (res1.data.message === 'Username is already taken.'){
    //         dispatch(authFail(res1.data.message));
    //       } else {
    //         console.log(res1.data.message);
    //         dispatch(authFail('There was an error signing up.'));
    //       }
    //       // if (res2.data.message === 'Success') {
    //       //   localStorage.setItem('token', res2.data.token);
    //       //   localStorage.setItem('username', user.username);
    //       //   dispatch(authSuccess(res2.data.token));
    //       // } else {
    //       //   dispatch(authFail(res1.data.message));
    //       // }
    //     }).catch(err => {
    //       dispatch(signupFail('There was an error signing up.'));
    //     });
    //   });
    // }
  };
};

export const signup = (user) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://localhost:9000/auth/signUp', user).then(res => {
      if (res.data.message === 'Success') {
        dispatch(auth(user));
      } else if (res.data.message === 'Taken') {
        dispatch(authFail('Username is already taken.'))
      } else {
        dispatch(authFail('There was an error signing up.'));
      }
    }).catch(err => {
      dispatch(authFail('There was an error signing up.'));
    });
  };
};

export const tryAutoSignIn = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) { dispatch(authSuccess(token)); }
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  return { type: actionTypes.LOGOUT };
}

export const clearError = () => {
  return { type: actionTypes.CLEAR_ERROR };
};
