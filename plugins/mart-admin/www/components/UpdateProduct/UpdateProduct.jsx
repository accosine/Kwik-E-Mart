import React from 'react';
import Router from 'react-router';

import AppActions from '../../actions/AppActions';
import ProductStore from '../../stores/ProductStore.js';

import ProductForm from '../Forms/ProductForm.jsx';

function getProductState(productID) {
  return {
    product: ProductStore.get(productID)
  };
}

export default class UpdateProduct extends React.Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = {};
    this.formDelta = new Set();
  }

  componentDidMount() {
    ProductStore.addChangeListener(this._handleChange);
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._handleChange);
  }

  _handleChange = () => {
    let { router } = this.context;
    let productID = this.props.params.productid;
    this.setState(getProductState(productID));
  }

  _formHasChanged = (e) => {
    if (this.state.product[e.target.name].toString() !== e.target.value) {
      this.formDelta.add(e.target.name);
    }
    else {
      this.formDelta.delete(e.target.name);
    }
  }

  _formHasSubmitted = (serialized) => {
    let productID = this.props.params.productid;
    AppActions.updateProduct(productID, serialized);
    this.formDelta.clear();
    this.context.router.transitionTo('/');
  }

/*eslint no-alert: 0 */
  routerWillLeave(nextState, router) {
    if (this.formDelta.size) {
      if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
        router.cancelTransition();
      }
    }
  }

  componentWillMount() {
    let productID = this.props.params.productid;
    AppActions.getProduct(productID);
  }

  render() {
    return (
      <div>
        <h3>Update</h3>
        <ProductForm formHasChanged={this._formHasChanged} formHasSubmitted={this._formHasSubmitted} product={this.state.product ? this.state.product : ''} ref='productForm' />
        <br/>
      </div>
    );
  }
}
