import React from 'react';
import Menu from '../Menu/Menu';
import ContentForm from '../ContentForm/ContentForm';

let { PropTypes } = React;

class Body extends React.Component {

  render() {
    return (
      <div className={'body'}>
        <h1>Menu</h1>
        <Menu/>
        <ContentForm selectedNavItem={this.props.selectedNavItem} />
      </div>
    );
  }
}

Body.propTypes = {
  selectedNavItem: PropTypes.string.isRequired
};

export default Body;
