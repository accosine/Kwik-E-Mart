import expect from 'expect';
import jsdomReact from '../../util/jsdomReact';
import React from 'react/addons';
import Counter from '../../www/components/Counter';

const { TestUtils } = React.addons;

function setup() {
  const props = {
    increment: expect.createSpy(),
    incrementIfOdd: expect.createSpy(),
    decrement: expect.createSpy(),
    counter: 0
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Counter {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  jsdomReact();

  describe('Counter', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('p');
      expect(output.props.className).toBe('counter');

      const count = output.props.children[1];
      const incButton = output.props.children[4];
      const decButton = output.props.children[6];
      const incOddButton = output.props.children[8];

      expect(count).toBe(0);
      expect(incButton.type).toBe('button');
      expect(decButton.type).toBe('button');
      expect(incOddButton.type).toBe('button');
    });

    it('should call increment if increment button is clicked', () => {
      const { output, props } = setup();

      const incButton = output.props.children[4];
      const decButton = output.props.children[6];
      const incOddButton = output.props.children[8];

      incButton.props.onClick();
      decButton.props.onClick();
      incOddButton.props.onClick();

      expect(props.increment.calls.length).toBe(1);
      expect(props.decrement.calls.length).toBe(1);
      expect(props.incrementIfOdd.calls.length).toBe(1);
    });
  });
});
