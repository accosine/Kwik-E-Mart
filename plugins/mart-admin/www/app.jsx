import './index.html';
import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';

let {DefaultRoute, Route, NotFoundRoute} = Router;

import App from './components/App/App';
import Dashboard from './components/Dashboard/Dashboard';
import Create from './components/Create/Create';
import Update from './components/Update/Update';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import Delete from './components/Delete/Delete';
import NotFound from './components/NotFound/NotFound';

/*eslint no-multi-spaces: 0 */
let routes = (
  <Route           handler={App}           name="app" path="/">
    <DefaultRoute  handler={Dashboard}     name="dashboard" />
    <Route         handler={Create}        name="create" />
    <Route         handler={Update}        name="update" />
    <Route         handler={UpdateProduct} name="updateproduct" path="update/product/:productid" />
    <Route         handler={Delete}        name="delete" />
    <NotFoundRoute handler={NotFound}      name="notfound" />
  </Route>
);

Router.run(routes, /*Router.HistoryLocation,*/ (Root) => {
  React.render(<Root/>, document.getElementById('backend'));
});
