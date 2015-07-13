import React from 'react';

class SearchResultList extends React.Component {

  static propTypes = {
    items: React.PropTypes.array.isRequired,
    resultItem: React.PropTypes.func.isRequired
  };

  //static defaultProps = {items: []};

  render() {
    if(this.props.items) {
      return <ul>{this.props.items.map(this.props.resultItem)}</ul>;
    }
    else {
      return <p>Type a search</p>;
    }
  }
}

export default class SearchResult extends React.Component {

  static propTypes = {
    resultItem: React.PropTypes.func.isRequired,
    searchResults: React.PropTypes.object.isRequired
  };

  render() {
    if (this.props.searchResults.status === 'REQUEST_SUCCESS') {
      return (
        <div>
          <h3>{this.props.searchResults.body.total} Results:</h3>
          <SearchResultList items={this.props.searchResults.body.hits} resultItem={this.props.resultItem} />
        </div>
      );
    }
    else if (this.props.searchResults.status === 'REQUEST_PENDING') {
      return (
        <div>loading...</div>
      );
    }
    else {
      return false;
    }
  }
}
