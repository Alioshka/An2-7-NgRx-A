import { Task } from './../../models/task';

export interface TasksState {
  data: Array<Task>;
  selectedTask: Task;
  loading: boolean;
  loaded: boolean;
  error: Error | string;
}

export const intitialTasksState: TasksState = {
  data: [],
  selectedTask: null,
  loading: false,
  loaded: false,
  error: null
};
