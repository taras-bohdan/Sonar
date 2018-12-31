import React from 'react';
import { Provider } from 'react-redux';
import { shallow, render } from 'enzyme';

import AppNavBar from '../AppNavBar';
import { store } from '../../../helpers';

describe('<AppNavBar/>', () => {
  test('Renders without error', () => {
    shallow(<AppNavBar/>);
  });

  test('Renders successfully', () => {
    const wrapper = render(<Provider store={store}>
      <AppNavBar/>
    </Provider>);

    expect(wrapper).toMatchSnapshot();
  });
});
