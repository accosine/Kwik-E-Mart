import React from 'react';

export default class SearchBar extends React.Component {

  static propTypes = {
    getResults: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <input name="search" onChange={this.props.getResults.bind(this, this)}
        placeholder="You know, for search..." ref="searchBar" type="text" />
    );
  }
}
