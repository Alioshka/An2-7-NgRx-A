import { ActionReducerMap } from '@ngrx/store';

import { TasksState, tasksReducer } from './tasks';

export interface AppState {
  tasks: TasksState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: tasksReducer
};

