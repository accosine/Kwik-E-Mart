import React from 'react';

import SearchStore from '../../stores/SearchStore';

import Search from '../Search/Search';

export default class Update extends React.Component {
  render() {
    return (
      <div>
        <h3>Update</h3>
        <Search />
      </div>
    );
  }

  static willTransitionFrom(transition, element) {
    SearchStore.clear();
  }
}
