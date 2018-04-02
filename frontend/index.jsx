import React from 'react';
import { render } from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// import reducer from './modules/reducers'

const target = document.getElementById('app');

// import './node_modules/bootstrap/dist/css/bootstrap.css';
import './assets/css/main.css';

// import routes from './modules/routes'
import Root from './modules/containers/Root';
import configureStore from './modules/store/configureStore';


/* const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
)*/
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


render( <Root store={store} history={history} />, target);

