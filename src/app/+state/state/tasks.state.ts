import { Task } from './../../models/task';

export interface TasksState {
  data: Array<Task>;
  error: string;
}

export const intitialState: TasksState = {
  data: [],
  error: null
};
