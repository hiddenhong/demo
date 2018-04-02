import {
  FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE 
} from '../actions';

const initialState = JSON.parse(localStorage.getItem('proqod_profile') || '{}' );
export default function profile(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        errorMessage: ''
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        username: action.username,
        name: action.name,
        email: action.email,
        isFetching: false,
        isFetched: true,
        errorMessage: ''
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        errorMessage: action.err
      };
    default:
      return state;
  }
}