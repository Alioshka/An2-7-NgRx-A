import { Injectable } from '@angular/core';

// @ngrx
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions) {
    console.log('[TASKS EFFECTS]');
  }
}
