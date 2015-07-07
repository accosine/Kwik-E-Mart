//  Webpack will inject a 'config' variable into the scope of this module
import request from 'superagent';

let products = config.API_URL_PRODUCT_PATH;
let search = config.API_URL_SEARCH_PATH;

export default class WebAPI{
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

  createProduct(productID, product, cb) {
    request
    .post(this.URL + '/' + products + '/' + productID)
    .send(product)
    .end(cb);
  }

  updateProduct(productID, product, cb) {
    request
    .put(this.URL + '/' + products + '/' + productID)
    .send(product)
    .end(cb);
  }

  deleteProduct(productID, cb) {
    request
    .del(this.URL + '/' + products + '/' + productID)
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
