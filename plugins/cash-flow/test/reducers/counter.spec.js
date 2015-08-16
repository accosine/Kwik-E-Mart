import expect from 'expect';
import reducer from '../../www/reducers/counter';
import * as types from '../../www/constants/ActionTypes';

describe('counter reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(0);
  });

  it('should handle INCREMENT_COUNTER', () => {
    expect(
      reducer(0, {
        type: types.INCREMENT_COUNTER
      })
    ).toEqual(1);
  });
});
