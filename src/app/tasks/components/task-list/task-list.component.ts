import { Component, OnInit } from '@angular/core';

// @Ngrx
import { Store, select } from '@ngrx/store';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';
import * as RouterActions from './../../../core/+store/router/router.actions';
import { AppState, getTasksData, getTasksError } from './../../../core/+store';

// Rxjs
import { Observable } from 'rxjs/Observable';

import { Task } from './../../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<ReadonlyArray<Task>>;
  tasksError$: Observable<Error | string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasks$ = this.store.pipe(select(getTasksData));
    this.tasksError$ = this.store.pipe(select(getTasksError));

    this.store.dispatch(new TasksActions.GetTasks());
  }

  onCreateTask() {
    this.store.dispatch(
      new RouterActions.Go({
        path: ['/add']
      })
    );
  }

  onCompleteTask(task: Task): void {
    const doneTask = { ...task, done: true };
    this.store.dispatch(new TasksActions.UpdateTask(doneTask));
  }

  onEditTask(task: Task): void {
    this.store.dispatch(
      new RouterActions.Go({
        path: ['/edit', task.id]
      })
    );
  }

  onDeleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }
}
