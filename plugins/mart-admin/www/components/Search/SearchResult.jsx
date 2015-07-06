import React from 'react';

class SearchResultList extends React.Component {

  static propTypes = {
    items: React.PropTypes.array.isRequired,
    resultItem: React.PropTypes.func.isRequired
  };

  static defaultProps = {items: []};

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
    return (
      <div>
        <h3>Results {this.props.searchResults.total}:</h3>
        <SearchResultList items={this.props.searchResults.hits} resultItem={this.props.resultItem} />
      </div>
    );
  }
}
