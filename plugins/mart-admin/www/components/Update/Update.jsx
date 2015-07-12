import React from 'react';
import {Link} from 'react-router';

import AppActions from '../../actions/AppActions';
import SearchStore from '../../stores/SearchStore';

import Search from '../Search/Search';

export default class Update extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  // TODO: use ES7 transition decorator when available in react-router
  componentDidMount() {
    this.context.router.addTransitionHook(this.routerWillLeave);
  }

  componentWillUnmount() {
    this.context.router.removeTransitionHook(this.routerWillLeave);
  }

  resultItem(item) {
    let doc = item._source.doc;
    return (
      <li key={item._id}>
        <Link to={`/update/product/${item._id}`}>{doc.title}</Link>
      </li>
    );
  }

  render() {
    return (
      <div>
        <h3>Update</h3>
        <Search resultItem={this.resultItem}/>
      </div>
    );
  }

  routerWillLeave(nextState, router) {
    AppActions.clearSearchResults();
  }

}
