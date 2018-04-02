import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  LOGOUT_USER,
} from '../actions';

const initialState = {
  "isAuthenticating": false,
  "isAuthenticated": localStorage.getItem('proqod_token') ? true : false,
  "isRegistering": false,
  "username": localStorage.getItem('proqod_username') || '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isRegistering: true
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistering: false
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        isRegistering: false,
        errorMessage: action.message
      }

    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        username: action.username,
        isAuthenticating: true,
        isAuthenticated: false,
        errorMessage: ''
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        username: action.username,
        isAuthenticating: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        username: '',
        isAuthenticating: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      })
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false
      })
    case UPDATE_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false
      })

    case LOGOUT_USER:
      return {
        ...state,
        username: '',
        isAuthenticating: false,
        isAuthenticated: false
      }
    default:
      return state;
  }
}