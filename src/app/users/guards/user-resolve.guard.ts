import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

// NgRx
import { Store } from '@ngrx/store';
import { AppState, getSelectedUserByUrl } from './../../+store';

// rxjs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, take } from 'rxjs/operators';

import { User } from './../models/user.model';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  resolve(): Observable<User> | null {
    console.log('UserResolve Guard is called');

    return this.store.select(getSelectedUserByUrl)
      .pipe(
        switchMap(user => {
          if (user) {
            return of(user);
          } else {
            this.router.navigate(['/users']);
            return of(null);
          }
        }),
        take(1)
      );

  }
}
