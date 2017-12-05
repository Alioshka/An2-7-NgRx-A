import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import {
  TasksActionTypes,
  GetTasksSuccess, GetTasksError,
  GetTask, GetTaskSuccess, GetTaskError
} from './../actions/tasks.actions';

import {Observable} from 'rxjs/Observable';

import { TaskPromiseService } from './../../tasks/services/task-promise.service';

@Injectable()
export class TasksEffects {

  @Effect() getTasks$: Observable<Action> = this.actions$
    .ofType(TasksActionTypes.GET_TASKS)
    .switchMap(action =>
      this.taskPromiseService.getTasks()
        .then(tasks => new GetTasksSuccess(tasks) )
        .catch(err => new GetTasksError(err))
    );

  @Effect() getTask$: Observable<Action> = this.actions$
    .ofType(TasksActionTypes.GET_TASK)
    .map((action: GetTask) => action.payload)
    .switchMap(payload =>
      this.taskPromiseService.getTask(<number>payload)
        .then(task => new GetTaskSuccess(task) )
        .catch(err => new GetTaskError(err))
    );

  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService,
    private router: Router
  ) {
    console.log('[TASKS EFFECTS]');
  }

}
