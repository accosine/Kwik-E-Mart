'use strict';

jest.dontMock('../Footer.jsx');
describe('Footer', () => {
  it('Should have the correct css class', () => {
    let React = require('react/addons');
    let Footer = require('../Footer.jsx');
    let { TestUtils } = React.addons;

    let footer = TestUtils.renderIntoDocument(
      <Footer />
    );
    let footerElem = React.findDOMNode(footer);
    expect(footerElem.className).toEqual('footer');
  });
});
