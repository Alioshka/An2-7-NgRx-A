import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import * as TasksActions from './../../+store/actions/tasks.actions';
import { AppState, TasksState } from './../../+store';

import { Task } from './../../models/task';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;
  tasksState$: Store<TasksState>;

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
    const t = {...task};
    t.done = true;
    this.store.dispatch(new TasksActions.UpdateTask(t));

  }

  deleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }

}
