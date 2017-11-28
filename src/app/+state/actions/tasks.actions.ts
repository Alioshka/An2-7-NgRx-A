import { Action } from '@ngrx/store';

import { Task } from './../../models/task';

// [Tasks]- namespace
export const TasksActionTypes = {
  GET_TASKS:   '[Tasks] GET_TASKS',
  GET_TASK:    '[Tasks] GET_TASK',
  ADD_TASK:    '[Tasks] ADD_TASK',
  UPDATE_TASK: '[Tasks] UPDATE_TASK',
  DELETE_TASK: '[Tasks] DELETE_TASK'
};

export class GetTasks implements Action {
  readonly type = TasksActionTypes.GET_TASKS;

  constructor(public payload?: Task) { }
}

export class GetTask implements Action {
  readonly type = TasksActionTypes.GET_TASK;

  constructor(public payload: string | number) { }
}

export class AddTask implements Action {
  readonly type = TasksActionTypes.ADD_TASK;

  constructor(public payload: Task) { }
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK;

  constructor(public payload: Task) { }
}

export class DeleteTask implements Action {
  readonly type = TasksActionTypes.DELETE_TASK;

  constructor(public payload: Task) { }
}

export type TasksActions =
  GetTasks |
  GetTask |
  AddTask |
  UpdateTask |
  DeleteTask;
