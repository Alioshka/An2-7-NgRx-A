import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent, UserListComponent, UserFormComponent } from '.';

import { UsersStatePreloadingGuard } from './guards/users-state-preloading.guard';
import { CanDeactivateGuard } from './../core';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'add',
        component: UserFormComponent
      },
      {
        path: 'edit/:userID',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: '',
        component: UserListComponent,
        canActivate: [UsersStatePreloadingGuard]
      }
    ]
  }
];

export let usersRouterComponents = [
  UsersComponent,
  UserListComponent,
  UserFormComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [CanDeactivateGuard, UsersStatePreloadingGuard],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
