import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent, TaskFormComponent } from '.';
import { TasksStateLoadingGuard } from './guards/tasks-state-loading.guard';

const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    canActivate: [TasksStateLoadingGuard],
    data: {
      title: 'Task Manager',
      meta: [{
        name: 'description',
        content: 'Task Manager Application. This is an ASP application'
      },
      {
        name: 'keywords',
        content: 'Angular 4 tutorial, SPA Application, Routing'
      }]
    }
  },
  {
    path: 'add',
    component: TaskFormComponent
  },
  {
    path: 'edit/:id',
    component: TaskFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    TasksStateLoadingGuard
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule { }
