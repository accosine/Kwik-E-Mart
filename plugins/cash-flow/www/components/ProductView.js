import React, { Component, PropTypes } from 'react';

export default class Front extends Component {
  static propTypes = {
    getProductAsync: PropTypes.func.isRequired,
    front: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { getProductAsync } = this.props;
    getProductAsync('Zii_Sports');
  }

  render() {
    const { front } = this.props;
    const { _id, _rev, title, price, description, categories, type } = front;
    return (
      <p className="front">
        ID: {_id}
        <br/>
        Rev: {_rev}
        <br/>
        Title: {title}
        <br/>
        Price: {price}
        <br/>
        Description: {description}
        <br/>
        Categories: {categories}
        <br/>
        Type: {type}
      </p>
    );
  }
}
