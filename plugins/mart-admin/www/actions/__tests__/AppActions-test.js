jest.dontMock('keymirror');
jest.dontMock('../../constants/AppConstants');
jest.dontMock('../AppActions');
jest.setMock('../../config', {});


describe('getSearchResults', function(){
  let AppConstants = require('../../constants/AppConstants');
  let AppActions;
  let AppDispatcher;
  let err;
  let response;

  let actionRequestPending = {
    actionType: AppConstants.API_SEARCH_TYPED,
    searchResults: { status: AppConstants.REQUEST_PENDING }
  };

  let actionRequestSuccess = {
    actionType: AppConstants.API_SEARCH_TYPED,
    searchResults: { status: AppConstants.REQUEST_SUCCESS, body: {} }
  };

  let actionRequestTimeout = {
    actionType: AppConstants.API_SEARCH_TYPED,
    searchResults: { status: AppConstants.REQUEST_TIMEOUT}
  };

  let actionRequestError = {
    actionType: AppConstants.API_SEARCH_TYPED,
    searchResults: { status: AppConstants.REQUEST_ERROR}
  };

  beforeEach(function(){
    jest.setMock('../../util/WebAPI', function() {
      this.search = (type, query, cb) => cb(err, response)
    });
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    AppActions = require('../AppActions');
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_SUCCESS"', function(){
    err = null;
    response = { ok: true, body: {} };
    AppActions.getSearchResults('searchstring');
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestSuccess);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_TIMEOUT"', function(){
    err = { timeout: true };
    response = null;
    AppActions.getSearchResults('searchstring');
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestTimeout);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_ERROR"', function(){
    err = null;
    response = { ok: false, body: {} };
    AppActions.getSearchResults('searchstring');
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestError);
  });
});

describe('clearSearchResults', function(){
  let AppConstants = require('../../constants/AppConstants');
  let AppActions;
  let AppDispatcher;

  let actionSearchCleared = {
    actionType: AppConstants.SEARCH_RESULTS_CLEARED
  };

  beforeEach(function(){
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    AppActions = require('../AppActions');
  });

  it('should clear the search results', function(){
    AppActions.clearSearchResults();
    expect(AppDispatcher.dispatch).toBeCalledWith(actionSearchCleared);
  });

});

describe('updateProduct', function(){
  let AppConstants = require('../../constants/AppConstants');
  let AppActions;
  let AppDispatcher;
  let err;
  let response;

  let actionRequestPending = {
    actionType: AppConstants.API_PRODUCT_UPDATED,
    response: AppConstants.REQUEST_PENDING
  };

  let actionRequestSuccess = {
    actionType: AppConstants.API_PRODUCT_UPDATED,
    response: {}
  };

  let actionRequestTimeout = {
    actionType: AppConstants.API_PRODUCT_UPDATED,
    response: AppConstants.REQUEST_TIMEOUT
  };

  let actionRequestError = {
    actionType: AppConstants.API_PRODUCT_UPDATED,
    response: AppConstants.REQUEST_ERROR
  };

  beforeEach(function(){
    jest.setMock('../../util/WebAPI', function() {
      this.updateProduct = (productID, product, cb) => cb(err, response)
    });
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    AppActions = require('../AppActions');
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_SUCCESS"', function(){
    err = null;
    response = { ok: true, body: {} };
    AppActions.updateProduct('productID', {});
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestSuccess);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_TIMEOUT"', function(){
    err = { timeout: true };
    response = null;
    AppActions.updateProduct('productID', {});
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestTimeout);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_ERROR"', function(){
    err = null;
    response = { ok: false, body: {} };
    AppActions.updateProduct('productID', {});
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestError);
  });
});

