import { Injectable } from '@angular/core';

// @Ngrx
import { Actions } from '@ngrx/effects';

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
  ) {
    console.log('[TASKS EFFECTS]');
  }

}
