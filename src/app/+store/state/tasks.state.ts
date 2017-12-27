import { Task } from './../../models/task';

export interface TasksState {
  data: ReadonlyArray<Task>;
  loading: boolean;
  loaded: boolean;
  error: Error | string;
}

export const intitialTasksState: TasksState = {
  data: [],
  loading: false,
  loaded: false,
  error: null
};
