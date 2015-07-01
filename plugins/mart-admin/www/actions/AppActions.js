import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

const api = new WebAPI('http://192.168.178.6:8080/admin');

import {
  API_SEARCH_TYPED,
  API_PRODUCT_REQUESTED,
  API_PRODUCT_UPDATED,
  REQUEST_PENDING,
  REQUEST_TIMEOUT,
  REQUEST_ERROR,
  SEARCH_RESULTS_CLEARED
} from '../constants/AppConstants';

export default {

  getSearchResults(searchQuery) {
    let payload = {
      actionType: API_SEARCH_TYPED,
      searchResults: REQUEST_PENDING
    };
    AppDispatcher.dispatch(payload);

    //TODO: abort pending requests

    api.search('product', searchQuery, (err, response) => {
      if (err && err.timeout) {
        payload.searchResults = REQUEST_TIMEOUT;
      } else if (response && !response.ok) {
        payload.searchResults = REQUEST_ERROR;
      } else {
        payload.searchResults = response.body;
      }

      AppDispatcher.dispatch(payload);
    });
  },

  clearSearchResults() {
    let payload = {
      actionType: SEARCH_RESULTS_CLEARED
    };
    AppDispatcher.dispatch(payload);
  },

  updateProduct(productID, product) {
    let payload = {
      actionType: API_PRODUCT_UPDATED,
      product: REQUEST_PENDING
    };
    AppDispatcher.dispatch(payload);

    //TODO: abort pending requests

    api.updateProduct(productID, product, (err, response) => {
      if (err && err.timeout) {
        payload.response = REQUEST_TIMEOUT;
      } else if (response && !response.ok) {
        payload.response = REQUEST_ERROR;
      } else {
        payload.response = response.body;
      }

      AppDispatcher.dispatch(payload);
    });
  },

  getProduct(productID) {
    let payload = {
      actionType: API_PRODUCT_REQUESTED,
      product: REQUEST_PENDING
    };
    AppDispatcher.dispatch(payload);

    //TODO: abort pending requests

    api.getProduct(productID, (err, response) => {
      if (err && err.timeout) {
        payload.product = REQUEST_TIMEOUT;
      } else if (response && !response.ok) {
        payload.product = REQUEST_ERROR;
      } else {
        payload.product = response.body;
      }

      AppDispatcher.dispatch(payload);
    });
  }

};
