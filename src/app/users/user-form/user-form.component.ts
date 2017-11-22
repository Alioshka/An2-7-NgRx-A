import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { User } from './../../models/user';
import { DialogService } from './../../services/dialog.service';
import { UserObservableService } from './../services/user-observable.service';
import { CanComponentDeactivate } from './../../guards/can-component-deactivate.interface';
import { AutoUnsubscribe } from './../../decorators';

import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: User;
  originalUser: User;

  private sub: Subscription[] = [];

  constructor(
    private userObservableService: UserObservableService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.user = new User(null, '', '');

    // data is an observable object
    // which contains custom and resolve data
    this.route.data.subscribe(data => {
      this.user = Object.assign({}, data.user);
      this.originalUser = Object.assign({}, data.user);
    });
  }

  saveUser() {
    const user = new User(
      this.user.id,
      this.user.firstName,
      this.user.lastName
    );

    const method = user.id ? 'updateUser' : 'createUser';
    const sub = this.userObservableService[method](user)
      .subscribe(
        () => {
          this.originalUser = Object.assign({}, this.user);
          user.id
            // optional parameter: http://localhost:4200/users;id=2
            ? this.router.navigate(['users', { id: user.id }])
            : this.router.navigate(['users']);
        },
        error => console.log(error)
      );
    this.sub.push(sub);
  }

  goBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];
    for (const key in this.originalUser) {
      if (this.originalUser[key] === this.user[key]) {
        flags.push(true);
      } else {
        flags.push(false);
      }
    }

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
