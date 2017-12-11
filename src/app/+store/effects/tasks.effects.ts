import { Injectable } from '@angular/core';

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

  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService,
  ) {
    console.log('[TASKS EFFECTS]');
  }

}
