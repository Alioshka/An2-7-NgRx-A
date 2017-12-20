import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as UsersActions from './../../+store/actions/users.actions';
import * as RouterActions from './../../+store/actions/router.actions';
import { AppState, getUsers, getUsersError, getEditedUser } from './../../+store';

import { User } from './../../models/user';
import { AutoUnsubscribe } from './../../decorators';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
@AutoUnsubscribe('subscription', false)
export class UserListComponent implements OnInit {
  users$: Store<Array<User>>;
  errorMessage: string;
  usersError$: Store<Error | string>;

  private subscription: Subscription;
  private editedUser: User;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.users$ = this.store.select(getUsers);
    this.usersError$ = this.store.select(getUsersError);
    this.store.dispatch(new UsersActions.GetUsers());

    // listen id from UserFormComponent
    this.subscription = this.store.select(getEditedUser)
    .subscribe(
      user => {
        this.editedUser = user;
        console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
      }
    );
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  deleteUser(user: User) {
    this.store.dispatch(new UsersActions.DeleteUser(user));
  }

  editUser(user: User) {
    const link = ['/users/edit', user.id];

    this.store.dispatch(new RouterActions.Go({
      path: link
    }));
  }

}
