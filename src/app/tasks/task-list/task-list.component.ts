import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { State } from './../../+state/state/main-state';

import { Task } from './../../models/task';
import { TaskArrayService } from './../services/task-array.service';
import { TaskPromiseService } from './../services/task-promise.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;

  constructor(
    private router: Router,
    private taskArrayService: TaskArrayService,
    private taskPromiseService: TaskPromiseService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    console.log('We have a store! ', this.store);

    this.taskPromiseService.getTasks()
      .then(tasks => this.tasks = tasks)
      .catch((err) => console.log(err));
  }

  createTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }


  completeTask(task: Task): void {
    task.done = true;
    this.taskPromiseService.updateTask(task);
  }

  deleteTask(task: Task) {
    this.taskPromiseService.deleteTask(task)
      .then(() => this.tasks = this.tasks.filter(t => t !== task))
      .catch(err => console.log(err));
  }

}
