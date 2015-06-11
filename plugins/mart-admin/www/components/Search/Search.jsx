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
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    SearchStore.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState(getSearchState());
  }

  getResults(childComponent) {
    let searchQuery = childComponent.refs.searchBar.getDOMNode().value;
    if(searchQuery.length > 2) {
      AppActions.getSearchResults(searchQuery);
    }
  }

  render() {
    return (
      <div>
        <SearchBar getResults={this.getResults} />
        <SearchResult searchResults={this.state.search} />
      </div>
    );
  }
}