import React from 'react';
import {RouteHandler} from 'react-router';

import AppActions from '../../actions/AppActions';

import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div>
        <Menu/>
        <RouteHandler/>
        <Footer/>
      </div>
    );
  }
}
