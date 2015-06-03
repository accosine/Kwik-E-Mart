import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  API_SEARCH_TYPED,
  REQUEST_PENDING,
  SEARCH_RESULTS_UPDATED
} from '../constants/AppConstants';

class SearchStore extends EventEmitter {

  constructor() {
    this.data = { body : { hits: { total: 0 }}};
  }

  set(result) {
    if(result !== REQUEST_PENDING) {
      this.data = result;
      this.emitChange();
    }
  }

  get() {
    return this.data;
  }

  clear() {
    this.data = {};
    this.emitChange();
  }

  emitChange() {
    this.emit(SEARCH_RESULTS_UPDATED);
  }

  addChangeListener(callback) {
    this.on(SEARCH_RESULTS_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(SEARCH_RESULTS_UPDATED, callback);
  }
}

let store = new SearchStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case API_SEARCH_TYPED:
      store.set(action.searchResults);
      break;
    default:
  }
});

export default store;
