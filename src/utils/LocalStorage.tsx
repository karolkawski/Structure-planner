import { State } from '../store/State.d';

export const saveStateToLocalStorage = (key: string, state: State) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

export const getStateFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error retrieving state from localStorage:', error);
    return undefined;
  }
};
