import './index.html';
import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';

let {DefaultRoute, Route, NotFoundRoute} = Router;

import App from './components/App/App';
import Dashboard from './components/Dashboard/Dashboard';
import Create from './components/Create/Create';
import Update from './components/Update/Update';
import Delete from './components/Delete/Delete';
import NotFound from './components/NotFound/NotFound';

/*eslint no-multi-spaces: 0 */
let routes = (
  <Route           name="app"       handler={App} path="/">
    <DefaultRoute  name="dashboard" handler={Dashboard}/>
    <Route         name="create"    handler={Create}/>
    <Route         name="update"    handler={Update}/>
    <Route         name="delete"    handler={Delete}/>
    <NotFoundRoute name="notfound"  handler={NotFound}/>
  </Route>
);

Router.run(routes,/*, Router.HistoryLocation*/ (Handler) => {
  React.render(<Handler/>, document.getElementById('backend'));
});
