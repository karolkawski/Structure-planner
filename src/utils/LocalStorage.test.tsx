import { State } from '../store/State.d';
import {
  saveStateToLocalStorage,
  getStateFromLocalStorage,
} from './LocalStorage';

const storageKey = 'test-LS-data';
const testState: State = {
  data: [],
  blockedHours: [],
  isDemo: false,
  loading: false,
  error: null,
};
describe('localstorage test', () => {
  test('Should getStateFromLocalStorage return undefined before being set', () => {
    expect(getStateFromLocalStorage(storageKey)).toBe(undefined);
  });
  test('Should getStateFromLocalStorage return testState after being set with setStateFromLocalStorage', () => {
    saveStateToLocalStorage(storageKey, testState);
    expect(getStateFromLocalStorage(storageKey)).toEqual(testState);
  });

  test('Should getStateFromLocalStorage return undefined for missing key', () => {
    expect(getStateFromLocalStorage('missing-key')).toBe(undefined);
  });
});
