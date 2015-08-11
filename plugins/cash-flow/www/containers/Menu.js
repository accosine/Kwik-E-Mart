import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Menu extends Component {

  static propTypes = {
    children: React.PropTypes.element,
  };

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        { " " }
        <Link to="/counter">Counter</Link>
        { " " }
        <Link to="/front">Front</Link>
        { this.props.children || <div>Homepage</div> }
      </div>
    );
  }
}
