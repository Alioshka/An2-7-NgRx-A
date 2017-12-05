import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTasksReducer from './../+state/reducers/tasks.reducer';
import { TasksEffects } from '../+state/effects/tasks.effects';

import { TasksRoutingModule } from './tasks.routing.module';

import {
  TaskListComponent,
  TaskComponent,
  TaskFormComponent,
  TaskArrayService,
  TaskPromiseService
} from '.';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,
    StoreModule.forFeature('tasks', fromTasksReducer.reducer),
    EffectsModule.forFeature([TasksEffects])
  ],
  providers: [
    TaskArrayService,
    TaskPromiseService
  ]
})
export class TasksModule {}
