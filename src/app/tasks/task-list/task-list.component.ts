import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState } from './../../+state/state/app.state';
import * as TasksActions from './../../+state/actions/tasks.actions';

import { Task } from './../../models/task';
import { TaskPromiseService } from './../services/task-promise.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;
  tasksState$: Store<any>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasksState$ = this.store.select('tasks');

    this.store.dispatch(new TasksActions.GetTasks());
  }

  createTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  completeTask(task: Task): void {
    this.store.dispatch(new TasksActions.DoneTask(task));
  }

  deleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }

}
