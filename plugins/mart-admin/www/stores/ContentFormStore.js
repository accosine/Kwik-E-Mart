import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  NAVIGATION_CLICKED
} from '../constants/AppConstants';

class ContentFormStore extends EventEmitter {

  constructor(...args) {
    super(...args);
    this.selectedItem = 'leer';
  }

  set(navitem) {
    this.selectedItem = navitem;
    this.emitChange();
  }

  get() {
    return this.selectedItem;
  }

  emitChange() {
    this.emit(NAVIGATION_CLICKED);
  }

  addChangeListener(callback) {
    this.on(NAVIGATION_CLICKED, callback);
  }
}

let store = new ContentFormStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case NAVIGATION_CLICKED:
      store.set(action.navitem);
      break;
    default:
  }
});

export default store;
