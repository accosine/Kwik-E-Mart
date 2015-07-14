import './index.html';
import 'babel-core/polyfill';

import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import App from './components/App/App';
import Dashboard from './components/Dashboard/Dashboard';
import Create from './components/Create/Create';
import Update from './components/Update/Update';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import Delete from './components/Delete/Delete';
import NotFound from './components/NotFound/NotFound';

/*eslint no-multi-spaces: 0 */
let routes = (
  <Router history={history}>
    <Route           component={App} >
      <Redirect      from="/" to="dashboard"/>
      <Route         component={Dashboard}     path="dashboard" />
      <Route         component={Create}        path="create" />
      <Route         component={Update}        path="update" />
      <Route         component={UpdateProduct} path="update/product/:productid" />
      <Route         component={Delete}        path="delete" />
      <Route         component={NotFound}      path="*" />
    </Route>
  </Router>
);

React.render(routes, document.getElementById('backend'));
