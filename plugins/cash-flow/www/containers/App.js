import React, { Component } from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';

import Routes from './Routes.js';

const masterReducer = combineReducers(reducers);
let middleware = [thunk];

let finalCreateStore;

if (!__DEV__) {
  finalCreateStore = applyMiddleware(...middleware)(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    require('redux-devtools').devTools(),
    require('redux-devtools').persistState(
      window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    ),
    createStore
  );
}

const store = finalCreateStore(masterReducer);


if (__DEV__) {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
  ReactDom.render(
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>,
    document.getElementById('debug')
  );
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <Routes />}
      </Provider>
    );
  }
}
