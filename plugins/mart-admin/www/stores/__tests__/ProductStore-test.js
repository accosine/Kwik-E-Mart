jest.dontMock('keymirror');
jest.dontMock('../ProductStore');
jest.dontMock('../../constants/AppConstants');

describe('ProductStore', function() {

  var AppConstants = require('../../constants/AppConstants');
  var AppDispatcher;
  var ProductStore;
  var callback;

  // mock actions
  var actionProductGet = {
    actionType: AppConstants.API_PRODUCT_REQUESTED,
    product: {
      _id: 'Zii_Sports',
      _rev: '15-ab17ebb1cf8df94faba527b12ceb9bba',
      categories: ['Electronics'],
      description: 'Zii Sports was a game for the Funtendo Zii. Residents at the Springfield Retirement Castle often...',
      price: 17.99,
      title: 'Zii Sports',
      type: 'product'
    }
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    ProductStore = require('../ProductStore');
    // According to Facebook, this is 'one weird trick' >_<
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  // it('initializes with no to-do items', function() {
  //   var all = TodoStore.getAll();
  //   expect(all).toEqual({});
  // });
  //
  it('fetches a product', function() {
    callback(actionProductGet);
    var product = ProductStore.get(actionProductGet.product._id);
    expect(product._id).toEqual(actionProductGet.product._id);
  });
  //
  // it('destroys a to-do item', function() {
  //   callback(actionTodoCreate);
  //   var all = TodoStore.getAll();
  //   var keys = Object.keys(all);
  //   expect(keys.length).toBe(1);
  //   actionTodoDestroy.id = keys[0];
  //   callback(actionTodoDestroy);
  //   expect(all[keys[0]]).toBeUndefined();
  // });

});
