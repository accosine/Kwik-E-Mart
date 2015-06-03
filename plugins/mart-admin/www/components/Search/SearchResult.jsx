import React from 'react';

export default class SearchResult extends React.Component {
  render() {
    return (
      <div>Results: {this.props.searchResults.body.hits.total}</div>
    );
  }
}
