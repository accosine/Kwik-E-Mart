import React from 'react';
import WebAPI from '../../util/WebAPI';
import serialize from 'form-serialize';

const url1 = new WebAPI('http://192.168.178.6:8080');

export default class Create extends React.Component {
  render() {
    return (
      <div>
        <h3>Create</h3>
        <form onSubmit={this.handleSubmit.bind(this)} ref="productForm">
          <input defaultValue="ohai" name="productName" ref="productName" type="text" />
          <input defaultValue="ohai" name="productPrize" ref="productPrize" type="text" />
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
    url1.setProduct('/produkt123', serialized, (err, response) => {
      console.log(err);
      console.log(response);
    });
  }
}

Create.contextTypes = { router: React.PropTypes.func };
