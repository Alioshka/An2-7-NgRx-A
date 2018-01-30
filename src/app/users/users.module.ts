import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, usersRouterComponents } from './users.routing.module';

import { UserComponent, UserArrayService, UserObservableService } from '.';
import { UsersAPIProvider } from './users.config';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects, usersReducer } from './../+store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [
    usersRouterComponents,
    UserComponent,
  ],
  providers: [
    UserArrayService,
    UserObservableService,
    UsersAPIProvider
  ]
})
export class UsersModule {}
