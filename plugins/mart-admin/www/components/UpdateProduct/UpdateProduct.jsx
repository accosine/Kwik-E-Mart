import React from 'react';
import Router from 'react-router';
import WebAPI from '../../util/WebAPI';
import serialize from 'form-serialize';
import toId from 'to-id';

import ProductStore from '../../stores/ProductStore.js';
import AppActions from '../../actions/AppActions';

const url1 = new WebAPI('http://192.168.178.6:8080/admin');

function getProductState(productID) {
  return {
    product: ProductStore.get(productID)
  };
}

class ProductForm extends React.Component {

  render() {
    console.log('Props: ', this.props.product);
    if (this.props.product) {
      let product = this.props.product.product;
      return (
        <form /*onSubmit={this.handleSubmit.bind(this)}*/ ref="productForm">
          <label htmlFor="productName">Product Name</label>
          <input defaultValue={product.title} id="productName" name="title" ref="productName" type="text" />
          <label htmlFor="productPrice">Price</label>
          <input defaultValue={product.price} name="price" ref="productPrice" type="text" />
          <label htmlFor="productDescription">Description</label>
          <input defaultValue={product.description} name="description" ref="productDescription" type="text" />
          <label htmlFor="productCategories">Categories</label>
          <input defaultValue={product.categories} name="categories[]" ref="productCategories" type="text" />
          <input type="submit" value="go" />
        </form>
      );
    }
    else {
      return (
        <div>Request Pending</div>
      );
    }
  }

}

export default class UpdateProduct extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    ProductStore.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this.handleChange);
  }

  handleChange() {
    let { router } = this.context;
    let productID = this.context.router.getCurrentParams().productid;
    console.log(productID);
    this.setState(getProductState(productID));
  }

  render() {
    return (
      <div>
        <h3>Update</h3>
        <ProductForm product={this.state} />
        <br/>
      </div>
    );
  }


/*eslint no-alert: 0 */
  static willTransitionFrom(transition, element) {
    if (element.refs.productName.getDOMNode().value !== '') {
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