describe('createProduct', function(){
  let AppConstants = require('../../constants/AppConstants');
  let AppActions;
  let AppDispatcher;
  let err;
  let response;

  let actionRequestPending = {
    actionType: AppConstants.API_PRODUCT_CREATED,
    response: AppConstants.REQUEST_PENDING
  };

  let actionRequestSuccess = {
    actionType: AppConstants.API_PRODUCT_CREATED,
    response: {}
  };

  let actionRequestTimeout = {
    actionType: AppConstants.API_PRODUCT_CREATED,
    response: AppConstants.REQUEST_TIMEOUT
  };

  let actionRequestError = {
    actionType: AppConstants.API_PRODUCT_CREATED,
    response: AppConstants.REQUEST_ERROR
  };

  beforeEach(function(){
    jest.setMock('../../util/WebAPI', function() {
      this.createProduct = (productID, product, cb) => cb(err, response)
    });
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    AppActions = require('../AppActions');
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_SUCCESS"', function(){
    err = null;
    response = { ok: true, body: {} };
    AppActions.createProduct('productID', {});
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestSuccess);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_TIMEOUT"', function(){
    err = { timeout: true };
    response = null;
    AppActions.createProduct('productID', {});
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestTimeout);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_ERROR"', function(){
    err = null;
    response = { ok: false, body: {} };
    AppActions.createProduct('productID', {});
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestError);
  });
});

describe('deleteProduct', function(){
  let AppConstants = require('../../constants/AppConstants');
  let AppActions;
  let AppDispatcher;
  let err;
  let response;

  let actionRequestPending = {
    actionType: AppConstants.API_PRODUCT_DELETED,
    response: AppConstants.REQUEST_PENDING
  };

  let actionRequestSuccess = {
    actionType: AppConstants.API_PRODUCT_DELETED,
    response: {}
  };

  let actionRequestTimeout = {
    actionType: AppConstants.API_PRODUCT_DELETED,
    response: AppConstants.REQUEST_TIMEOUT
  };

  let actionRequestError = {
    actionType: AppConstants.API_PRODUCT_DELETED,
    response: AppConstants.REQUEST_ERROR
  };

  beforeEach(function(){
    jest.setMock('../../util/WebAPI', function() {
      this.deleteProduct = (productID, cb) => cb(err, response)
    });
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    AppActions = require('../AppActions');
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_SUCCESS"', function(){
    err = null;
    response = { ok: true, body: {} };
    AppActions.deleteProduct('productID');
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestSuccess);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_TIMEOUT"', function(){
    err = { timeout: true };
    response = null;
    AppActions.deleteProduct('productID');
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestTimeout);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_ERROR"', function(){
    err = null;
    response = { ok: false, body: {} };
    AppActions.deleteProduct('productID');
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestError);
  });
});

describe('getProduct', function(){
  let AppConstants = require('../../constants/AppConstants');
  let AppActions;
  let AppDispatcher;
  let err;
  let response;

  let actionRequestPending = {
    actionType: AppConstants.API_PRODUCT_REQUESTED,
    response: AppConstants.REQUEST_PENDING
  };

  let actionRequestSuccess = {
    actionType: AppConstants.API_PRODUCT_REQUESTED,
    response: {}
  };

  let actionRequestTimeout = {
    actionType: AppConstants.API_PRODUCT_REQUESTED,
    response: AppConstants.REQUEST_TIMEOUT
  };

  let actionRequestError = {
    actionType: AppConstants.API_PRODUCT_REQUESTED,
    response: AppConstants.REQUEST_ERROR
  };

  beforeEach(function(){
    jest.setMock('../../util/WebAPI', function() {
      this.getProduct = (productID, cb) => cb(err, response)
    });
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    AppActions = require('../AppActions');
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_SUCCESS"', function(){
    err = null;
    response = { ok: true, body: {} };
    AppActions.getProduct('productID');
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestSuccess);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_TIMEOUT"', function(){
    err = { timeout: true };
    response = null;
    AppActions.getProduct('productID');
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestTimeout);
  });

  it('should dispatch two times, first with status "REQUEST_PENDING", second with status "REQUEST_ERROR"', function(){
    err = null;
    response = { ok: false, body: {} };
    AppActions.getProduct('productID');
    let firstDispatch = AppDispatcher.dispatch.mock.calls[0][0];
    let secondDispatch = AppDispatcher.dispatch.mock.calls[1][0];

    expect(firstDispatch).toEqual(actionRequestPending);
    expect(secondDispatch).toEqual(actionRequestError);
  });
});

