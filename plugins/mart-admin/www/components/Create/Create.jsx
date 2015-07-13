import React from 'react';
import toID from 'to-id';

import AppActions from '../../actions/AppActions';

import ProductForm from '../Forms/ProductForm.jsx';

export default class Create extends React.Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(...args) {
    super(...args);
    this.formDelta = new Set();
  }

  // TODO: use ES7 transition decorator when available in react-router
  componentDidMount() {
    this.context.router.addTransitionHook(this.routerWillLeave);
  }

  componentWillUnmount() {
    this.context.router.removeTransitionHook(this.routerWillLeave);
  }

  _formHasChanged = (e) => {
    if (e.target.value) {
      this.formDelta.add(e.target.name);
    }
    else {
      this.formDelta.delete(e.target.name);
    }
  }

  _formHasSubmitted = (serialized) => {
    let productID = toID(serialized.title);
    AppActions.createProduct(productID, serialized);
    this.formDelta.clear();
    this.context.router.transitionTo('/');
  }

/*eslint no-alert: 0 */
  routerWillLeave = (nextState, transition) => {
    if (this.formDelta.size) {
      if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
        transition.abort();
      }
    }
  }

  render() {
    return (
      <div>
        <h3>Create</h3>
        <ProductForm formHasChanged={this._formHasChanged} formHasSubmitted={this._formHasSubmitted} ref='productForm' />
        <br/>
      </div>
    );
  }
}
