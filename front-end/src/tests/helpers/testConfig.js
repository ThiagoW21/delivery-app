import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Store from '../../redux/store';

export default function renderWithRouterAndStore(
  ui,
  {
    store = Store,
    route = '/',
    ...renderOptions
  } = {},
) {
  const history = createMemoryHistory();

  const wrapper = ({ children }) => (
    <Provider store={ store }>
      <MemoryRouter history={ history } initialEntries={ [route] }>
        {children}
      </MemoryRouter>
    </Provider>
  );

  return { ...history, ...store, ...render(ui, { wrapper, ...renderOptions }) };
}
