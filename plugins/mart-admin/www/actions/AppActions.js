import { API_URL } from '../config';
import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

const api = new WebAPI(API_URL);

import {
  API_SEARCH_TYPED,
  API_PRODUCT_REQUESTED,
  API_PRODUCT_UPDATED,
  API_PRODUCT_CREATED,
  API_PRODUCT_DELETED,
  REQUEST_PENDING,
  REQUEST_TIMEOUT,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SEARCH_RESULTS_CLEARED
} from '../constants/AppConstants';

export default {

  getSearchResults(searchQuery) {
    let prePayload = {
      actionType: API_SEARCH_TYPED,
      searchResults: { status: REQUEST_PENDING }
    };

    AppDispatcher.dispatch(prePayload);

    //TODO: abort pending requests
    let payload = {
      actionType: API_SEARCH_TYPED
    };

    api.search('product', searchQuery, (err, response) => {
      if (err && err.timeout) {
        payload.searchResults = { status: REQUEST_TIMEOUT };
      } else if (response && !response.ok) {
        payload.searchResults = { status: REQUEST_ERROR };
      } else {
        payload.searchResults = { status: REQUEST_SUCCESS, body: response.body };
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
    let prePayload = {
      actionType: API_PRODUCT_UPDATED,
      response: REQUEST_PENDING
    };
    AppDispatcher.dispatch(prePayload);

    //TODO: abort pending requests

    let payload = {
      actionType: API_PRODUCT_UPDATED
    };

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

  createProduct(productID, product) {
    let prePayload = {
      actionType: API_PRODUCT_CREATED,
      response: REQUEST_PENDING
    };
    AppDispatcher.dispatch(prePayload);

    //TODO: abort pending requests

    let payload = {
      actionType: API_PRODUCT_CREATED
    };

    api.createProduct(productID, product, (err, response) => {
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

  deleteProduct(productID) {
    let prePayload = {
      actionType: API_PRODUCT_DELETED,
      response: REQUEST_PENDING
    };
    AppDispatcher.dispatch(prePayload);

    //TODO: abort pending requests

    let payload = {
      actionType: API_PRODUCT_DELETED
    };

    api.deleteProduct(productID, (err, response) => {
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
    let prePayload = {
      actionType: API_PRODUCT_REQUESTED,
      response: REQUEST_PENDING
    };
    AppDispatcher.dispatch(prePayload);

    //TODO: abort pending requests

    let payload = {
      actionType: API_PRODUCT_REQUESTED
    };

    api.getProduct(productID, (err, response) => {
      if (err && err.timeout) {
        payload.response = REQUEST_TIMEOUT;
      } else if (response && !response.ok) {
        payload.response = REQUEST_ERROR;
      } else {
        payload.response = response.body;
      }

      AppDispatcher.dispatch(payload);
    });
  }

};
