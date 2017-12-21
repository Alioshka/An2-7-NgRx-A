import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

// NgRx
import { Store } from '@ngrx/store';
import { AppState, getSelectedUserByUrl } from './../+store';
import * as RouterActions from './../+store/actions/router.actions';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { first, switchMap } from 'rxjs/operators';

import { User } from './../models/user';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  resolve(): Observable<User> {
    return this.store.select(getSelectedUserByUrl)
      .pipe(
        switchMap(user => {
          if (user) {
            return of(user);
          } else {
            this.store.dispatch(new RouterActions.Go({
              path: ['/users']
            }));
            return of(null);
          }
        }),
        first()
      );

  }
}
