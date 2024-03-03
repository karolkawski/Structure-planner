import { TaskType } from '../../types/Task.d';
import { sortByHours } from '../../utils/Sort';
import { Action } from '../Action.d';
import { State } from '../State.d';
import {
  getStateFromLocalStorage,
  saveStateToLocalStorage,
} from '../../utils/LocalStorage';
import { calculateBlockedHours } from './utils/calculateBlockedHours';

const isDemo = false;

const initialState: State = {
  data: [],
  blockedHours: [],
  isDemo: isDemo, //loading prepared dataset
  loading: false,
  error: null,
};

const dataReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'FETCH_LOCALSTORAGE_DATA':
      const gettedState = getStateFromLocalStorage('plannerState');

      if (gettedState) {
        const sorted = sortByHours(gettedState.data);
        const hours = calculateBlockedHours(sorted);

        return {
          ...state,
          loading: false,
          data: sorted,
          error: null,
          blockedHours: hours,
        };
      } else {
        return {
          ...state,
          loading: false,
          data: [],
          error: null,
          blockedHours: [],
        };
      }

    case 'FETCH_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_DATA_SUCCESS':
      if (state.data && !state.loading) {
        return;
      }
      const newData = action.payload;
      const mergedData = state.data
        ? [...new Set<TaskType[]>([...state.data, ...newData])]
        : newData;

      const sortedData = sortByHours(mergedData);
      const mergedBlocks = calculateBlockedHours(sortedData);

      return {
        ...state,
        loading: false,
        data: sortedData,
        error: null,
        blockedHours: mergedBlocks,
      };

    case 'FETCH_DATA_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'SET_ALL_UNDONE':
      const newUndoneTasks = state.data.map((item: TaskType) => {
        item.isDone = false;
        return item;
      });
      const newState = {
        ...state,
        data: newUndoneTasks,
      };
      !isDemo && saveStateToLocalStorage('plannerState', newState);

      return newState;
    case 'ADD_DATA':
      const newAddedData: TaskType[] = [...state.data, action.payload];

      const sortedNewData = sortByHours(newAddedData);
      const newMergedBlocks = calculateBlockedHours(sortedNewData);
      const newObject = {
        ...state,
        loading: false,
        data: sortedNewData,
        blockedHours: newMergedBlocks,
        error: null,
      };

      !isDemo && saveStateToLocalStorage('plannerState', newObject);

      return newObject;
    case 'UPDATE_DATA':
      const updatedData = state.data.map((item: TaskType) =>
        item.id === action.payload.id ? action.payload : item
      );

      const sortedUpdatedData = sortByHours(updatedData);
      const removedMergedBlocks = calculateBlockedHours(sortedUpdatedData);

      const newUpdatedObject = {
        ...state,
        loading: false,
        data: sortedUpdatedData,
        blockedHours: removedMergedBlocks,
        error: null,
      };

      !isDemo && saveStateToLocalStorage('plannerState', newUpdatedObject);

      return newUpdatedObject;
    case 'REMOVE_DATA':
      const removeData = state.data.filter(
        (item: TaskType) => item.id !== action.payload
      );

      const removedNewObject = {
        ...state,
        loading: false,
        data: removeData,
        error: null,
        blockedHours: [],
      };
      !isDemo && saveStateToLocalStorage('plannerState', removedNewObject);

      return removedNewObject;
    default:
      return state;
  }
};

export default dataReducer;
