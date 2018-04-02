import { IN_ROUTING } from '../actions';

const initialState = localStorage.getItem('isInRouting') === 'true' ? true : false;

export default function isInRouting( state = initialState, action) {
  switch (action.type) {
    case IN_ROUTING:
      localStorage.setItem('isInRouting', action.isInRouting);
      return action.isInRouting;
    default:
      return state;
  }
}