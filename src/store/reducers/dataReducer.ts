import { TaskType } from '../../components/Task/Task.d';

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

const dataReducer = (state = initialState, action: Action) => {
  console.log('🚀 ~ dataReducer ~ action:', action);
  console.log('🚀 ~ dataReducer ~ state:', state);
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_DATA_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };

    case 'FETCH_DATA_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_DATA':
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        error: null,
      };
    case 'UPDATE_DATA':
      const updatedData = state.data.map((item: TaskType) =>
        item.id === action.payload.id ? action.payload : item
      );

      return {
        ...state,
        loading: false,
        data: updatedData,
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
