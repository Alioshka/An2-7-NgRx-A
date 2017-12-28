import { Task } from './../../models/task';

export interface TasksState {
  data: ReadonlyArray<Task>;
  selectedTask: Readonly<Task>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const inititialTasksState: TasksState = {
  data: [],
  selectedTask: null,
  loading: false,
  loaded: false,
  error: null
};


