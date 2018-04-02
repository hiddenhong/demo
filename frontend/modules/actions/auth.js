import fetch from 'isomorphic-fetch'
import { checkHttpStatus, parseJSON, getAuthErrorMessage } from '../helpers';
import API from '../endpoints/api';
import { updateStatus, clearStatus } from './status';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function registerRequest() { return { type: REGISTER_REQUEST } }
export function registerSuccess() { return { type: REGISTER_SUCCESS } }
export function registerFailure(message) { return { type: REGISTER_FAILURE, message } }

export function registerUser(fileds) {
  return dispatch => {
    dispatch(registerRequest(fileds.username))
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fileds)
    }

    return fetch(API.ROOT_URL + API.REGISTER, options)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        setTimeout(function() {
          dispatch(registerSuccess());
          dispatch(updateStatus(false, "You have successfully registered!", response.status))
        }, 750)
      })
      .catch(({status, err}) => {
        setTimeout(function() {
          // console.warn('register err', status, err, err && Object.keys(err))
          dispatch(registerFailure(err))
          dispatch(updateStatus(true, getAuthErrorMessage(err), status))
        }, 750)
      })
  }
}


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export function loginRequest(username) {
  return {
    type: LOGIN_REQUEST,
    username
  }
}

export function loginSuccess(username) {
  return {
    type: LOGIN_SUCCESS,
    username
  }
}

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    message
  }
}

export function loginUser(username, password) {
  return dispatch => {
    dispatch(loginRequest(username));

    return fetch(API.ROOT_URL + API.LOGIN, {
      "method": "POST",
      "credentials": 'include',
      "headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      "body": JSON.stringify({ username, password })
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      localStorage.setItem('proqod_token', response["token"]);
      setTimeout(() => {
        dispatch(updateStatus(false, "You have successfully signined!", response.status));
        // console.log('loginSucess -+>')
        dispatch(loginSuccess(username));
        localStorage.setItem('proqod_username', username);
        location.reload();
      }, 750);
    })
    .catch(({status, err}) => {
      setTimeout(() => {
        // console.log('login catch', status, err, err && Object.keys(err));
        dispatch(loginFailure(status >= 500 ? 'The server is currently undergoing maintainence. Try again later!' : 'Invalid password or username!'));
        if (status >= 500) {
          dispatch(updateStatus(true, 'The server is currently undergoing maintainence. Try again later!', 500));
        } else {
          dispatch(updateStatus(true, 'Invalid password or username!', status));
        }
      }, 750);
    })
  }
}

export const LOGOUT_USER = 'LOGOUT_USER';

export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}

export function logout() {
  return  dispatch => {

    return fetch(API.ROOT_URL + API.LOGOUT, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Authorization": 'JWT ' + localStorage.getItem('proqod_token')
      }
    })
    .then(checkHttpStatus)
    .then(() => {
      localStorage.removeItem('proqod_token');
      localStorage.removeItem('proqod_username');
      localStorage.removeItem('proqod_profile');
      dispatch(logoutUser());
      // console.log('logoutUser -+>')
      dispatch(updateStatus(false, "You have successfully signouted!", 200))
    })
  }
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export function updateUserRequest() { return { type: UPDATE_USER_REQUEST } }
export function updateUserSuccess() { return { type: UPDATE_USER_SUCCESS } }
export function updateUserFailure() { return { type: UPDATE_USER_FAILURE } }

export function updateUser(data) {
  return dispatch => {
    dispatch(updateUserRequest());

    // console.log("updateUser", data)
    return fetch(API.ROOT_URL + API.AUTH_SET_PASSWORD, {
      "method": 'POST',
      "credentials": 'include',
      "headers": {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": 'JWT ' + localStorage.getItem('proqod_token')
      },
      body: JSON.stringify(data)
    })
    .then(checkHttpStatus)
    .then(() => {
      setTimeout(() => {
        dispatch(updateUserSuccess());
        dispatch(updateStatus(false, 'You hava successfully updated!', 204))
      }, 750)
    })
    .catch(({status, err}) => {
      setTimeout(() => {
        dispatch(updateStatus(true, 'Your previous password was invalid.', status))
        dispatch(updateUserFailure(err));
      }, 750)
    })
  }
}

export function checkTokenExpiry() {
  return (dispatch) => {
    return fetch(API.ROOT_URL + API.VERIFY, {
      "method": "POST",
      "credentials": "inclued",
      "headers": {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({token: localStorage.getItem('proqod_token')})
    })
    .then(checkHttpStatus)
    .then(() => {
      dispatch(updateStatus(false, '', 200))
    })
    .catch(({status, err}) => {
      localStorage.removeItem('proqod_token')
      dispatch(loginFailure('Your session has expired. Log in again!'))
      dispatch(updateStatus(true, 'Your session has expired. Log in again!', status))
    })
  }
}
