import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  API_PRODUCT_REQUESTED,
  REQUEST_PENDING,
  PRODUCT_CLEARED,
  PRODUCT_REMOVED,
  PRODUCT_UPDATED
} from '../constants/AppConstants';

class ProductStore extends EventEmitter {

  constructor() {
    super();
    this.data = new Map();
  }

  set(product) {
    this.data.set(product._id, product);
    this.emitChange();
  }

  get(productID) {
    return this.data.has(productID) ? this.data.get(productID) : false;
    // return this.data.get(productID);
  }

  remove(productID) {
    this.data.delete(productID);
    this.emitChange();
  }

  clear() {
    this.data.clear();
    this.emitChange();
  }

  emitChange() {
    this.emit(PRODUCT_UPDATED);
  }

  addChangeListener(callback) {
    this.on(PRODUCT_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(PRODUCT_UPDATED, callback);
  }
}

let productStore = new ProductStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case API_PRODUCT_REQUESTED:
      productStore.set(action.product);
      break;
    case PRODUCT_CLEARED:
      productStore.clear();
      break;
    case PRODUCT_REMOVED:
      productStore.remove(action.product._id);
      break;
    default:
  }
});

export default productStore;
