import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  ITEM_SELECTED,
  ITEM_DESELECTED,
  ITEMS_GET_SUCCESS,
  ITEMS_GET_ERROR
} from '../constants/AppConstants';

const items = [{ id: 1, label: 'Item 1' },
               { id: 2, label: 'Item 2' },
               { id: 3, label: 'Item 3' },
               { id: 4, label: 'Item 4' }];

export default {

  selectItem(item) {
    AppDispatcher.dispatch({
      actionType: ITEM_SELECTED,
      item: item
    });
  },

  deSelectItem(item) {
    AppDispatcher.dispatch({
      actionType: ITEM_DESELECTED,
      item: item
    });
  },

  getItems() {
    AppDispatcher.dispatch({
      actionType: ITEMS_GET_SUCCESS,
      items: items
    });
  }
}
