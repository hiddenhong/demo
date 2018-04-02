import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import profile from './profile';
import selectedService from './selectedService';
import isInRouting from './isInRouting';
import status from './status';

const rootReducer = combineReducers({
  auth,
  profile,
  selectedService,
  isInRouting,
  status,
  form: formReducer,
  routing,

})

export default rootReducer
