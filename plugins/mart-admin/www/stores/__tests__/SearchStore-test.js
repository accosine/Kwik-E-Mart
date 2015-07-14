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

});
