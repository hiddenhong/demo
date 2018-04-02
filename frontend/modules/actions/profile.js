import fetch from 'isomorphic-fetch'
import { checkHttpStatus, parseJSON } from '../helpers';
import API from '../endpoints/api';
import { inRouting } from './inRouting.js';

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export function fetchProfileRequest() {
  return {
    type: FETCH_PROFILE_REQUEST
  }
}

export function fetchProfileSuccess(profile) {
  return {
    type: FETCH_PROFILE_SUCCESS,
    ...profile
  }
}

export function fetchProfileFailure(message) {
  return {
    type: FETCH_PROFILE_FAILURE,
    message
  }
}


export function fetchProfile() {
  return dispatch => {
    dispatch(fetchProfileRequest());

    return fetch(API.ROOT_URL + API.ME, {
      "method": 'GET',
      "credentials": 'include',
      "headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('proqod_token')
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(json => {
      // console.log(json);
      localStorage.setItem('proqod_profile', JSON.stringify(json));
      dispatch(fetchProfileSuccess(json));
      dispatch(inRouting(true));
    })
    .catch(err => {
      dispatch(fetchProfileFailure(err));
    })
  }
}