import React from 'react';
import ReactDOM from 'react-dom';
import MemoryRouter from 'react-router-dom/MemoryRouter';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './helpers';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    </Provider>,
    div,
  );
});
