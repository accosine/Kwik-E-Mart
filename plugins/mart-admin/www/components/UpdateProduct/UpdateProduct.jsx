import React from 'react';
import Router from 'react-router';
import WebAPI from '../../util/WebAPI';
import serialize from 'form-serialize';
import toId from 'to-id';

import ProductForm from '../Forms/ProductForm.jsx';
import ProductStore from '../../stores/ProductStore.js';
import AppActions from '../../actions/AppActions';

const url1 = new WebAPI('http://192.168.178.6:8080/admin');

function getProductState(productID) {
  return {
    product: ProductStore.get(productID)
  };
}

export default class UpdateProduct extends React.Component {

  constructor(...args) {
    super(...args);
    this._handleChange = this._handleChange.bind(this);
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

  render() {
    return (
      <div>
        <h3>Update</h3>
        <ProductForm ref='productForm' product={this.state}  />
        <br/>
      </div>
    );
  }


/*eslint no-alert: 0 */
  static willTransitionFrom(transition, element) {
    if (element.refs.productForm._hasChanges()) {
      if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
        transition.abort();
      }
    }
  }

  static willTransitionTo(transition, params, query) {
    let productID = params.productid.split('product-')[1];
    AppActions.getProduct(productID);
  }

  handleSubmit(event) {
    event.preventDefault();
    let serialized = serialize(this.refs.productForm.getDOMNode(), { hash: true });
    // TODO: check if fields are empty
    let productId = toId(this.refs.productName.getDOMNode().value);
    url1.createUpdate(productId, serialized, (err, response) => {
      console.log(err);
      console.log(response);
    });
  }
}


UpdateProduct.defaultProps = {product: {title: "Empty"}};
UpdateProduct.contextTypes = { router: React.PropTypes.func };
