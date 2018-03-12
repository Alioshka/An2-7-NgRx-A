import { ActionReducerMap } from '@ngrx/store';

import { TasksState, tasksReducer } from './tasks';

export interface AppState {
  tasks: TasksState;
}
