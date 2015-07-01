import React from 'react';
import Router from 'react-router';
import WebAPI from '../../util/WebAPI';
import serialize from 'form-serialize';
import toId from 'to-id';

import ProductForm from '../Forms/ProductForm.jsx';
import ProductStore from '../../stores/ProductStore.js';
import AppActions from '../../actions/AppActions';

const url1 = new WebAPI('http://192.168.178.6:8080/admin');
let formDelta = false;
    console.log(formDelta);

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
    // console.log(e.target.name, e.target.value);
    if (this.state.product[e.target.name].toString() !== e.target.value) {
      console.log(e.target.name, ' zu Set hinzufügen');
      this.formDelta.add(e.target.name);
    }
    else {
      console.log(e.target.name, ' aus Set löschen');
      this.formDelta.delete(e.target.name);
    }
  }

  _formHasSubmitted(serialized) {
    console.log(serialized);
    let productID = this.props.params.productid.split('product-')[1];
    console.log(productID);
    AppActions.updateProduct(productID, serialized);
  }

/*eslint no-alert: 0 */
  static willTransitionFrom(transition, element) {
    console.log('same old road');
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
        <ProductForm ref='productForm' product={this.state} formHasChanged={this._formHasChanged} formHasSubmitted={this._formHasSubmitted} />
        <br/>
      </div>
    );
  }
}


UpdateProduct.defaultProps = {product: {title: "Empty"}};
UpdateProduct.contextTypes = { router: React.PropTypes.func };
