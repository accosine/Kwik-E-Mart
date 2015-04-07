import React from 'react';
import AppActions from '../../actions/AppActions';

let { PropTypes } = React;

class MenuItem extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      isSelected: false
    };
  }

  handleClick() {
    this.toggleSelected();
    AppActions.clickNavItem(this.props.navitem);
  }

  toggleSelected() {
    this.setState({
      isSelected: !this.state.isSelected
    });
  }

  isSelected() {
    return this.state.isSelected ? ' selected' : '';
  }

  render() {
    return (
      <li className={(this.props.navclass + this.isSelected())} onClick={this.handleClick.bind(this)}>
        {this.props.navitem}
      </li>
    );
  }
}

MenuItem.propTypes = {
  navitem: PropTypes.string.isRequired,
  navclass: PropTypes.string.isRequired
};

export default MenuItem;
