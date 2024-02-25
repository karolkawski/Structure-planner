import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store/store'; // Import your Redux store
import App from './App';

test('Should render root app in document', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
