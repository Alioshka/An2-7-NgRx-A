import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import * as TasksActions from './../../+store/actions/tasks.actions';
import { AppState, getTasksData, getTasksError } from './../../+store';

import { Task } from './../../models/task';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Store<Array<Task>>;
  tasksError$: Store<Error | string>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasks$ = this.store.select(getTasksData);
    this.tasksError$ = this.store.select(getTasksError);
  }

  createTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  completeTask(task: Task): void {
    const t = {...task, done: true};
    this.store.dispatch(new TasksActions.UpdateTask(t));

  }

  deleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }

}
