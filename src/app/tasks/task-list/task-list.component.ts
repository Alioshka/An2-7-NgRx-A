import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { State } from './../../+state/state/main-state';
import { DeleteTask, DoneTask, GetTasks } from './../../+state/actions/tasks.actions';

import { Task } from './../../models/task';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;
  tasksState$: Store<any>;

  constructor(
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasksState$ = this.store.select('tasks');

    this.store.dispatch(new GetTasks());
  }

  createTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  completeTask(task: Task): void {
    this.store.dispatch(new DoneTask(task));
  }

  deleteTask(task: Task) {
    this.store.dispatch(new DeleteTask(task));
  }

}
