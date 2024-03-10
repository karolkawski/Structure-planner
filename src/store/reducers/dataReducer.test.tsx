import dataReducer from './dataReducer';
import { Action } from '../Action.d';
import { State } from '../State.d';

const initialState: State = {
  data: [],
  blockedHours: [],
  loading: false,
  error: null,
};

describe('dataReducer', () => {
  it('Should return the initial state', () => {
    expect(dataReducer(undefined, {} as Action)).toEqual(initialState);
  });
});
