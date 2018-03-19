import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

// NgRx
import { Store, select } from '@ngrx/store';
import { AppState, getSelectedUserByUrl } from './../../core/+store';
import * as UsersActions from './../../core/+store/users/users.actions';

// rxjs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, delay, tap, switchMap, take } from 'rxjs/operators';

import { User } from './../models/user.model';
import { SpinnerService } from '../../core';

@Injectable()
export class UserResolveGuard implements Resolve<User> {
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private store: Store<AppState>
  ) {}

  resolve(): Observable<User> | null {
    console.log('UserResolve Guard is called');
    this.spinner.show();

    return this.store.pipe(
      select(getSelectedUserByUrl),
      tap(user => this.store.dispatch(new UsersActions.SetOriginalUser(user))),
      delay(2000),
      switchMap(user => {
        if (user) {
          return of(user);
        } else {
          this.router.navigate(['/users']);
          return of(null);
        }
      }),
      tap(() => this.spinner.hide()),
      take(1),
      catchError(() => {
        this.spinner.hide();
        this.router.navigate(['/users']);
        return of(null);
      })
    );
  }
}
