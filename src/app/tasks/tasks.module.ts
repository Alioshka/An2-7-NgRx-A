import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tasksReducer } from './../core/+store';
import { TasksEffects } from '../core/+store/tasks/tasks.effects';

import { TasksRoutingModule } from './tasks-routing.module';

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
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects])
  ],
  providers: [
    TaskArrayService,
    TaskPromiseService
  ]
})
export class TasksModule {}
