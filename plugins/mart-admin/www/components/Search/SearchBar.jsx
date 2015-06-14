import React from 'react';

export default class SearchBar extends React.Component {

  render() {
    return (
      <input name="search" onChange={this.props.getResults.bind(this, this)}
          placehoder="Search..." ref="searchBar" type="text" />
    );
  }
}

SearchBar.propTypes = {
  getResults: React.PropTypes.function.isRequired
};
