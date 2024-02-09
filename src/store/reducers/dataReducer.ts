import { TaskType } from '../../types/Task.d';
import { formatDate } from '../../utils/Date';

export type State = {
  data: TaskType[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

const sortByHours = (collection: TaskType[]) => {
  const sortedCollection = collection.sort((a: TaskType, b: TaskType) => {
    return (
      new Date(
        `1970-01-01T${formatDate(a.startTime as number) as string}`
      ).getTime() -
      new Date(
        `1970-01-01T${formatDate(b.startTime as number) as string}`
      ).getTime()
    );
  });

  return sortedCollection;
};

const dataReducer = (state = initialState, action: Action) => {
  console.log('🚀 ~ dataReducer ~ action:', action);
  console.log('🚀 ~ dataReducer ~ state:', state);
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
