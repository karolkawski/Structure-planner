import { TaskType } from '../../types/Task.d';

export const fetchStorageData = () => ({
  type: 'FETCH_LOCALSTORAGE_DATA',
});

export const fetchDataRequest = () => ({
  type: 'FETCH_DATA_REQUEST',
});

export const fetchDataSuccess = (data: TaskType[]) => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: data,
});

export const fetchDataError = (error: string) => ({
  type: 'FETCH_DATA_ERROR',
  payload: error,
});

export const addData = (data: TaskType) => ({
  type: 'ADD_DATA',
  payload: data,
});

export const updateData = (data: TaskType) => ({
  type: 'UPDATE_DATA',
  payload: data,
});

export const removeData = (id: string) => ({
  type: 'REMOVE_DATA',
  payload: id,
});
