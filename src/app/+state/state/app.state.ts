import { ActionReducerMap } from '@ngrx/store';

import { TasksState } from './tasks.state';
import * as fromTasks from './../reducers/tasks.reducer';

export interface AppState {
  tasks: TasksState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: fromTasks.reducer
};

