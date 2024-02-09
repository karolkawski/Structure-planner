import { TaskType } from '../../types/Task.d';
import { sortByHours } from '../../utils/Sort';
import { Action } from '../Action.d';
import { State } from '../State.d';

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

const dataReducer = (state = initialState, action: Action) => {
  switch (action.type) {
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

      return { ...state, loading: false, data: mergedData, error: null };

    case 'FETCH_DATA_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_DATA':
      const newAddedData: TaskType[] = [...state.data, action.payload];

      const sortedNewData = sortByHours(newAddedData);
      return {
        ...state,
        loading: false,
        data: sortedNewData,
        error: null,
      };
    case 'UPDATE_DATA':
      const updatedData = state.data.map((item: TaskType) =>
        item.id === action.payload.id ? action.payload : item
      );

      const sortedUpdatedData = sortByHours(updatedData);

      return {
        ...state,
        loading: false,
        data: sortedUpdatedData,
        error: null,
      };
    case 'REMOVE_DATA':
      const removeData = state.data.filter(
        (item: TaskType) => item.id !== action.payload
      );

      return {
        ...state,
        loading: false,
        data: removeData,
        error: null,
      };
    default:
      return state;
  }
};

export default dataReducer;
