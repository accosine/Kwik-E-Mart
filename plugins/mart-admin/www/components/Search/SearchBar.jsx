import React from 'react';

export default class SearchBar extends React.Component {

  render() {
    return (
      <input ref="searchBar" type="text" name="search" placehoder="Search..."
          onChange={this.props.getResults.bind(this, this)} />
    );
  }
}
