import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';

import { User } from './../../models/user';
import { UserArrayService } from './../services/user-array.service';
import { UserObservableService } from './../services/user-observable.service';
import { AutoUnsubscribe } from './../../decorators';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
@AutoUnsubscribe('subscriptions')
export class UserListComponent implements OnInit {
  users: Array<User>;
  errorMessage: string;

  private subscriptions: Subscription[] = [];
  private editedUser: User;

  constructor(
    private userArrayService: UserArrayService,
    private userObservableService: UserObservableService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const sub = this.userObservableService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error
      );
    this.subscriptions.push(sub);

    // listen id from UserFormComponent
    this.route.paramMap
      .switchMap((params: Params) => this.userArrayService.getUser(+params.get('id')))
      .subscribe(
        (user: User) => {
          this.editedUser = Object.assign({}, user);
          console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
        },
        (err) => console.log(err)
      );

  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  deleteUser(user: User) {
    this.userObservableService.deleteUser(user)
    .subscribe(
             () => this.users = this.users.filter(u => u !== user),
             err => console.log(err)
       );
  }

}
