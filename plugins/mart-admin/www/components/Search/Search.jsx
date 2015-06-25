import React from 'react';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import SearchStore from '../../stores/SearchStore';
import AppActions from '../../actions/AppActions';

function getSearchState() {
  return {
    search: SearchStore.get()
  };
}

export default class Search extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getSearchState();
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount() {
    SearchStore.addChangeListener(this._handleChange);
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._handleChange);
  }

  _handleChange() {
    this.setState(getSearchState());
  }

  _getResults(childComponent) {
    let searchQuery = childComponent.refs.searchBar.getDOMNode().value;
    if(searchQuery.length > 2) {
      AppActions.getSearchResults(searchQuery);
    }
    else {
      AppActions.clearSearchResults();
    }

  }

  render() {
    return (
      <div>
        <SearchBar getResults={this._getResults} />
        <SearchResult searchResults={this.state.search} />
      </div>
    );
  }
}

