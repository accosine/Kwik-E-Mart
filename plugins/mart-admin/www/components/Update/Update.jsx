import React from 'react';
import {Link} from 'react-router';

import AppActions from '../../actions/AppActions';
import SearchStore from '../../stores/SearchStore';

import Search from '../Search/Search';

export default class Update extends React.Component {

  resultItem(item) {
    let doc = item._source.doc;
    return (
      <li key={item._id}>
        <Link params={{productid: item._id}} to="updateproduct">{doc.title}</Link>
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

  static willTransitionFrom(transition, element) {
    AppActions.clearSearchResults();
  }
}
