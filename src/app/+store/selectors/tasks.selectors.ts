import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TasksState } from './../state';
import { getRouterState } from './../selectors/router.selectors';
import { Task } from './../../models/task';


export const getTasksState = createFeatureSelector<TasksState>('tasks');

export const getTasksData = createSelector(getTasksState, (state: TasksState) => state.data);
export const getTasksError = createSelector(getTasksState, (state: TasksState) => state.error);
export const getSelectedTask = createSelector(getTasksState, (state: TasksState) => state.selectedTask);
export const getLoaded = createSelector(getTasksState, (state: TasksState) => state.loaded);

export const getSelectedTaskByUrl = createSelector(
    getTasksData,
    getRouterState,
    (tasks, router): Task => {
        if (router.state.params.id) {
            return tasks[router.state.params.id];
        } else {
            return new Task(null, '', null, null);
        }
});
