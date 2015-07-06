import React from 'react';
import toID from 'to-id';

import AppActions from '../../actions/AppActions';

import ProductForm from '../Forms/ProductForm.jsx';

export default class Create extends React.Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.func
  };

  constructor(...args) {
    super(...args);
    this._formHasChanged = this._formHasChanged.bind(this);
    this._formHasSubmitted = this._formHasSubmitted.bind(this);
    this.formDelta = new Set();
  }

  _formHasChanged(e) {
    if (e.target.value) {
      this.formDelta.add(e.target.name);
    }
    else {
      this.formDelta.delete(e.target.name);
    }
  }

  _formHasSubmitted(serialized) {
    let productID = toID(serialized.title);
    AppActions.createProduct(productID, serialized);
    this.formDelta.clear();
    let { router } = this.context;
    router.transitionTo('dashboard');
  }

/*eslint no-alert: 0 */
  static willTransitionFrom(transition, element) {
    if (element.formDelta.size) {
      if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
        transition.abort();
      }
    }
  }

  render() {
    return (
      <div>
        <h3>Update</h3>
        <ProductForm formHasChanged={this._formHasChanged} formHasSubmitted={this._formHasSubmitted} ref='productForm' />
        <br/>
      </div>
    );
  }
}
