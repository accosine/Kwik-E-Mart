import React from 'react';

import AppActions from '../../actions/AppActions';
import SearchStore from '../../stores/SearchStore';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

function getSearchState() {
  return {
    search: SearchStore.get()
  };
}

export default class Search extends React.Component {

  static propTypes = {
    resultItem: React.PropTypes.func.isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = getSearchState();
  }

  // TODO: use ES7 transition decorator when available in react-router
  componentDidMount() {
    SearchStore.addChangeListener(this._handleChange);
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._handleChange);
  }

  _handleChange = () => {
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
        <SearchResult resultItem={this.props.resultItem} searchResults={this.state.search} />
      </div>
    );
  }
}

