import React from 'react';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import SearchStore from '../../stores/SearchStore';

function getSearchState() {
  return {
    search: SearchStore.get()
  };
}

export default class Search extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getSearchState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SearchStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getSearchState());
  }

  render() {
    return (
      <div>
        <SearchBar />
        <SearchResult searchResults={this.state.search} />
      </div>
    );
  }
}
