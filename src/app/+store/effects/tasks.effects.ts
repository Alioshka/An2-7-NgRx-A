import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { TasksActionTypes } from './../actions';
import * as TasksActions from './../actions/tasks.actions';

import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';

import { TaskPromiseService } from './../../tasks/services/task-promise.service';

@Injectable()
export class TasksEffects {

  @Effect() getTasks$: Observable<Action> = this.actions$
    .ofType(TasksActionTypes.GET_TASKS)
    .pipe(
      switchMap(action =>
        this.taskPromiseService.getTasks()
          .then(tasks => new TasksActions.GetTasksSuccess(tasks) )
          .catch(err => new TasksActions.GetTasksError(err))
      )
    );

  @Effect() getTask$: Observable<Action> = this.actions$
    .ofType(TasksActionTypes.GET_TASK)
    .pipe(
      map((action: TasksActions.GetTask) => action.payload),
      switchMap(payload =>
        this.taskPromiseService.getTask(<number>payload)
          .then(task => new TasksActions.GetTaskSuccess(task) )
          .catch(err => new TasksActions.GetTaskError(err))
      )
    );

  @Effect() updateTask$: Observable<Action> = this.actions$
    .ofType(TasksActionTypes.UPDATE_TASK)
    .pipe(
      map((action: TasksActions.UpdateTask) => action.payload),
      switchMap(payload =>
        this.taskPromiseService.updateTask(payload)
          .then(task => {
            this.router.navigate(['/home']);
            return new TasksActions.UpdateTaskSuccess(task);
          })
          .catch(err => new TasksActions.UpdateTaskError(err))
      )
    );

  @Effect() createTask$: Observable<Action> = this.actions$
    .ofType(TasksActionTypes.CREATE_TASK)
    .pipe(
      map((action: TasksActions.CreateTask) => action.payload),
      switchMap(payload =>
        this.taskPromiseService.createTask(payload)
          .then(task => {
            this.router.navigate(['/home']);
            return new TasksActions.CreateTaskSuccess(task);
          })
          .catch(err => new TasksActions.CreateTaskError(err))
      )
    );

  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService,
    private router: Router
  ) {
    console.log('[TASKS EFFECTS]');
  }

}
