import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import * as TasksActions from './../../+store/actions/tasks.actions';
import { AppState, TasksState } from './../../+store';

import { Task } from './../models/task.model';
import { TaskPromiseService } from './../services';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;
  tasksState$: Store<TasksState>;

  constructor(
    private router: Router,
    private taskPromiseService: TaskPromiseService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasksState$ = this.store.select('tasks');
  }

  createTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  completeTask(task: Task): void {
    this.store.dispatch(new TasksActions.DoneTask(task));
  }

  deleteTask(task: Task) {
    this.taskPromiseService.deleteTask(task)
      .then(() => this.tasks = this.tasks.filter(t => t !== task))
      .catch(err => console.log(err));
  }

  editTask(task: Task): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }
}
