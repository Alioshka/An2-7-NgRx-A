import { Action } from '@ngrx/store';

import { Task } from './../../models/task';

// [Tasks]- namespace
export const TasksActionTypes = {
  GET_TASKS: '[Tasks] GET_TASKS',
  GET_TASKS_SUCCESS: '[Tasks] GET_TASKS_SUCCESS',
  GET_TASKS_ERROR: '[Tasks] GET_TASKS_ERROR',
  GET_TASK:    '[Tasks] GET_TASK',
  GET_TASK_SUCCESS:    '[Tasks] GET_TASK_SUCCESS',
  GET_TASK_ERROR:    '[Tasks] GET_TASK_ERROR',
  ADD_TASK:    '[Tasks] ADD_TASK',
  UPDATE_TASK:   '[Tasks] UPDATE_TASK',
  UPDATE_TASK_SUCCESS:   '[Tasks] UPDATE_TASK_SUCCESS',
  UPDATE_TASK_ERROR:   '[Tasks] UPDATE_TASK_ERROR',
  DELETE_TASK: '[Tasks] DELETE_TASK',
  DONE_TASK:   '[Tasks] DONE_TASK'
};

export class GetTasks implements Action {
  readonly type = TasksActionTypes.GET_TASKS;

  constructor(public payload?: Task) { }
}

export class GetTasksSuccess implements Action {
  readonly type = TasksActionTypes.GET_TASKS_SUCCESS;

  constructor(public payload: Task[]) { }
}

export class GetTasksError implements Action {
  readonly type = TasksActionTypes.GET_TASKS_ERROR;

  constructor(public payload: string) { }
}

export class GetTask implements Action {
  readonly type = TasksActionTypes.GET_TASK;

  constructor(public payload: string | number) { }
}

export class GetTaskSuccess implements Action {
  readonly type = TasksActionTypes.GET_TASK_SUCCESS;

  constructor(public payload: Task) { }
}

export class GetTaskError implements Action {
  readonly type = TasksActionTypes.GET_TASK_ERROR;

  constructor(public payload: string) { }
}

export class AddTask implements Action {
  readonly type = TasksActionTypes.ADD_TASK;

  constructor(public payload: Task) { }
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK;

  constructor(public payload: Task) { }
}

export class UpdateTaskSuccess implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK_SUCCESS;

  constructor(public payload: Task) { }
}

export class UpdateTaskError implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK_ERROR;

  constructor(public payload: string) { }
}

export class DeleteTask implements Action {
  readonly type = TasksActionTypes.DELETE_TASK;

  constructor(public payload: Task) { }
}

export class DoneTask implements Action {
  readonly type = TasksActionTypes.DONE_TASK;

  constructor(public payload: Task) { }
}

export type TasksActions =
  GetTasks |
  GetTasksSuccess |
  GetTasksError |
  GetTask |
  GetTaskSuccess |
  GetTaskError |
  AddTask |
  UpdateTask |
  UpdateTaskSuccess |
  UpdateTaskError |
  DeleteTask |
  DoneTask;
