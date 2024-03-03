import React from 'react';
import { render, act } from '@testing-library/react';
import { AutoFalseIsDoneFlags } from './AutoFalseIsDoneFlags';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.useFakeTimers();

describe('AutoFalseIsDoneFlags', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('dispatches setAllUndone action when the day changes', () => {
    const currentDate = new Date('2024-03-03T12:00:00');
    jest.spyOn(global, 'Date').mockImplementation(() => currentDate);

    render(
      <Provider store={store}>
        <AutoFalseIsDoneFlags />
      </Provider>
    );

    act(() => {
      jest.advanceTimersByTime(24 * 60 * 60 * 1000);
    });

    expect(store.getActions()).toEqual([{ type: 'SET_ALL_UNDONE' }]);
  });
});
