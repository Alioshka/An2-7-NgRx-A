import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

// ngrx
import { Store, select } from '@ngrx/store';
import * as UsersActions from './../../../core/+store/users/users.actions';
import * as RouterActions from './../../../core/+store/router/router.actions';
import {
  AppState,
  getUsers,
  getUsersError,
  getEditedUser
} from './../../../core/+store';

import { User } from './../../models/user.model';
import { AutoUnsubscribe } from './../../../core/decorators';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
@AutoUnsubscribe('subscription')
export class UserListComponent implements OnInit {
  users$: Observable<Array<User>>;
  usersError$: Observable<Error | string>;

  private subscription: Subscription;
  private editedUser: User;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.users$ = this.store.pipe(select(getUsers));
    this.usersError$ = this.store.pipe(select(getUsersError));
    this.store.dispatch(new UsersActions.GetUsers());

    // listen editedUserID from UserFormComponent
    this.subscription = this.store.select(getEditedUser).subscribe(
      user => {
        this.editedUser = user;
        console.log(
          `Last time you edited user ${JSON.stringify(this.editedUser)}`
        );
      },
      err => console.log(err)
    );
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  onDeleteUser(user: User) {
    this.store.dispatch(new UsersActions.DeleteUser(user));
  }

  onEditUser(user: User) {
    const link = ['/users/edit', user.id];

    this.store.dispatch(
      new RouterActions.Go({
        path: link
      })
    );
  }
}
