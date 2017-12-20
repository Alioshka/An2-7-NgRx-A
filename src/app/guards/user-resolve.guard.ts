import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// NgRx
import { Store } from '@ngrx/store';
import { AppState, getSelectedUserByUrl } from './../+store';
import * as RouterActions from './../+store/actions/router.actions';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { User } from './../models/user';
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    let user$: Observable<User>;

    // TODO: avoid subscribe
    // TODO: не работает переадресация. если сначала зайти на форму редактирования задачи,
    // вернуться назад, затем зайти на форму редактирования зпользователя,
    // затем снова ренуться и зайти на форму редактирования задачи, то уже возврат будет на список пользователей.
    // Эта ошибка возникает в связи с подпиской. 
    this.store.select(getSelectedUserByUrl)
    .subscribe(user => {
      if (user) {
        user$ = of(user);
      } else {
        // this.router.navigate(['/users']);
        this.store.dispatch(new RouterActions.Go({
          path: ['/users']
        }));
        user$ = of(null);
      }
    });
    return user$;

  // В этом случае возвращается не юзер а стор.
  //   this.store.select(getSelectedUserByUrl)
  //     .pipe(
  //       switchMap(user => {
  //         if (user) {
  //           return of(user);
  //         } else {
  //           this.store.dispatch(new RouterActions.Go({
  //             path: ['/users']
  //           }));
  //           return of(null);
  //         }
  //       })
  //     );
  //   return user$;
  // }
}
