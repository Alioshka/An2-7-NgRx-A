import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TasksState} from './../state/tasks.state';
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
export const tasksDataSelector = createSelector(tasksStateSelector, (state: TasksState) => state.data);
export const tasksErrorSelector = createSelector(tasksStateSelector, (state: TasksState) => state.error);
export const selectedTaskSelector = createSelector(tasksStateSelector, (state: TasksState) => state.data[state.selected]);

