import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './../+store/reducers';

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
    StoreModule.forFeature('tasks', tasksReducer)
  ],
  providers: [
    TaskArrayService,
    TaskPromiseService
  ]
})
export class TasksModule {}
