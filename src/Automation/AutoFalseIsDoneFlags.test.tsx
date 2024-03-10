import React from 'react';
import { render, act } from '@testing-library/react';
import { AutoFalseIsDoneFlags } from './AutoFalseIsDoneFlags';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import store from '../store/store';

type StoreType = ReturnType<typeof store>;
declare const global: {
  Date: any;
};

jest.useFakeTimers();

jest.mock('../utils/LocalStorage', () => ({
  getStateFromLocalStorage: jest.fn(() => true),
}));

describe('AutoFalseIsDoneFlags', () => {
  const mockStore = configureStore([]);
  let testStore: StoreType;

  beforeEach(() => {
    testStore = mockStore(store);
    localStorage.clear();
  });

  it('dispatches setAllUndone action when the day changes', () => {
    const realDate = Date;
    const currentDate = new Date('2024-03-03T12:00:00');
    const dateSpy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => currentDate);

    localStorage.setItem('lastRun', '2024-03-02T00:00:00');
    localStorage.setItem('plannerState', JSON.stringify(true));

    render(
      <Provider store={testStore}>
        <AutoFalseIsDoneFlags
          reset={true}
          handleAlert={(alert: string): void => {
            console.log(`Received alert: ${alert}`);
          }}
        />
      </Provider>
    );

    act(() => {
      jest.advanceTimersByTime(0);
    });

    act(() => {
      jest.advanceTimersByTime(24 * 60 * 60 * 1000);
    });

    dateSpy.mockReset();
    global.Date = realDate;

    expect(testStore.getActions()).toEqual([{ type: 'SET_ALL_UNDONE' }]);
  });
});
