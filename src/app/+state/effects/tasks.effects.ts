import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { TasksActionTypes } from './../actions/tasks.actions';
import * as TasksActions from './../actions/tasks.actions';

import {Observable} from 'rxjs/Observable';

import { TaskPromiseService } from './../../tasks/services/task-promise.service';

@Injectable()
export class TasksEffects {

  @Effect() getTasks$: Observable<Action> = this.actions$
    .ofType(TasksActionTypes.GET_TASKS)
    .switchMap(action =>
      this.taskPromiseService.getTasks()
        .then(tasks => new TasksActions.GetTasksSuccess(tasks) )
        .catch(err => new TasksActions.GetTasksError(err))
    );

  @Effect() getTask$: Observable<Action> = this.actions$
    .ofType(TasksActionTypes.GET_TASK)
    .map((action: TasksActions.GetTask) => action.payload)
    .switchMap(payload =>
      this.taskPromiseService.getTask(<number>payload)
        .then(task => new TasksActions.GetTaskSuccess(task) )
        .catch(err => new TasksActions.GetTaskError(err))
    );

  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService,
    private router: Router
  ) {
    console.log('[TASKS EFFECTS]');
  }

}
