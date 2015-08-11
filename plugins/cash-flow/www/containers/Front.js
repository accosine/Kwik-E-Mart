import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProductView from '../components/ProductView';
import * as FrontActions from '../actions/FrontActions';

@connect(state => ({
  front: state.front,
}))
export default class Front extends Component {
  render() {
    const { front, dispatch } = this.props;
    return (
      <ProductView front={front}
               {...bindActionCreators(FrontActions, dispatch)} />
    );
  }
}
