import dataReducer from './dataReducer';
import { Action } from '../Action.d';
import { State } from '../State.d';

const initialState: State = {
  data: [],
  blockedHours: [],
  isDemo: false,
  loading: false,
  error: null,
};

describe('dataReducer', () => {
  it('Should return the initial state', () => {
    expect(dataReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it('Should handle FETCH_LOCALSTORAGE_DATA', () => {});

  it('Should handle FETCH_DATA_REQUEST', () => {});

  it('Should handle FETCH_DATA_SUCCESS', () => {});

  it('Should handle FETCH_DATA_ERROR', () => {});

  it('Should handle SET_ALL_UNDONE', () => {});

  it('Should handle ADD_DATA', () => {});

  it('Should handle UPDATE_DATA', () => {});

  it('Should handle REMOVE_DATA', () => {});
});
