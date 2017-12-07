import { createFeatureSelector } from '@ngrx/store';

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

export const tasksStateSelector = createFeatureSelector<TasksState>('tasks');
