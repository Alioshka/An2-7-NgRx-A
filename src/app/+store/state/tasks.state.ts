import { Task } from './../../models/task';

export interface TasksState {
  data: Array<Task>;
  loading: boolean;
  loaded: boolean;
  error: Error | string;
}

export const intitialState: TasksState = {
  data: [],
  loading: false,
  loaded: false,
  error: null
};
