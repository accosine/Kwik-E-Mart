import React from 'react';

export default class ProductForm extends React.Component {

  render() {
    if (this.props.product) {
      let product = this.props.product.product;
      return (
        <form onChange={this.props._hasChanged.bind(this)} ref="productForm">
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
