import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState } from './../../+state/state/app.state';
import { tasksErrorSelector, tasksDataSelector } from './../../+state/state/tasks.state';
import * as TasksActions from './../../+state/actions/tasks.actions';

import { Task } from './../../models/task';
import { TaskPromiseService } from './../services/task-promise.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  // tasks: Array<Task>;
  tasks$: Store<Array<Task>>;
  tasksError$: Store<string>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasks$ = this.store.select(tasksDataSelector);
    this.tasksError$ = this.store.select(tasksErrorSelector);

    this.store.dispatch(new TasksActions.GetTasks());
  }

  createTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  completeTask(task: Task): void {
    const t = {...task};
    t.done = true;
    this.store.dispatch(new TasksActions.UpdateTask(t));

  }

  deleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }

}
