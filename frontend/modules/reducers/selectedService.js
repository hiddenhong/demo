import { SELECT_SERVICE } from '../actions';

export default function selectedService(state = '', action) {
  switch (action.type) {
    case SELECT_SERVICE:
      return action.service;
    default:
      return state;
  }
}