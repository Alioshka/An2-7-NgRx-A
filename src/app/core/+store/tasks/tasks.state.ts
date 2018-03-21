import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Task } from './../../tasks/models/task.model';

export interface TasksState extends EntityState<Task> {
  selectedTask: Readonly<Task>;
// import { Task } from './../../../tasks/models/task.model';

// export interface TasksState {
//   data: ReadonlyArray<Task>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialTasksState: TasksState = taskAdapter.getInitialState({
  // additional entity state properties
  selectedTask: null,
// export const initialTasksState: TasksState = {
//  data: [],
  loading: false,
  loaded: false,
  error: null
});


