import React from 'react';
import { shallow, render } from 'enzyme';

import { Alert } from './Alert';
import { alertActions } from '../../actions';


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

describe('<Alert/>', () => {
  test('renders without error', () => {
    const props = getDefaultProps();
    shallow(<Alert {...props}/>);
  });

  test('Render successfully', () => {
    const props = getDefaultProps();

    const wrapper = render(
      <Alert {...props} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('dispatch alert close action', () => {
    const props = getDefaultProps();
    const wrapper = shallow(<Alert {...props}/>);
    wrapper.instance().handleClose();
    expect(props.dispatch).toHaveBeenCalledWith(alertActions.clear());
  });

});

