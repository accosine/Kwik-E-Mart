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
    response: { _id: 'Zii_Sports' }
  };

  let actionProductRemoved = {
    actionType: AppConstants.PRODUCT_REMOVED,
    response: { _id: 'Zii_Sports' }
  };

  let actionProductCleared = {
    actionType: AppConstants.PRODUCT_CLEARED
  };

  let actionUnrelated = {
    actionType: AppConstants.API_SEARCH_TYPED
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
    let product = ProductStore.get(actionProductGet.response._id);
    expect(product._id).toEqual(actionProductGet.response._id);
  });

  it('returns false for a non-existing product id', function() {
    dispatch(actionProductGet);
    let product = ProductStore.get('invalid_product_id');
    expect(product).toBe(false);
  });

  it('adds a product to the store and clears store afterwards', function() {
    dispatch(actionProductGet);
    dispatch(actionProductCleared);
    let product = ProductStore.get(actionProductGet.response._id);
    expect(product).toBe(false);
  });

  it('puts a product into the store and removes it', function() {
    dispatch(actionProductGet);
    dispatch(actionProductRemoved);
    let product = ProductStore.get(actionProductGet.response._id);
    expect(product).toBe(false);
  });

  it('registers a function with the changeListener and calls it', function() {
     let callback = jest.genMockFunction();
     ProductStore.addChangeListener(callback);
     dispatch(actionProductGet);
     expect(callback).toBeCalled();
  });

  it('unregisters a function with the changeListener ensures it is not called',
       function() {
     let callback = jest.genMockFunction();
     ProductStore.addChangeListener(callback);
     dispatch(actionProductGet);
     let emitIncidents = callback.mock.calls.length;

     ProductStore.removeChangeListener(callback);
     dispatch(actionProductGet);
     expect(emitIncidents).toEqual(callback.mock.calls.length);
  });

  it('puts a product into the store and removes it', function() {
    ProductStore.set = jest.genMockFunction();
    ProductStore.clear = jest.genMockFunction();
    ProductStore.remove = jest.genMockFunction();

    dispatch(actionUnrelated);
    expect(ProductStore.set).not.toBeCalled();
    expect(ProductStore.clear).not.toBeCalled();
    expect(ProductStore.remove).not.toBeCalled();
  });

});
