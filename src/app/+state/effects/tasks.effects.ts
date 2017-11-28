import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Actions, Effect } from '@ngrx/effects';
import { TasksActionTypes, GetTasksSuccess, GetTasksError, GetTask, GetTaskSuccess, GetTaskError } from './../actions/tasks.actions';

import { TaskPromiseService } from './../../tasks/services/task-promise.service';

@Injectable()
export class TasksEffects {

  @Effect() getTasks$ = this.actions$
    .ofType(TasksActionTypes.GET_TASKS)
    .switchMap(action =>
      this.taskPromiseService.getTasks()
        .then(tasks => new GetTasksSuccess(tasks) )
        .catch(err => new GetTasksError(err))
    );

  @Effect() getTask$ = this.actions$
    .ofType(TasksActionTypes.GET_TASK)
    .switchMap(action =>
      this.taskPromiseService.getTask(action['payload'])
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
