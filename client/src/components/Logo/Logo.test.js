import React from 'react';
import { shallow, render } from 'enzyme';

import Logo from './Logo';


/**
 * Get default component's props
 * @returns {object} - props
 */
function getDefaultProps() {
  return {
    classes: {},
    dispatch: jest.fn(),
    type: 'success',
    message: 'test message',
  };
}

describe('<Logo/>', () => {
  test('renders without error', () => {
    const props = getDefaultProps();
    shallow(<Logo {...props}/>);
  });

  test('render successfully', () => {
    const props = getDefaultProps();

    const wrapper = render(
      <Logo {...props} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
