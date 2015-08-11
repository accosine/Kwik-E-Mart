import expect from 'expect';
import * as actions from '../../www/actions/CounterActions';
import * as types from '../../www/constants/ActionTypes';

describe('actions', () => {
  it('should create an action to increment the counter', () => {
    const expectedAction = {
      type: types.INCREMENT_COUNTER,
    };
    expect(actions.increment()).toEqual(expectedAction);
  });
});
