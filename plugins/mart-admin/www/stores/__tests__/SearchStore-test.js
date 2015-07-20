jest.dontMock('keymirror');
jest.dontMock('../SearchStore');
jest.dontMock('../../constants/AppConstants');

describe('SearchStore', function() {

  let AppConstants = require('../../constants/AppConstants');
  let AppDispatcher;
  let SearchStore;
  let dispatch;

  // mock all relevant actions
  let actionSearchTyped = {
    actionType: AppConstants.API_SEARCH_TYPED,
    searchResults: {
      status: AppConstants.REQUEST_SUCCESS,
      body: { hits: [], total: 0 }
    }
  };

  let actionSearchCleared = {
    actionType: AppConstants.SEARCH_RESULTS_CLEARED
  };

  let actionUnrelated = {
    actionType: AppConstants.API_PRODUCT_REQUESTED,
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    SearchStore = require('../SearchStore');
    // According to Facebook, this is 'one weird trick' >_<
    dispatch = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('returns empty object if nothing has been searched so far', function() {
    let searchResults = SearchStore.get();
    expect(searchResults).toEqual({});
  });

  it('types a search', function() {
    dispatch(actionSearchTyped);
    let searchResults = SearchStore.get();
    expect(searchResults).toEqual(actionSearchTyped.searchResults);
  });

  it('types a search and clears the store afterwards', function() {
    dispatch(actionSearchTyped);
    dispatch(actionSearchCleared);
    let searchResults = SearchStore.get();
    expect(searchResults).toEqual({});
  });

  it('registers a function with the changeListener and calls it', function() {
     let callback = jest.genMockFunction();
     SearchStore.addChangeListener(callback);
     dispatch(actionSearchTyped);
     expect(callback).toBeCalled();
  });

  it('unregisters a function with the changeListener ensures it is not called',
       function() {
     let callback = jest.genMockFunction();
     SearchStore.addChangeListener(callback);
     dispatch(actionSearchTyped);
     let emitIncidents = callback.mock.calls.length;

     SearchStore.removeChangeListener(callback);
     dispatch(actionSearchTyped);
     expect(emitIncidents).toEqual(callback.mock.calls.length);
  });

  it('puts a product into the store and removes it', function() {
    SearchStore.set = jest.genMockFunction();
    SearchStore.clear = jest.genMockFunction();

    dispatch(actionUnrelated);
    expect(SearchStore.set).not.toBeCalled();
    expect(SearchStore.clear).not.toBeCalled();
  });

});
