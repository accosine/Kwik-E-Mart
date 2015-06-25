import React from 'react';

export default class SearchBar extends React.Component {

  render() {
    return (
      <input name="search" onChange={this.props.getResults.bind(this, this)}
        placeholder="You know, for search..." ref="searchBar" type="text" />
    );
  }
}

SearchBar.propTypes = {
  getResults: React.PropTypes.func.isRequired
};
