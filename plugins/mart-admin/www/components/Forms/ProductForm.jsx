import React from 'react';
import serialize from 'form-serialize';

export default class ProductForm extends React.Component {

  static propTypes = {
    formHasChanged: React.PropTypes.func.isRequired,
    formHasSubmitted: React.PropTypes.func.isRequired,
    product: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    product: {title: '', categories: []}
  };

  _onChange(e) {
    this.props.formHasChanged(e);
  }

  _onSubmit(e) {
    e.preventDefault();
    let serialized = serialize(e.target, { hash: true });
    serialized.price = parseFloat(serialized.price);
    // split categories seperated by commas and filter empty elements, finally
    // remove leading and/or trailing whitespace
    serialized.categories = serialized.categories
                              .split(',')
                              .map(el => el.trim())
                              .filter(el => el);
    this.props.formHasSubmitted(serialized);
  }

  render() {
    //TODO: Remove "Request Pending", use spinner component and valid JSX if/else
    if (this.props.product) {
      let product = this.props.product;
      return (
        <form onChange={this._onChange.bind(this)} onSubmit={this._onSubmit.bind(this)} ref="productForm">
          <label htmlFor="productName">Product Name</label>
          <input defaultValue={product.title} id="productName" name="title" ref="productName" type="text" />
          <label htmlFor="productPrice">Price</label>
          <input defaultValue={product.price} id="price" name="price" ref="productPrice" type="number" />
          <label htmlFor="productDescription">Description</label>
          <input defaultValue={product.description} name="description" ref="productDescription" type="text" />
          <label htmlFor="productCategories">Categories</label>
          <input defaultValue={product.categories.join(', ')} name="categories" ref="productCategories" type="text" />
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
