import { API_URL_PRODUCT_PATH, API_URL_SEARCH_PATH } from '../config';
import request from 'superagent';

let products = API_URL_PRODUCT_PATH;
let search = API_URL_SEARCH_PATH;

export default class WebAPI {
  constructor(URL) {
    this.URL = URL;
  }

  setURL(URL) {
    this.URL = URL;
  }

  getURL() {
    return this.URL;
  }

  getProduct(productID, cb) {
    request
    .get(this.URL + '/' + products + '/' + productID)
    .end(cb);
  }

  search(type, q, cb) {
    request
    .get(this.URL + '/' + search)
    .query({ type })
    .query({ q })
    .end(cb);
  }
}
