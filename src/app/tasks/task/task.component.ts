import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { State } from './../../+state/state/main-state';
import { TasksActionTypes } from './../../+state/actions/tasks.actions';

import { Task } from './../../models/task';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task;
  @Output() onComplete = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();

  constructor(
    private router: Router,
    private store: Store<State>
  ) { }

  completeTask(): void {
    // this.onComplete.emit(this.task);
    this.store.dispatch({
      type: TasksActionTypes.DONE_TASK,
      payload: this.task
    });

  }

  deleteTask() {
    this.onDelete.emit(this.task);
  }

  editTask() {
    const link = ['/edit', this.task.id];
    this.router.navigate(link);
  }
}
