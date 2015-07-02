import React from 'react';
import {Link} from 'react-router';

class SearchResultList extends React.Component {

  render() {
    if(this.props.items) {
      let createItem = function(item) {
        let doc = item._source.doc;
        return (
          <li key={item._id}>
            <Link params={{productid: item._id}} to="updateproduct">{doc.title}</Link>
          </li>
        );
      };
      return <ul>{this.props.items.map(createItem)}</ul>;
    }
    else {
      return <p>Type a search</p>;
    }
  }
}

SearchResultList.propTypes = {
  items: React.PropTypes.array.isRequired
};
SearchResultList.defaultProps = {items: []};

export default class SearchResult extends React.Component {

  render() {
    return (
      <div>
        <h3>Results {this.props.searchResults.total}:</h3>
        <SearchResultList items={this.props.searchResults.hits} />
      </div>
    );
  }
}

SearchResult.propTypes = {
  searchResults: React.PropTypes.object.isRequired
};
