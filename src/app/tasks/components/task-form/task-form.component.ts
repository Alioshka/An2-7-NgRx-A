import { Component, OnInit, OnDestroy } from '@angular/core';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, getSelectedTaskByUrl } from './../../../core/+store';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';
import * as RouterActions from './../../../core/+store/router/router.actions';

// rxjs
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Task } from './../../models/task.model';
import { AutoUnsubscribe } from '../../../core';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: Task;

  private sub: Subscription;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.sub = this.store.select(getSelectedTaskByUrl)
      .subscribe(task => this.task = task);
    //this.sub = this.store
     // .pipe(select(getSelectedTaskByUrl))
     // .subscribe(task => (this.task = task));

    //this.route.paramMap.subscribe(params => {
    //  const id = params.get('taskID');
     // if (id) {
     //   this.store.dispatch(new TasksActions.GetTask(+id));
     // }
    //});
  }

  saveTask() {
    const task = { ...this.task };

    if (task.id) {
      this.store.dispatch(new TasksActions.UpdateTask(task));
    } else {
      this.store.dispatch(new TasksActions.CreateTask(task));
    }
  }

  goBack(): void {
    this.store.dispatch(new RouterActions.Go({
      path: ['/home']
    }));
  }
}
