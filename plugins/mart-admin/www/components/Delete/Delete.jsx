import React from 'react';

import AppActions from '../../actions/AppActions';
import SearchStore from '../../stores/SearchStore';

import Search from '../Search/Search';

export default class Delete extends React.Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  // TODO: use ES7 transition decorator when available in react-router
  componentDidMount() {
    this.context.router.addTransitionHook(this.routerWillLeave);
  }

  componentWillUnmount() {
    this.context.router.removeTransitionHook(this.routerWillLeave);
  }

  _resultItem = (item) => {
    let doc = item._source.doc;
    return (
      <li key={item._id}>
        <a onClick={this._deleteProduct.bind(this, item._id)}>{doc.title}</a>
      </li>
    );
  }

/*eslint no-alert: 0 */
  _deleteProduct = (productID) => {
    if (confirm('Are you really, REALLY SURE you want to delete this item?')) {
      AppActions.deleteProduct(productID);

      let { router } = this.context;
      router.transitionTo('/');
    }
  }

  routerWillLeave(nextState, router) {
    AppActions.clearSearchResults();
  }

  render() {
    return (
      <div>
        <h3>Delete</h3>
        <Search resultItem={this._resultItem}/>
      </div>
    );
  }

}
