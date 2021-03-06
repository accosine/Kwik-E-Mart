//Use keymirror, if you end up with a lot of constants you will save some chars
import keymirror from 'keymirror';

export default keymirror({
  API_SEARCH_TYPED: null,
  API_PRODUCT_REQUESTED: null,
  API_PRODUCT_UPDATED: null,
  API_PRODUCT_CREATED: null,
  API_PRODUCT_DELETED: null,

  REQUEST_PENDING: null,
  REQUEST_TIMEOUT: null,
  REQUEST_ERROR: null,
  REQUEST_SUCCESS: null,

  SEARCH_RESULTS_UPDATED: null,
  SEARCH_RESULTS_CLEARED: null,
  PRODUCT_UPDATED: null,
  PRODUCT_CLEARED: null,
  PRODUCT_REMOVED: null
});
