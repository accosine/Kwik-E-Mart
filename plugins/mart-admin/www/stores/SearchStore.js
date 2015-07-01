import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  API_SEARCH_TYPED,
  REQUEST_PENDING,
  SEARCH_RESULTS_UPDATED,
  SEARCH_RESULTS_CLEARED
} from '../constants/AppConstants';

class SearchStore extends EventEmitter {

  constructor() {
    super();
    this.data = {};
  }

  set(result) {
    this.data = result;
    this.emitChange();
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

let searchStore = new SearchStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case API_SEARCH_TYPED:
      searchStore.set(action.searchResults);
      break;
    case SEARCH_RESULTS_CLEARED:
      searchStore.clear();
      break;
    default:
  }
});

export default searchStore;
