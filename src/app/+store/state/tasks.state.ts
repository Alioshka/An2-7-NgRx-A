import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Task } from './../../tasks/models/task.model';

export interface TasksState extends EntityState<Task> {
  selectedTask: Readonly<Task>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialTasksState: TasksState = taskAdapter.getInitialState({
  // additional entity state properties
  selectedTask: null,
  loading: false,
  loaded: false,
  error: null
});


