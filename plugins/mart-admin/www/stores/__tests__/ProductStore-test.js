jest.dontMock('keymirror');
jest.dontMock('../ProductStore');
jest.dontMock('../../constants/AppConstants');

describe('ProductStore', function() {

  let AppConstants = require('../../constants/AppConstants');
  let AppDispatcher;
  let ProductStore;
  let dispatch;

  // mock all relevant actions
  let actionProductGet = {
    actionType: AppConstants.API_PRODUCT_REQUESTED,
    product: { _id: 'Zii_Sports' }
  };

  let actionProductRemoved = {
    actionType: AppConstants.PRODUCT_REMOVED,
    product: { _id: 'Zii_Sports' }
  };

  let actionProductCleared = {
    actionType: AppConstants.PRODUCT_CLEARED
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    ProductStore = require('../ProductStore');
    // According to Facebook, this is 'one weird trick' >_<
    dispatch = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('fetches a product', function() {
    dispatch(actionProductGet);
    let product = ProductStore.get(actionProductGet.product._id);
    expect(product._id).toEqual(actionProductGet.product._id);
  });

  it('returns false for a non-existing product id', function() {
    dispatch(actionProductGet);
    let product = ProductStore.get('invalid_product_id');
    expect(product).toBe(false);
  });

  it('adds a product to the store and clears store afterwards', function() {
    dispatch(actionProductGet);
    dispatch(actionProductCleared);
    let product = ProductStore.get(actionProductGet.product._id);
    expect(product).toBe(false);
  });

  it('puts a product into the store and removes it', function() {
    dispatch(actionProductGet);
    dispatch(actionProductCleared);
    let product = ProductStore.get(actionProductGet.product._id);
    expect(product).toBe(false);
  });

});
