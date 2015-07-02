import React from 'react';
import Router from 'react-router';

import AppActions from '../../actions/AppActions';

import ProductForm from '../Forms/ProductForm.jsx';
import ProductStore from '../../stores/ProductStore.js';

function getProductState(productID) {
  return {
    product: ProductStore.get(productID)
  };
}

export default class UpdateProduct extends React.Component {

  constructor(...args) {
    super(...args);
    this._handleChange = this._handleChange.bind(this);
    this._formHasChanged = this._formHasChanged.bind(this);
    this._formHasSubmitted = this._formHasSubmitted.bind(this);
    this.formDelta = new Set();
  }

  componentDidMount() {
    ProductStore.addChangeListener(this._handleChange);
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._handleChange);
  }

  _handleChange() {
    let { router } = this.context;
    let productID = this.context.router.getCurrentParams().productid;
    this.setState(getProductState(productID));
  }

  _formHasChanged(e) {
    if (this.state.product[e.target.name].toString() !== e.target.value) {
      this.formDelta.add(e.target.name);
    }
    else {
      this.formDelta.delete(e.target.name);
    }
  }

  _formHasSubmitted(serialized) {
    let productID = this.props.params.productid.split('product-')[1];
    AppActions.updateProduct(productID, serialized);
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

  static willTransitionTo(transition, params, query) {
    let productID = params.productid.split('product-')[1];
    AppActions.getProduct(productID);
  }

  render() {
    return (
      <div>
        <h3>Update</h3>
        <ProductForm formHasChanged={this._formHasChanged} formHasSubmitted={this._formHasSubmitted} product={this.state} ref='productForm' />
        <br/>
      </div>
    );
  }
}

UpdateProduct.defaultProps = {product: {title: 'Empty'}};
UpdateProduct.propTypes = {
  params: React.PropTypes.object.isRequired
};
UpdateProduct.contextTypes = { router: React.PropTypes.func };
