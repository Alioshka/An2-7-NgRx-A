import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, getSelectedTaskByUrl } from './../../+store';
import * as TasksActions from './../../+store/actions/tasks.actions';
import * as RouterActions from './../../+store/actions/router.actions';

import { Subscription } from 'rxjs/Subscription';

import { Task } from './../../models/task';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: Task;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.sub = this.store.select(getSelectedTaskByUrl)
      .subscribe(task => this.task = task);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(new TasksActions.GetTask(+id));
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  saveTask() {
    const task = new Task(
      this.task.id,
      this.task.action,
      this.task.priority,
      this.task.estHours
    );

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
