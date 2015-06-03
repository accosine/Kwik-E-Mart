import React from 'react';
import AppActions from '../../actions/AppActions';

export default class SearchBar extends React.Component {

  handleChange() {
    console.log(this.refs.searchBar.getDOMNode().value);
    AppActions.getSearchResults(this.refs.searchBar.getDOMNode().value);
    // this.props.onUserInput(
    //   this.refs.filterTextInput.getDOMNode().value,
    //   this.refs.inStockOnlyInput.getDOMNode().checked
    // );
  }

  render() {
    return (
      <input ref="searchBar" type="text" name="search" placehoder="Search..."
          onChange={this.handleChange.bind(this)} />
    );
  }
}
