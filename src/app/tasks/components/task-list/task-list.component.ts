import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/+store';

// Rxjs
import { Observable } from 'rxjs';

import { Task } from './../../models/task.model';
import { TaskPromiseService } from './../../services';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;
  tasksState$: Observable<TasksState>;

  constructor(
    private router: Router,
    private taskPromiseService: TaskPromiseService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.tasksState$ = this.store.pipe(select('tasks'));
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onCompleteTask(task: Task): void {
    this.updateTask(task).catch(err => console.log(err));
  }

  onEditTask(task: Task): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: Task) {
    this.taskPromiseService
      .deleteTask(task)
      .then(() => (this.tasks = this.tasks.filter(t => t.id !== task.id)))
      .catch(err => console.log(err));
  }

  private async updateTask(task: Task) {
    const updatedTask = await this.taskPromiseService.updateTask({
      ...task,
      done: true
    });

    if (updatedTask) {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index > -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
    }
  }
}
