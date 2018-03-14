import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import * as TasksActions from './../../+store/actions/tasks.actions';
import { AppState, TasksState, getTasksState } from './../../+store';
// import { Store, select } from '@ngrx/store';
// import { AppState, TasksState } from './../../../core/+store';
// import * as TasksActions from './../../../core/+store/tasks/tasks.actions';

// Rxjs
import { Observable } from 'rxjs/Observable';

import { Task } from './../../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasksState$: Observable<TasksState>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasksState$ = this.store.select(getTasksState);
    // this.tasksState$ = this.store.pipe(select('tasks'));

    this.store.dispatch(new TasksActions.GetTasks());
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onCompleteTask(task: Task): void {
    const doneTask = {...task, done: true};
    this.store.dispatch(new TasksActions.UpdateTask(doneTask));
  }

  onEditTask(task: Task): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }
}
