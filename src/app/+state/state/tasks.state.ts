import { Task } from './../../models/task';

export interface TasksState {
  data: Array<Task>;
  selected: number;
  error: string;
}

export const intitialState: TasksState = {
  data: [],
  selected: -1,
  error: null
};
