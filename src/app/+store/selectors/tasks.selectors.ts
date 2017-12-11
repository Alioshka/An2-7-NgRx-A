import { createFeatureSelector } from '@ngrx/store';

import { TasksState } from './../state';

export const getTasksState = createFeatureSelector<TasksState>('tasks');
