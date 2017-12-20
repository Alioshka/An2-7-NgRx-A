import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, getUsersOriginalUser } from './../../+store';
import * as UsersActions from './../../+store/actions/users.actions';
import * as RouterActions from './../../+store/actions/router.actions';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';

import { User } from './../../models/user';
import { DialogService } from './../../services/dialog.service';
import { UserObservableService } from './../services/user-observable.service';
import { CanComponentDeactivate } from './../../guards/can-component-deactivate.interface';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: User;

  constructor(
    private userObservableService: UserObservableService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = {...data.user};
    });
  }

  saveUser() {
    const user = new User(
      this.user.id,
      this.user.firstName,
      this.user.lastName
    );

    if (user.id) {
      this.store.dispatch(new UsersActions.UpdateUser(user));
    } else {
      this.store.dispatch(new UsersActions.CreateUser(user));
    }
  }

  goBack() {
    this.store.dispatch(new RouterActions.Back());
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];

    return this.store.select(getUsersOriginalUser)
            .pipe(
              switchMap(originalUser => {
                for (const key in originalUser) {
                  if (originalUser[key] === this.user[key]) {
                    flags.push(true);
                  } else {
                    flags.push(false);
                  }
                }

                if (flags.every(el => el)) {
                  return of(true);
                }

                // Otherwise ask the user with the dialog service and return its
                // promise which resolves to true or false when the user decides
                return this.dialogService.confirm('Discard changes?');
              })
            );
  }

}
