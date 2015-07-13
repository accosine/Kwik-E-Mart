import React from 'react';

import AppActions from '../../actions/AppActions';

import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';

export default class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <Menu/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}
