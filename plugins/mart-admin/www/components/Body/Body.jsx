import React from 'react';
import AppActions from '../../actions/AppActions';
import Menu from '../Menu/Menu';
import SelectedList from '../SelectedList/SelectedList';

let { PropTypes } = React;

class Body extends React.Component {

  render() {
    return (
      <div className={'body'}>
        <h1>Example of React with ES6 and webpack</h1>
        <Menu items={this.props.items} />
        <p><em>Click on a menu item to toggle:</em></p>
        <p>Your selections:</p>
        <SelectedList items={this.props.selectedItems} />
      </div>
    );
  }
}

Body.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired
};

export default Body;
