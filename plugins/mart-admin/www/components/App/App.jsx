import React from 'react';
import Body from '../Body/Body';
import Footer from '../Footer/Footer';
import ContentFormStore from '../../stores/ContentFormStore' ;
import AppActions from '../../actions/AppActions';

function getAppState() {
  return {
    selectedNavItem: ContentFormStore.get()
  };
}

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getAppState();
  }

  componentDidMount() {
    ContentFormStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    ContentFormStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getAppState());
  }

  render() {
    return (
      <div className={'app'}>
        <Body
          selectedNavItem={this.state.selectedNavItem} />
        <Footer />
      </div>
    );
  }
}

