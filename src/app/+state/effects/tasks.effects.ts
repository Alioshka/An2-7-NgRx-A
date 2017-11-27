import { Injectable } from '@angular/core';

// @Ngrx
import { Actions, Effect } from '@ngrx/effects';
import { TasksActionTypes, GetTasksSuccess, GetTasksError } from './../actions/tasks.actions';

import { TaskPromiseService } from './../../tasks/services/task-promise.service';

@Injectable()
export class TasksEffects {

  @Effect() getTasks$ = this.actions$
    .ofType(TasksActionTypes.GET_TASKS)
    .switchMap(action =>
      this.taskPromiseService.getTasks()
        .then(tasks => new GetTasksSuccess(tasks) )
        .catch(() => new GetTasksError())
    );

  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService,
  ) {
    console.log('[TASKS EFFECTS]');
  }

}
