import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, getUsersOriginalUser } from './../../+store';
import * as UsersActions from './../../+store/actions/users.actions';

// rxjs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';

import { User } from './../models/user.model';
import { DialogService, CanComponentDeactivate } from './../../shared';
// import { AutoUnsubscribe, DialogService, CanComponentDeactivate } from './../../../core';
// import { User } from './../../models/user.model';
// import { UserObservableService } from './../../services';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private store: Store<AppState>,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = {...data.user};
//    private router: Router,
//    private location: Location,
//    private dialogService: DialogService
//  ) {}

//  ngOnInit(): void {
    // data is an observable object
    // which contains custom and resolve data
//    this.route.data.subscribe(data => {
//      this.user = { ...data.user };
//      this.originalUser = { ...data.user };
    });
  }

  saveUser() {
    const user = { ...this.user };

    if (user.id) {
      this.store.dispatch(new UsersActions.UpdateUser(user));
    } else {
      this.store.dispatch(new UsersActions.CreateUser(user));
    }
    //const method = user.id ? 'updateUser' : 'createUser';
//    this.sub = this.userObservableService[method](user)
//      .subscribe(
//        () => {
//          this.originalUser = {...this.user};
//          user.id
//            // optional parameter: http://localhost:4200/users;editedUserID=2
//            ? this.router.navigate(['users', { editedUserID: user.id }])
//            : this.goBack();
//        },
//        error => console.log(error)
//      );
  }

  goBack() {
    this.location.back();
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
