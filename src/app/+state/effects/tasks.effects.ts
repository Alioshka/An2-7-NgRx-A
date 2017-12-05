import { Injectable } from '@angular/core';

// @Ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { TasksActionTypes, GetTasksSuccess, GetTasksError } from './../actions/tasks.actions';

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

  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService,
  ) {
    console.log('[TASKS EFFECTS]');
  }

}
