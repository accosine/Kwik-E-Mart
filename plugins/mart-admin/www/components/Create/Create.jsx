import React from 'react';
import WebAPI from '../../util/WebAPI';
import serialize from 'form-serialize';
import toId from 'to-id';

const url1 = new WebAPI('http://192.168.178.6:8080/admin');

export default class Create extends React.Component {
  render() {
    return (
      <div>
        <h3>Create</h3>
        <form onSubmit={this.handleSubmit.bind(this)} ref="productForm">
          <label htmlFor="productName">Product Name</label>
          <input defaultValue="ohai" id="productName" name="title" ref="productName" type="text" />
          <label htmlFor="productPrice">Price</label>
          <input defaultValue="ohai" name="price" ref="productPrice" type="text" />
          <label htmlFor="productDescription">Description</label>
          <input defaultValue="ohai" name="description" ref="productDescription" type="text" />
          <label htmlFor="productCategories">Categories</label>
          <input defaultValue="ohai" name="categories[]" ref="productCategories" type="text" />
          <input type="submit" value="go" />
        </form>
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

  handleSubmit(event) {
    event.preventDefault();
    let serialized = serialize(this.refs.productForm.getDOMNode(), { hash: true });
    // TODO: check if fields are empty
    let productId = toId(this.refs.productName.getDOMNode().value);
    url1.createProduct(productId, serialized, (err, response) => {
      console.log(err);
      console.log(response);
    });
  }
}

Create.contextTypes = { router: React.PropTypes.func };
