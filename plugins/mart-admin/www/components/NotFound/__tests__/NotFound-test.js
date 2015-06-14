'use strict';

jest.dontMock('../NotFound.jsx');

describe('NotFound', () => {
  it('Should have the correct css class', () => {

    // TODO: Use ES6 import syntax as soon as babel supports it (again)
    //import NotFound from '../NotFound.jsx';
    let NotFound = require('../NotFound.jsx');

    // TODO: Use ES6 import syntax as soon as babel supports it (again)
    //import NotFound from '../NotFound.jsx';
    let React = require('react/addons');

    let { TestUtils } = React.addons;
    let notFound = TestUtils.renderIntoDocument(
      <NotFound />
    );
    let notFoundElem = React.findDOMNode(notFound);
    expect(notFoundElem.className).toEqual('notFound');
  });
});
