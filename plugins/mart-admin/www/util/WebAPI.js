import request from 'superagent';

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
    .get(this.URL + productID)
    .end(cb);
  }

  setProduct(productID, product, cb) {
    request
    .post(this.URL + productID)
    .send(product)
    .end(cb);
  }

}
