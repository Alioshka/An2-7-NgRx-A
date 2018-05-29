import { createFeatureSelector, createSelector } from '@ngrx/store';

import { taskAdapter, TasksState } from './tasks.state';
import { getRouterState } from './../router';
import { Task } from './../../../tasks/models/task.model';

export const getTasksState = createFeatureSelector<TasksState>('tasks');

export const {
  selectEntities: getTasksEntities,
  selectAll: getTasksData
} = taskAdapter.getSelectors(getTasksState);

export const getTasksError = createSelector(
  getTasksState,
  (state: TasksState) => state.error
);
export const getTasksLoaded = createSelector(
  getTasksState,
  (state: TasksState) => state.loaded
);

export const getSelectedTaskByUrl = createSelector(
  getTasksEntities,
  getRouterState,
  (tasks, router): Task => {
    const taskID = router.state.params.taskID;
    if (taskID) {
      return tasks[taskID];
    } else {
      return new Task(null, '', null, null);
    }
  }
);
