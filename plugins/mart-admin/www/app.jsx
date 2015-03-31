import './index.html';
import 'babel-core/polyfill';

import React from 'react';
import App from './components/App/App';

React.render(
  <App />,
  document.getElementById('app')
);
