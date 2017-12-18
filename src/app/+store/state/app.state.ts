import { ActionReducerMap } from '@ngrx/store';

import { TasksState } from './tasks.state';
import { UsersState } from './users.state';
import { reducer, usersReducer} from './../reducers';

export interface AppState {
  tasks: TasksState;
  users: UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: reducer,
  users: usersReducer
};

