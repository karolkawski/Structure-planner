import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

test('Should render root app in document', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const welcomeText = getByText('Daily Planner');
  expect(welcomeText).toBeInTheDocument();
});
