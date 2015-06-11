import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

const api = new WebAPI('http://192.168.178.6:8080');

import {
  API_SEARCH_TYPED,
  REQUEST_PENDING,
  REQUEST_TIMEOUT,
  REQUEST_ERROR
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
        payload.searchResults = REQUEST_TIMOUT;
      } else if (response && !response.ok) {
        payload.searchResults = REQUEST_ERROR;
      } else {
        payload.searchResults = response.body;
      }

      AppDispatcher.dispatch(payload);
    });
  }
};
