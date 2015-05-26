import React from 'react';
import {RouteHandler} from 'react-router';

import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
//import ContentFormStore from '../../stores/ContentFormStore' ;
import AppActions from '../../actions/AppActions';

//function getAppState() {
  //return {
    //selectedNavItem: ContentFormStore.get()
  //};
//}

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    //this.state = getAppState();
  }

  componentDidMount() {
    //ContentFormStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    //ContentFormStore.removeChangeListener(this.onChange);
  }

  onChange() {
    //this.setState(getAppState());
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
