import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './../core/+store';

import { TasksRoutingModule } from './tasks-routing.module';
import {
  TaskComponent,
  TaskFormComponent,
  TaskListComponent,
  TaskPromiseService
} from '.';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from '../core/+store/tasks/tasks.effects';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects])
  ],
  providers: [TaskPromiseService]
})
export class TasksModule {}
