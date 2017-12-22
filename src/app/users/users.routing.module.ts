import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent, UserListComponent, UserFormComponent } from '.';

import { CanDeactivateGuard } from './../guards/can-deactivate.guard';
import { UsersStateLoadingGuard } from './guards/users-state-loading.guard';

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
        path: 'edit/:id',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: '',
        component: UserListComponent,
        canActivate: [UsersStateLoadingGuard]
      }
    ]
  }
];

export let usersRouterComponents = [UsersComponent, UserListComponent, UserFormComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    CanDeactivateGuard,
    UsersStateLoadingGuard
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
