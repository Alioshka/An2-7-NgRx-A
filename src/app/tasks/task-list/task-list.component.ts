import { Component, OnInit } from '@angular/core';

// @Ngrx
import { Store } from '@ngrx/store';
import * as TasksActions from './../../+store/actions/tasks.actions';
import * as RouterActions from './../../+store/actions/router.actions';
import { AppState, getTasksData, getTasksError } from './../../+store';

import { Task } from './../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Store<ReadonlyArray<Task>>;
  tasksError$: Store<Error | string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasks$ = this.store.select(getTasksData);
    this.tasksError$ = this.store.select(getTasksError);

    this.store.dispatch(new TasksActions.GetTasks());
  }

  createTask() {
    this.store.dispatch(new RouterActions.Go({
      path: ['/add']
    }));
  }

  completeTask(task: Task): void {
    const doneTask = {...task, done: true};
    this.store.dispatch(new TasksActions.UpdateTask(doneTask));
  }

  deleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }

  editTask(task: Task) {
    this.store.dispatch(new RouterActions.Go({
      path: ['/edit', task.id]
    }));
  }

}
