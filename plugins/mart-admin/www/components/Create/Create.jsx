import React from 'react';
import WebAPI from '../../util/WebAPI';
import serialize from 'form-serialize';

const url1 = new WebAPI('http://192.168.178.6:8080');

export default class Create extends React.Component {
  render() {
    return (
      <div>
        <h3>Create</h3>
        <form ref="productForm" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="productName" ref="productName" defaultValue="ohai" />
          <input type="text" name="productPrize" ref="productPrize" defaultValue="ohai" />
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
