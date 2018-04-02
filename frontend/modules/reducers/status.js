import { UPDATE_STATUS } from '../actions';

const initialState = {
  isSuccess: false,
  isFailure: false,
  status: '',
  statusText: '',
};

export default function status(state = initialState, action) {
  switch(action.type) {
    case UPDATE_STATUS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}